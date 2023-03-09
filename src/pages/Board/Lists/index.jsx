import React from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

import List from "./List";
import { Lists } from "./Styles";
import { getAuth } from "firebase/auth";
import { IssueStatus } from "../../../constants/issues";
import {
  insertItemIntoArray,
  moveItemWithinArray,
} from "../../../utils/javascript";
import { ProjectService } from "../../../services/ProjectService";
import toast from "../../../utils/toast";

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const ProjectBoardLists = ({ project, filters, updateLocalProjectIssues }) => {
  const auth = getAuth();

  const [allIssues, setAllIssues] = React.useState(project.issues);

  // observe the project issues and reload it if it changes
  React.useEffect(() => {
    const unsubscribe = ProjectService.getInstance().observeIssues(
      project,
      (issues) => {
        project.issues = issues;
        setAllIssues(issues);
        updateLocalProjectIssues(issues);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleIssueDrop = async ({ draggableId, destination, source }) => {
    if (!isPositionChanged(source, destination)) return;
    const position = calculateIssueListPosition(
      project.issues,
      destination,
      source,
      draggableId
    );

    console.log("handleIssueDrop", draggableId, destination, source, position);
    try {
      const updatedIssues = project.issues.map((issue) => {
        if (issue.id === draggableId) {
          return {
            ...issue,
            status: destination.droppableId,
            listPosition: position,
          };
        }
        return issue;
      });

      project.issues = updatedIssues;

      setAllIssues(updatedIssues);

      updateLocalProjectIssues(updatedIssues);

      await ProjectService.getInstance().updateIssue(project, {
        id: draggableId,
        status: destination.droppableId,
        listPosition: position,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DragDropContext onDragEnd={handleIssueDrop}>
      <Lists>
        {Object.values(IssueStatus).map((status) => (
          <List
            key={status}
            issues={getSortedListIssues(allIssues, status)}
            status={status}
            project={project}
            filters={filters}
            currentUserId={auth.currentUser.uid}
          />
        ))}
      </Lists>
    </DragDropContext>
  );
};

const isPositionChanged = (destination, source) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const calculateIssueListPosition = (...args) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1;
  } else {
    position =
      prevIssue.listPosition +
      (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }

  return position;
};

const getAfterDropPrevNextIssue = (
  allIssues,
  destination,
  source,
  droppedIssueId
) => {
  const beforeDropDestinationIssues = getSortedListIssues(
    allIssues,
    destination.droppableId
  );
  const droppedIssue = allIssues.find((issue) => issue.id === droppedIssueId);
  const isSameList = destination.droppableId === source.droppableId;
  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      )
    : insertItemIntoArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      );

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues, status) =>
  issues
    .filter((issue) => issue.status === status)
    .sort((a, b) => a.listPosition - b.listPosition);

ProjectBoardLists.propTypes = propTypes;

export default ProjectBoardLists;
