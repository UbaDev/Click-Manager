import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { SectionTitle } from "../Styles";
import { User, Username } from "./Styles";
import { Avatar, Icon, Select } from "../../../components";

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardIssueDetailsAssigneesReporter = ({
  issue,
  updateIssue,
  projectUsers,
}) => {
  const getUserById = (userId) =>
    projectUsers.find((user) => user.uid === userId);

  const userOptions = projectUsers.map((user) => ({
    value: user.uid,
    label: user.displayName,
  }));

  return (
    <Fragment>
      <SectionTitle>Assignees</SectionTitle>
      <Select
        isMulti
        variant="empty"
        dropdownWidth={343}
        placeholder="Unassigned"
        name="assignees"
        value={issue.assignees}
        options={userOptions}
        onChange={(userIds) => {
          updateIssue({ userIds, users: userIds.map(getUserById) });
        }}
        renderValue={({ value: userId, removeOptionValue }) =>
          renderUser(getUserById(userId), true, removeOptionValue)
        }
        renderOption={({ value: userId }) =>
          renderUser(getUserById(userId), false)
        }
      />

      <SectionTitle>Reporter</SectionTitle>
      <Select
        variant="empty"
        dropdownWidth={343}
        withClearValue={false}
        name="reporter"
        value={issue.reporterId}
        options={userOptions}
        onChange={(userId) => updateIssue({ reporterId: userId })}
        renderValue={({ value: userId }) =>
          renderUser(getUserById(userId), true)
        }
        renderOption={({ value: userId }) => renderUser(getUserById(userId))}
      />
    </Fragment>
  );
};

const renderUser = (user, isSelectValue, removeOptionValue) => (
  <User
    key={user.uid}
    isSelectValue={isSelectValue}
    withBottomMargin={!!removeOptionValue}
    onClick={() => removeOptionValue && removeOptionValue()}
  >
    <Avatar avatarUrl={user.photoURL} name={user.displayName} size={24} />
    <Username>{user.displayName}</Username>
    {removeOptionValue && <Icon type="close" top={1} />}
  </User>
);

ProjectBoardIssueDetailsAssigneesReporter.propTypes = propTypes;

export default ProjectBoardIssueDetailsAssigneesReporter;
