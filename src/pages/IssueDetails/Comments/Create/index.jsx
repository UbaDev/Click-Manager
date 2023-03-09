import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import BodyForm from "../BodyForm";
import ProTip from "./ProTip";
import { Create, UserAvatar, Right, FakeTextarea } from "./Styles";

import { getAuth } from "firebase/auth";

const propTypes = {
  issueId: PropTypes.string.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsCommentsCreate = ({ issueId, fetchIssue }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [body, setBody] = useState("");

  const auth = getAuth();

  const handleCommentCreate = async () => {
    try {
      setCreating(true);
      // await api.post(`/comments`, { body, issueId, userId: currentUser.id });
      // await fetchIssue();
      setFormOpen(false);
      setCreating(false);
      setBody("");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Create>
      {auth.currentUser && (
        <UserAvatar
          name={auth.currentUser.displayName}
          avatarUrl={auth.currentUser.photoURL}
        />
      )}
      <Right>
        {isFormOpen ? (
          <BodyForm
            value={body}
            onChange={setBody}
            isWorking={isCreating}
            onSubmit={handleCommentCreate}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <Fragment>
            <FakeTextarea onClick={() => setFormOpen(true)}>
              Add a comment...
            </FakeTextarea>
            <ProTip setFormOpen={setFormOpen} />
          </Fragment>
        )}
      </Right>
    </Create>
  );
};

ProjectBoardIssueDetailsCommentsCreate.propTypes = propTypes;

export default ProjectBoardIssueDetailsCommentsCreate;
