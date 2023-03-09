import styled from "styled-components";

import { issueTypeColors } from "../../styles/styles";
import { Icon } from "..";

export const TypeIcon = styled(Icon)`
  color: ${(props) => issueTypeColors[props.color]};
`;
