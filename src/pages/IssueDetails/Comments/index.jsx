import React from "react";
import PropTypes from "prop-types";

import Create from "./Create";
import Comment from "./Comment";
import { Comments, Title } from "./Styles";

const propTypes = {
  issue: PropTypes.object.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsComments = ({ issue, fetchIssue }) => (
  <Comments>

  </Comments>
);

export const sortByNewest = (items, sortField) =>
  items.sort((a, b) => -a[sortField].localeCompare(b[sortField]));

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
