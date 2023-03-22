# Node builder image
FROM uselagoon/node-16:latest as dev

COPY . /app/

# Copy only what we need into the image
COPY ./src/ /app/src
COPY server.js .
COPY plugins.json .
COPY package.json .
COPY yarn.lock .

# Upgrade the yarn version in /app to the most recent to take advantage of new features 
RUN yarn set version berry \
    && yarn plugin import workspace-tools

# use a buildkit cache for yarn - this is reused in later steps
RUN --mount=type=cache,target=/home/.yarn YARN_CACHE_FOLDER=/home/.yarn yarn install

ARG LAGOON_VERSION
ARG GRAPHQL_API
ARG KEYCLOAK_API
ENV LAGOON_VERSION=$LAGOON_VERSION
ENV GRAPHQL_API=$GRAPHQL_API
ENV KEYCLOAK_API=$KEYCLOAK_API

# Use an intermediate image to build and trim the production image
FROM uselagoon/node-16:latest as prod-builder

# Copy the whole /app folder from dev
COPY --from=dev /app/ /app/

# Build app
RUN yarn run build
# Remove any node_modules in DevDependencies not needed for production
RUN --mount=type=cache,target=/home/.yarn YARN_CACHE_FOLDER=/home/.yarn yarn workspaces focus --production

# Build the final production image
FROM uselagoon/node-16:latest

# Copy the whole /app folder from prod-builder
COPY --from=prod-builder /app/ /app/

EXPOSE 3000
CMD ["yarn", "start"]
