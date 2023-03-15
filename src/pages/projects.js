import React, { useContext } from "react";
import Head from "next/head";
import MainLayout from "layouts/MainLayout";
import AllProjectsQuery from "lib/query/AllProjects";
import Projects from "components/Projects";
import ProjectsSkeleton from "components/Projects/ProjectsSkeleton";
import { CommonWrapper } from "../styles/commonPageStyles";
import { TourContext } from "../tours/TourContext";
import ProjectTour from "../tours/ProjectTour";
import { useQuery } from "@apollo/react-hooks";

/**
 * Displays the projects page.
 */
const ProjectsPage = () => {
  const { data, loading } = useQuery(AllProjectsQuery, {
    displayName: "AllProjectsQuery",
  });

  const { running, stepIndex, setTourState } = useContext(TourContext);
  console.warn(running, stepIndex, setTourState);
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <MainLayout>
        <CommonWrapper>
          <ProjectTour />
          <h2>Projects</h2>
          <div className="content">
            {loading ? (
              <ProjectsSkeleton />
            ) : (
              <Projects projects={data.allProjects || []} />
            )}
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};
export default ProjectsPage;
