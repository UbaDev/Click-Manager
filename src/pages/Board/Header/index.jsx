import React from "react";
import { Button } from "../../../components";

import { Header, BoardName } from "./Styles";

const ProjectBoardHeader = ({ setShowCreateIssueModal }) => (
  <Header>
    <BoardName>Tablero de asignaciones</BoardName>

    <Button variant="primary" onClick={() => setShowCreateIssueModal()}>
      Crear asignación
    </Button>
  </Header>
);

export default ProjectBoardHeader;
