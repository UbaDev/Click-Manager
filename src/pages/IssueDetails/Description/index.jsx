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
      <Title>Descripción</Title>
      {isEditing ? (
        <Fragment>
          <TextEditor
            placeholder="Describe la asignación"
            defaultValue={description}
            onChange={setDescription}
          />
          <Actions>
            <Button variant="primary" onClick={handleUpdate}>
              Guardar
            </Button>
            <Button variant="empty" onClick={() => setEditing(false)}>
              Cancelar
            </Button>
          </Actions>
        </Fragment>
      ) : (
        <Fragment>
          {isDescriptionEmpty ? (
            <EmptyLabel onClick={() => setEditing(true)}>
              Agrega una descripción...
            </EmptyLabel>
          ) : (
            <TextEditedContent
              content={description}
              onClick={() => setEditing(true)}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectBoardIssueDetailsDescription.propTypes = propTypes;

export default ProjectBoardIssueDetailsDescription;
