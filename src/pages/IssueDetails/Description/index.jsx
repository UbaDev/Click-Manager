import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { Title, EmptyLabel, Actions } from "./Styles";
import { getTextContentsFromHtmlString } from "../../../utils/browser";
import { Button, TextEditedContent, TextEditor } from "../../../components";

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsDescription = ({ issue, updateIssue }) => {
  const [description, setDescription] = useState(issue.description);
  const [isEditing, setEditing] = useState(false);

  const handleUpdate = () => {
    setEditing(false);
    updateIssue({ description });
  };

  const isDescriptionEmpty =
    getTextContentsFromHtmlString(description).trim().length === 0;

  return (
    <Fragment>
      
    </Fragment>
  );
};

ProjectBoardIssueDetailsDescription.propTypes = propTypes;

export default ProjectBoardIssueDetailsDescription;
