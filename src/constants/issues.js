export const IssueType = {
  TASK: "task",
  BUG: "bug",
  STORY: "story",
};

export const IssueStatus = {
  // BACKLOG: "backlog",
  // SELECTED: "selected",
  TODO: "todo",
  INPROGRESS: "inprogress",
  DONE: "done",
};

export const IssuePriority = {
  HIGHEST: "5",
  HIGH: "4",
  MEDIUM: "3",
  LOW: "2",
  LOWEST: "1",
};

export const IssueTypeCopy = {
  [IssueType.TASK]: "Nueva asignación",
  [IssueType.BUG]: "Re-trabajo",
  [IssueType.STORY]: "Pruebas",
};

export const IssueStatusCopy = {
  // [IssueStatus.BACKLOG]: "Backlog",
  // [IssueStatus.SELECTED]: "Selected for development",
  [IssueStatus.TODO]: "Nuevo",
  [IssueStatus.INPROGRESS]: "En progreso",
  [IssueStatus.DONE]: "Terminado",
};

export const IssuePriorityCopy = {
  [IssuePriority.HIGHEST]: "Urgente",
  [IssuePriority.HIGH]: "Importante",
  [IssuePriority.MEDIUM]: "Normal",
  [IssuePriority.LOW]: "Baja importancia",
  [IssuePriority.LOWEST]: "Puede esperar",
};
