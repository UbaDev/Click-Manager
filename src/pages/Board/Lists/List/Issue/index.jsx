import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import {
  IssueLink,
  Issue,
  Title,
  Bottom,
  Assignees,
  AssigneeAvatar,
} from "./Styles";
import { IssuePriorityIcon, IssueTypeIcon } from "../../../../../components";

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectBoardListIssue = ({ projectUsers, project, issue, index }) => {
  // const match = useRouteMatch();

  const assignees = issue.assignees.map((userId) =>
    projectUsers.find((user) => user.uid === userId)
  );

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <IssueLink
          to={`/project/${project.id}/board/${issue.id}`}
          ref={provided.innerRef}
          data-testid="list-issue"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Issue
            isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
          >
            <Title>{issue.title}</Title>
            <Bottom>
              <div>
                <IssueTypeIcon type={issue.type} />
                <IssuePriorityIcon
                  priority={issue.priority}
                  top={-1}
                  left={4}
                />
              </div>
              <Assignees>
                {assignees.map((user) => (
                  <AssigneeAvatar
                    key={user.uid}
                    size={24}
                    avatarUrl={user.photoURL}
                    name={user.displayName}
                  />
                ))}
              </Assignees>
            </Bottom>
          </Issue>
        </IssueLink>
      )}
    </Draggable>
  );
};

ProjectBoardListIssue.propTypes = propTypes;

export default ProjectBoardListIssue;
