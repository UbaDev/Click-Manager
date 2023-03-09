import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Loader from "./Loader";
import Type from "./Type";
import Delete from "./Delete";
import Title from "./Title";
import Description from "./Description";
import Comments from "./Comments";
import Status from "./Status";
import AssigneesReporter from "./AssigneesReporter";
import Priority from "./Priority";
import EstimateTracking from "./EstimateTracking";
import Dates from "./Dates";
import { TopActions, TopActionsRight, Content, Left, Right } from "./Styles";
import { ProjectService } from "../../services/ProjectService";
import { AboutTooltip, Button, CopyLinkButton } from "../../components";

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetails = ({
  project,
  issueId,
  projectUsers,
  fetchProject,
  updateLocalProjectIssues,
  modalClose,
}) => {
  const [issue, setIssue] = React.useState(null);
  const [error, setError] = React.useState(null);

  const fetchIssue = async () => {
    try {
      const issue = await ProjectService.getIssue(project.id, issueId);
      setIssue(issue);
    } catch (error) {
      setError(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const issue = await ProjectService.getInstance().getIssue(
          project,
          issueId
        );
        setIssue(issue);
      } catch (error) {
        setError(error);
        toast.error(error.message);
      }
    })();
  }, []);

  if (!issue) return <Loader />;
  if (error) return <PageError />;

  const updateLocalIssueDetails = (fields) =>
    setLocalData((currentData) => ({
      issue: { ...currentData.issue, ...fields },
    }));

  const updateIssue = (updatedFields) => {
    console.log("updateIssue", updatedFields);

    // api.optimisticUpdate(`/issues/${issueId}`, {
    //   updatedFields,
    //   currentFields: issue,
    //   setLocalData: (fields) => {
    //     updateLocalIssueDetails(fields);
    //     updateLocalProjectIssues(issue.id, fields);
    //   },
    // });
  };

  return (
    <Fragment>
      <TopActions>
        <Type issue={issue} updateIssue={updateIssue} />
        <TopActionsRight>
          <CopyLinkButton variant="empty" />
          <Delete
            issue={issue}
            fetchProject={fetchProject}
            modalClose={modalClose}
          />
          <Button
            icon="close"
            iconSize={24}
            variant="empty"
            onClick={modalClose}
          />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <Title issue={issue} updateIssue={updateIssue} />
          <Description issue={issue} updateIssue={updateIssue} />
          <Comments issue={issue} fetchIssue={fetchIssue} />
        </Left>
        <Right>
          <Status issue={issue} updateIssue={updateIssue} />
          <AssigneesReporter
            issue={issue}
            updateIssue={updateIssue}
            projectUsers={projectUsers}
          />
          <Priority issue={issue} updateIssue={updateIssue} />
          <EstimateTracking issue={issue} updateIssue={updateIssue} />
          <Dates issue={issue} />
        </Right>
      </Content>
    </Fragment>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;

export default ProjectBoardIssueDetails;
