import React from "react";
import PropTypes from "prop-types";
import { Button, ConfirmModal } from "../../components";

const propTypes = {
  issue: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsDelete = ({
  issue,
  fetchProject,
  modalClose,
}) => {
  const handleIssueDelete = async () => {
    try {
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title="Are you sure you want to delete this issue?"
      message="Once you delete, it's gone for good."
      confirmText="Delete issue"
      onConfirm={handleIssueDelete}
      renderLink={(modal) => (
        <Button
          icon="trash"
          iconSize={19}
          variant="empty"
          onClick={modal.open}
        />
      )}
    />
  );
};

ProjectBoardIssueDetailsDelete.propTypes = propTypes;

export default ProjectBoardIssueDetailsDelete;
