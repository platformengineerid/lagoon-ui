## Lagoon UI

The main user interface and dashboard for [Lagoon](https://github.com/uselagoon/lagoon). 

## Build

To build and test changes locally the Lagoon UI can be built via Yarn or Docker.

Testing locally, the UI can be connected to production or development Lagoon instances. Here we have included the URLs for the amazee.io cloud, but you can substitute your own.

### Yarn
Note: Within `docker-compose.yml` `GRAPHQL_API` & `KEYCLOAK_API` are set to localhost by default.

```
yarn install
yarn build && GRAPHQL_API=https://api.lagoon.amazeeio.cloud/graphql KEYCLOAK_API=https://keycloak.amazeeio.cloud/auth yarn dev
```
These values can also be updated in `docker-compose.yml`.

### Docker

Docker Compose is configured to deploy two services locally:
- dev (0.0.0.0:3003): A live updating development build, using volumes to mount from /src and rebuild-on the fly
- ui (0.0.0.0:3000): A built, production ready implementation of the code in the repo
Lagoon will only deploy the "ui" version into a cluster.

Note: Within `docker-compose.yml` `GRAPHQL_API` & `KEYCLOAK_API` will need to be set to 
```
  GRAPHQL_API: "${GRAPHQL_API:-https://api.lagoon.amazeeio.cloud/graphql}"
  KEYCLOAK_API: "${KEYCLOAK_API:-https://keycloak.amazeeio.cloud/auth}"
```

```
docker-compose build
docker-compose up -d
```

This project is tested with BrowserStack.

## Plugin system

The Lagoon UI supports basic plugins via a plugin registry.
The file, in the root, "plugins.json" allows you to hook into the server side rendering to add additional CSS and Javascript files. These are simply added as "script" and "link" elements to the resulting HTML.
We currently support adding elements to the `head` at at the end of the `body` as demonstrated below.

In this example, we load two elements, a JS script and a css file into the `head`, and then we add an external library at the bottom of the `body`.

```
{
    "head": [
        {"type": "script", "location":"/static/custom.js"},
        {"type": "link",   "href":"/static/plugins/custom.css"}
        
    ],
    "body": [
        {"type": "script", "location":"https://www.cornify.com/js/cornify.js"}
    ]
}
```
