import React, { Fragment, useRef } from "react";
import PropTypes from "prop-types";

import { Actions, FormButton } from "./Styles";
import { Textarea } from "../../../../components";

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isWorking: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsCommentsBodyForm = ({
  value,
  onChange,
  isWorking,
  onSubmit,
  onCancel,
}) => {
  const $textareaRef = useRef();

  const handleSubmit = () => {
    if ($textareaRef.current.value.trim()) {
      onSubmit();
    }
  };

  return (
    <Fragment>
      <Textarea
        autoFocus
        placeholder="Agrega un comentario..."
        value={value}
        onChange={onChange}
        ref={$textareaRef}
      />
      <Actions>
        <FormButton
          variant="primary"
          isWorking={isWorking}
          onClick={handleSubmit}
        >
          Guardar
        </FormButton>
        <FormButton variant="empty" onClick={onCancel}>
          Cancelar
        </FormButton>
      </Actions>
    </Fragment>
  );
};

ProjectBoardIssueDetailsCommentsBodyForm.propTypes = propTypes;

export default ProjectBoardIssueDetailsCommentsBodyForm;
