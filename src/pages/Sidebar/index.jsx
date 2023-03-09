import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useRoutes } from "react-router-dom";

import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  Divider,
  LinkItem,
  LinkText,
  NotImplemented,
} from "./Styles";
import { Icon, ProjectAvatar } from "../../components";

const propTypes = {
  project: PropTypes.object.isRequired,
};

const ProjectSidebar = ({ project }) => {
  return (
    <Sidebar>
      <ProjectInfo>
        <ProjectAvatar />
        <ProjectTexts>
          <ProjectName>{project.name}</ProjectName>
          <ProjectCategory>Proyecto de {project.category} </ProjectCategory>
        </ProjectTexts>
      </ProjectInfo>

      {renderLinkItem("Tablero", "board", `/project/${project.id}/board`)}
      {renderLinkItem(
        "Configuraciones",
        "settings",
        `/project/${project.id}/settings`
      )}
      {/* <Divider /> */}
      {/* {renderLinkItem("Releases", "shipping")} */}
      {/* {renderLinkItem("Issues and filters", "issues")} */}
      {/* {renderLinkItem("Pages", "page")} */}
      {/* {renderLinkItem("Reports", "reports")}
      {renderLinkItem("Components", "component")} */}
    </Sidebar>
  );
};

const renderLinkItem = (text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = isImplemented ? { to: `${path}` } : { as: "div" };

  return (
    <LinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};

ProjectSidebar.propTypes = propTypes;

export default ProjectSidebar;
