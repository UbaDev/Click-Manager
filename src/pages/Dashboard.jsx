import { getAuth } from "firebase/auth";
import React from "react";
import {
  Avatar,
  Button,
  Modal,
  PageLoader,
  ProjectAvatar,
} from "../components";
import { ProjectService } from "../services/ProjectService";
import styled from "styled-components";
import { color, font, mixin, sizes } from "../styles/styles";
import ProjectCreate from "./ProjectCreate";
import { UserService } from "../services/UserService";
import { Link } from "react-router-dom";
import DynamicTable from "@atlaskit/dynamic-table";
import toast from "../utils/toast";

export default function Dashboard() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [isCreateProjectModelOpen, setIsCreateProjectModelOpen] =
    React.useState(false);

  const [users, setUsers] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (currentUser) {
      (async () => {
        try {
          const users = await UserService.getInstance().getUsers();
          setUsers(users);
        } catch (error) {
          toast.error(error.message);
        }
      })();
    }
  }, []);

  React.useEffect(() => {
    if (currentUser) {
      (async () => {
        try {
          const projects = await ProjectService.getInstance().getProjects();
          setProjects(projects);
        } catch (error) {
          toast.error(error.message);
        }
        setIsLoading(false);
      })();
    }
  }, [isCreateProjectModelOpen]);

  if (!currentUser || isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Modal
        isOpen={isCreateProjectModelOpen}
        onClose={() => setIsCreateProjectModelOpen(false)}
        width={800}
        withCloseIcon={false}
        renderContent={(modal) => (
          <ProjectCreate
            onCreate={() => {
              setIsCreateProjectModelOpen(false);
            }}
            modalClose={() => setIsCreateProjectModelOpen(false)}
            users={users}
          />
        )}
      />
      <Projects>
        <Header>
          <Title>Proyectos</Title>
          <ButtonGroup>
           <Button
              variant="primary"
              onClick={() => {
                setIsCreateProjectModelOpen(true);
              }}
            >
              Crear proyecto
            </Button> 
            <LogoutButton>
              <Button
                // variant="primary"
                onClick={async () => {
                  try {
                    await auth.signOut();
                  } catch (error) {
                    toast.show(error.message);
                  }
                }}
              >
                Salir
              </Button>
            </LogoutButton>
          </ButtonGroup>
        </Header>

        <Project>
          {projects && (
            <DynamicTable
              head={{
                cells: [
                  {
                    key: "name",
                    content: "Nombre",
                    isSortable: true,
                  },
                  {
                    key: "type",
                    content: "Tipo",
                    isSortable: true,
                  },
                  {
                    key: "createdBy",
                    content: "Propietario",
                    isSortable: true,
                  },
                  {
                    key: "collaborators",
                    content: "Colaboradores",
                    isSortable: false,
                  },

                  {
                    key: "category",
                    content: "Categoria",
                    isSortable: true,
                  },
                ],
              }}
              rows={projects.map((project) => {
                return {
                  key: project.id,
                  cells: [
                    {
                      key: "name",
                      content: (
                        <ProjectTitle>
                          <ProjectAvatar size={24} />
                          <ProjectLink to={`/project/${project.id}`}>
                            {project.name}
                          </ProjectLink>
                        </ProjectTitle>
                      ),
                    },
                    {
                      key: "type",
                      content: <div>{project.type}</div>,
                    },
                    {
                      key: "createdBy",
                      content: (
                        <div>
                          {
                            users.filter(
                              (user) => user.uid == project.createdBy
                            )[0].displayName
                          }
                        </div>
                      ),
                    },
                    {
                      key: "collaborators",
                      content: (
                        <Assignees>
                          {[...project.collaborators, project.createdBy].map(
                            (collaboratorID) => {
                              const collaborator = users.find(
                                (user) => user.uid === collaboratorID
                              );
                              return (
                                <AssigneeAvatar
                                  key={collaborator.uid}
                                  size={24}
                                  avatarUrl={collaborator.photoURL}
                                  name={collaborator.displayName}
                                />
                              );
                            }
                          )}
                        </Assignees>
                      ),
                    },
                    {
                      key: "category",
                      content: <div>{project.category}</div>,
                    },
                  ],
                };
              })}
            />
          )}
        </Project>
      </Projects>
    </>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogoutButton = styled.div`
  padding-left: 10px;
`;

const Projects = styled.div`
  padding: 25px;
`;

const Header = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
`;

const Title = styled.div`
  ${font.size(24)}
  ${font.medium}
`;

const ProjectTitle = styled.p`
  display: flex;
  flex-direction: row;
`;

const ProjectLink = styled(Link)`
  display: block;
  margin-bottom: 5px;
  text-decoration: underline;
  color: ${color.primary};
  padding-left: 5px;
`;

const Project = styled.div``;

const Divider = styled.div`
  margin-top: 22px;
  border-top: 1px solid ${color.borderLightest};
`;

const Assignees = styled.div`
  display: flex;
  margin-left: 2px;
`;

const AssigneeAvatar = styled(Avatar)`
  margin-left: -2px;
  box-shadow: 0 0 0 2px #fff;
`;
