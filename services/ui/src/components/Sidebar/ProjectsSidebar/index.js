import React, { useState, memo } from 'react';
import * as R from 'ramda';
import Link from 'next/link';
import moment from 'moment';
import SiteStatus from 'components/SiteStatus';
import ProjectLink from 'components/link/Project';
import EnvironmentLink from 'components/link/Environment';

import { Icon, Divider, Header, List, Label as SemanticLabel } from 'semantic-ui-react';
import Label from 'components/Label';
import { getLastCompletedDeployment } from 'lib/util';


const ProjectsSidebar = ({ project }) => {
  const environments = [...project.environments].sort((a, b) => a.environmentType && a.environmentType === "production" ? -1 : b.environmentType && b.environmentType === "production" ? 1 : 0)
  const environmentCount = project && R.countBy(R.prop('environmentType'))(
    project.environments
  );
  const hasProductionEnvironment = environments ? environments.every(e => !e.environmentType.includes("production")) : false;

  if (!project) {
    return <>No Project</>
  }

  return (
    <div className="projects-sidebar-wrapper">
      <div className="summary">
        {environments && environments.map((e, index) => e.environmentType === "production" &&
         <div key={`${e.name.toLowerCase()}-${index}`} className="summary-production">
          <div className="summary-production-link">
            <ProjectLink className="project-link" projectSlug={project.name} key={project.id}>
              <Header size='small'>
                {e.route ? e.route.replace(/(^\w+:|^)\/\//, '') : project.name}
                <Header.Subheader>
                  <div>{e.route && project.name}</div>
                </Header.Subheader>
              </Header>
              <div className="icon"><Icon fitted size='large' color='grey' link name='long arrow alternate right'/></div>
            </ProjectLink>
          </div>
          <div className="summary-production-status">
            <EnvironmentLink className="environment-link" projectSlug={project.name} environmentSlug={e.openshiftProjectName} key={e.id}>
              <SiteStatus environment={e}/>
            </EnvironmentLink>
            {e.route &&
              <Link href={e.route} passHref={true}>
                <SemanticLabel icon="external" text="Visit" className="visit-icon"/>
              </Link>
            }
          </div>
        </div>
        )}
        {hasProductionEnvironment &&
          <div className="summary-production-link">
            <Header size='small'>
              {project && project.name}
              <Header.Subheader>
                <div>There are no production environments for this project.</div>
              </Header.Subheader>
            </Header>
            <ProjectLink className="project-link" projectSlug={project.name} key={project.id}>
              <div className="icon"><Icon fitted size='large' color='grey' link name='long arrow alternate right'/></div>
            </ProjectLink>
          </div>
        }
        {environments &&
          <Header size="tiny" style={{ margin: "0" }}>
            Environments
            <Divider />
          </Header>
        }
        {environments && environments.map((e, index) =>
          <div key={e.name.toLowerCase()} className="environments">
            <div><label>{e.name}</label></div>
            <Divider />
            <div className="section environment-summary">
              <div><SiteStatus environment={e}/></div>
              <Label className="type" icon="tree" text={e.environmentType} />
            </div>
            <div className="section logs">
              {getLastCompletedDeployment(e.deployments) && 
                <div className="last-deployed-wrapper">
                  <Label
                    className="last-deployed"
                    icon="clock outline"
                    text={`Last deployed: ${getLastCompletedDeployment(e.deployments, false)}`}
                  />
                </div>
              }
              <div className="created-warpper">
                <Label
                  className="created"
                  icon="clock outline"
                  text={`Created: ${project &&
                    moment
                    .utc(project.created)
                    .local()
                    .format('DD MMM YYYY, HH:mm:ss (Z)')}`}
                />
              </div>
            </div>
            {e.facts && e.facts.some(f => f.keyFact) &&
              <div className="section key-facts-summary">
                <div><label>Key facts</label></div>
                <Divider />
                  <List>
                  {[...e.facts].sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0).map((f, index) =>
                    f.keyFact &&
                      <List.Item key={f.name.toLowerCase()}>
                        <Label
                          className="key-facts"
                          factIcon={f.name}
                          text={`${f.name} ${f.value}`}
                          value={f.value}
                        />
                      </List.Item>
                  )}
                </List>
              </div>
            }
          </div>
        )}
      </div>
      <style jsx>{`
        .summary {
          display: flex;
          flex-direction: column;
          margin-bottom: 1em;

          .summary-production {
            margin-bottom: 1em;
          }

          .summary-production-link, .summary-production-status {
            display: flex;
            justify-content: space-between;

            .header {
              margin-bottom: 0;
            }
          }

          .summary-production-status {
            padding: 1em 0;
          }
        }

        .environments {
          display: flex;
          flex-direction: column;
          margin-bottom: 2em;

          .environment-summary {
            display: flex;
            justify-content: space-between;
          }

          .section {
            padding: 10px 0;
          }
        }

        h5 {
          margin: 0;
        }
      `}</style>
  </div>
  );
};

export default memo(ProjectsSidebar);
