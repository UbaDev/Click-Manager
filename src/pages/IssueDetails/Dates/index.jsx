import React from "react";
import PropTypes from "prop-types";

import { Dates } from "./Styles";
import { formatDateTimeConversational } from "../../../utils/dateTime";

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsDates = ({ issue }) => (
  <Dates>
    <div>Creado hace {formatDateTimeConversational(issue.createdAt)}</div>
    <div>Actualizado hace {formatDateTimeConversational(issue.updatedAt)}</div>
  </Dates>
);

ProjectBoardIssueDetailsDates.propTypes = propTypes;

export default ProjectBoardIssueDetailsDates;
