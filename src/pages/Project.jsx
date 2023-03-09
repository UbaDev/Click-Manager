import React from "react";
import {
  matchPath,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";
import styled from "styled-components";
import { PageLoader } from "../components";
import { ProjectService } from "../services/ProjectService";
import { sizes } from "../styles/styles";
import toast from "../utils/toast";
import ProjectNavbarLeft from "./NavbarLeft";
import ProjectSettings from "./ProjectSettings";
import ProjectBoard from "./Board";
import ProjectSidebar from "./Sidebar";
import { UserService } from "../services/UserService";

export default function Project() {
  const param = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [project, setProject] = React.useState(null);
  const [isIssueSearchModalOpen, setIsIssueSearchModalOpen] =
    React.useState(false);
  const [isIssueCreateModalOpen, setIsIssueCreateModalOpen] =
    React.useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [reload, setReload] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      try {
        const project = await ProjectService.getInstance().getProject(param.id);

        const colloborators = await UserService.getInstance().getUsersByIds([
          ...project.collaborators,
          project.createdBy,
        ]);
        project.users = colloborators;

        const issues = await ProjectService.getInstance().getIssues(project);
        project.issues = issues;

        setProject(project);
      } catch (error) {
        toast.error(error.message);
      }

      setIsLoading(false);

      const isRootPath = matchPath(
        {
          path: "/project/:id",
          exact: true,
        },
        pathname
      );
      if (isRootPath) {
        navigate("/project/" + param.id + "/board");
      }
    })();
  }, [reload]);

  // // add observer to detect changes in the project
  React.useEffect(() => {
    if (param.id) {
      const unsubscribe = ProjectService.getInstance().observeProject(
        param.id,
        (project) => {
          setReload(reload + 1);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <ProjectPage>
      <ProjectNavbarLeft
        issueSearchModalOpen={() => setIsIssueSearchModalOpen(true)}
        issueCreateModalOpen={() => setIsIssueCreateModalOpen(true)}
      />

      <ProjectSidebar project={project} />

      <Routes>
        <Route path={`/board/*`} element={<ProjectBoard project={project} />} />
        <Route
          path={`/settings`}
          element={<ProjectSettings project={project} />}
        />
      </Routes>
    </ProjectPage>
  );
}

const paddingLeft = sizes.appNavBarLeftWidth + sizes.secondarySideBarWidth + 40;

export const ProjectPage = styled.div`
  padding: 25px 32px 50px ${paddingLeft}px;

  @media (max-width: 1100px) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
  @media (max-width: 999px) {
    padding-left: ${paddingLeft - 20 - sizes.secondarySideBarWidth}px;
  }
`;
