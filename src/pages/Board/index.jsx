import React, { Fragment, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Modal } from "../../components";
import { ProjectService } from "../../services/ProjectService";
import ProjectBoardIssueDetails from "../IssueDetails";
import ProjectBoardHeader from "./Header";
import ProjectIssueCreate from "./IssueCreate";
import ProjectBoardLists from "./Lists";

const defaultFilters = {
  searchTerm: "",
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectBoard = ({ project }) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [showCreateIssueModal, setShowCreateIssueModal] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  if (!project.issues) {
    project.issues = [];
  }

  // const [issues, setIssues] = useState(project.issues);

  // observe the project issues and reload it if it changes
  // React.useEffect(() => {
  //   const unsubscribe = ProjectService.getInstance().observeIssues(
  //     project,
  //     (issues) => {
  //       project.issues = issues;
  //       // setIssues(issues);

  //       console.log("observeIssues", issues);
  //     }
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <Fragment>
      {showCreateIssueModal && (
        <Modal
          isOpen
          testid="modal:issue-create"
          width={800}
          withCloseIcon={false}
          onClose={() => setShowCreateIssueModal(false)}
          renderContent={(modal) => (
            <ProjectIssueCreate
              project={project}
              onCreate={() => setShowCreateIssueModal(false)}
              modalClose={() => setShowCreateIssueModal(false)}
            />
          )}
        />
      )}

      <Breadcrumbs items={["Proyectos", project.name, "Tablero"]} />
      <ProjectBoardHeader
        setShowCreateIssueModal={() => setShowCreateIssueModal(true)}
      />
      <ProjectBoardLists
        project={project}
        // issues={issues}
        filters={filters}
        updateLocalProjectIssues={(issues) => {
          // project.issues = issues;
          // debugger;
          // setIssues(issues);
        }}
      />

      <Routes>
        <Route
          path={`/:id`}
          element={
            <Modal
              isOpen
              testid="modal:issue-details"
              width={1040}
              withCloseIcon={false}
              onClose={() => {
                navigate("/project/" + project.id + "/board");
              }}
              renderContent={(modal) => (
                <ProjectBoardIssueDetails
                  project={project}
                  issueId={params["*"]}
                  projectUsers={project.users}
                  fetchProject={() => {
                    console.log("fetch project");
                  }}
                  updateLocalProjectIssues={() => {
                    console.log("update local project issues");
                  }}
                  modalClose={modal.close}
                />
              )}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export default ProjectBoard;
