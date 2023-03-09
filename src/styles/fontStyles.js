import { createGlobalStyle } from "styled-components";
import CircularStdBlack from "../assets/fonts/CircularStd-Black.woff2";
import CircularStdBlack2 from "../assets/fonts/CircularStd-Black.woff";

import CircularStdBold from "../assets/fonts/CircularStd-Bold.woff2";
import CircularStdBold2 from "../assets/fonts/CircularStd-Bold.woff";

import CircularStdMedium from "../assets/fonts/CircularStd-Medium.woff2";
import CircularStdMedium2 from "../assets/fonts/CircularStd-Medium.woff";

import CircularStdBook from "../assets/fonts/CircularStd-Book.woff2";
import CircularStdBook2 from "../assets/fonts/CircularStd-Book.woff";

import jira from "../assets/fonts/jira.svg#jira";
import jira1 from "../assets/fonts/jira.ttf";
import jira2 from "../assets/fonts/jira.woff";

const FontStyles = createGlobalStyle`

  @font-face {
    font-family: "CircularStdBlack";
    src: url(${CircularStdBlack2}) format("woff2"),
      url(${CircularStdBlack}) format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "CircularStdBold";
    src: url(${CircularStdBold2}) format("woff2"),
      url(${CircularStdBold}) format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "CircularStdMedium";
    src: url(${CircularStdMedium2}) format("woff2"),
      url(${CircularStdMedium}) format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "CircularStdBook";
    src: url(${CircularStdBook2}) format("woff2"),
      url(${CircularStdBook}) format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "jira";
    src: url(${jira2}) format("truetype"),
      url(${jira1}) format("woff"),
      url(${jira}) format("svg");
    font-weight: normal;
    font-style: normal;
  }
  
`;

export default FontStyles;
