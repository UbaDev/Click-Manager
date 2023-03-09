import React from "react";
import PropTypes from "prop-types";

import { PriorityIcon } from "./Styles";
import { IssuePriority } from "../../constants/issues";

const propTypes = {
  priority: PropTypes.string.isRequired,
};

const IssuePriorityIcon = ({ priority, ...otherProps }) => {
  const iconType = [IssuePriority.LOW, IssuePriority.LOWEST].includes(priority)
    ? "arrow-down"
    : "arrow-up";

  return (
    <PriorityIcon type={iconType} color={priority} size={18} {...otherProps} />
  );
};

IssuePriorityIcon.propTypes = propTypes;

export default IssuePriorityIcon;
