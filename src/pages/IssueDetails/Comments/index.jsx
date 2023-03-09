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
    <Title>Comentarios</Title>
    <Create issueId={issue.id} fetchIssue={fetchIssue} />

    {sortByNewest(issue.comments, "createdAt").map((comment) => (
      <Comment key={comment.id} comment={comment} fetchIssue={fetchIssue} />
    ))}
  </Comments>
);

export const sortByNewest = (items, sortField) =>
  items.sort((a, b) => -a[sortField].localeCompare(b[sortField]));

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
