import { getAuth, User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  Unsubscribe,
  where,
} from "firebase/firestore";

import { StorageReference } from "firebase/storage";

export enum ProjectCategory {
  DESIGN = "Diseño",
  ENGINEERING = "Software",
  MARKETING = "Mercadotecnia",
  OPERATIONS = "Operación",
  OTHER = "Otro",
}

export enum ProjectType {
  SOFTWARE = "Software",
  PRODUCT = "Product",
  SERVICE = "Service",
  BUSINESS = "Business",
  OTHER = "Other",
}

export enum IssueType {
  TASK = "task",
  BUG = "bug",
  STORY = "story",
}

export enum IssueStatus {
  TODO = "todo",
  INPROGRESS = "inprogress",
  DONE = "done",
}

export enum IssuePriority {
  HIGHEST = "5",
  HIGH = "4",
  MEDIUM = "3",
  LOW = "2",
  LOWEST = "1",
}
export interface IssueComment {
  id?: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  issueId: string;
}

export interface Issue {
  id?: string;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  listPosition: number;
  description: string | null;
  descriptionText: string | null;
  estimate: number | null;
  timeSpent: number | null;
  timeRemaining: number | null;
  createdAt: Date;
  updatedAt: Date;
  reporterId: string;
  projectId: string;
  assignees: string[];
  comments: IssueComment[];
}

export interface Project {
  id?: string;
  name: string;
  description: string | null;
  category: ProjectCategory;
  type: ProjectType;
  icon: StorageReference | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  collaborators: string[];
  issues: Issue[];
}

export class ProjectService {
  private static instance: ProjectService;
  private database: Firestore = getFirestore();
  private auth = getAuth();

  private constructor() {}
  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  public async getProject(id: string): Promise<Project> {
    const docRef = doc(this.database, `projects/${id}`);
    const project = await getDoc(docRef);
    const data = project.data() as Project;
    data.id = project.id;
    return data;
  }

  public async getProjects(): Promise<Project[]> {
    const collobratedProjects = (
      await getDocs(
        query(
          collection(this.database, "projects"),
          where("collaborators", "array-contains", this.auth.currentUser.uid)
        )
      )
    ).docs.map((doc) => {
      const data = doc.data() as Project;
      data.id = doc.id;
      return data;
    });
    const myProjects = (
      await getDocs(
        query(
          collection(this.database, "projects"),
          where("createdBy", "==", this.auth.currentUser.uid)
        )
      )
    ).docs.map((doc) => {
      const data = doc.data() as Project;
      data.id = doc.id;
      return data;
    });

    return [...collobratedProjects, ...myProjects];
    // return snapshot.docs.map((doc) => {
    //   const data = doc.data() as Project;
    //   data.id = doc.id;
    //   return data;
    // });
  }

  public async createProject(project: Project): Promise<DocumentReference> {
    const docRef = await addDoc(collection(this.database, `projects`), {
      name: project.name,
      description: project.description,
      category: project.category,
      type: project.type,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      createdBy: project.createdBy,
      collaborators: project.collaborators,
    });
    return docRef;
  }

  public async updateProject(project: Project): Promise<void> {
    const docRef = doc(this.database, `projects/${project.id}`);
    await setDoc(
      docRef,
      {
        name: project.name,
        description: project.description,
        category: project.category,
        type: project.type,
        createdAt: project.createdAt ?? new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
        createdBy: project.createdBy,
        collaborators: project.collaborators,
      },
      {
        merge: true,
      }
    );
  }

  public async getIssues(project: Project): Promise<Issue[]> {
    const issues = await getDocs(
      collection(this.database, `projects/${project.id}/issues`)
    );

    return issues.docs.map((doc) => {
      const data = doc.data() as Issue;
      data.id = doc.id;
      return data;
    });
  }

  public async getIssue(project: Project, issueId: string): Promise<Issue> {
    const docRef = doc(
      this.database,
      `projects/${project.id}/issues/${issueId}`
    );
    const issue = await getDoc(docRef);
    const data = issue.data() as Issue;
    data.id = issue.id;
    data.comments = [];
    return data;
  }

  public async createIssue(
    project: Project,
    issue: Issue
  ): Promise<DocumentReference> {
    const issues = await getDocs(
      query(
        collection(this.database, `projects/${project.id}/issues`),
        where("status", "==", IssueStatus.TODO)
      )
    );

    const docRef = await addDoc(
      collection(this.database, `projects/${project.id}/issues`),
      {
        ...issue,
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
        status: IssueStatus.TODO,
        projectId: project.id,
        listPosition: issues.docs.length,
      }
    );
    return docRef;
  }

  public async updateIssue(project: Project, issue: Issue): Promise<void> {
    const docRef = doc(
      this.database,
      `projects/${project.id}/issues/${issue.id}`
    );
    await setDoc(
      docRef,
      {
        ...issue,
        updatedAt: new Date().toUTCString(),
      },
      {
        merge: true,
      }
    );
  }

  public observeProject(
    id: string,
    callback: (project: Project) => void
  ): Unsubscribe {
    return onSnapshot(doc(this.database, `projects/${id}`), (doc) => {
      const data = doc.data() as Project;
      data.id = doc.id;
      callback(data);
    });
  }

  public observeIssues(
    project: Project,
    callback: (issues: Issue[]) => void
  ): Unsubscribe {
    return onSnapshot(
      collection(this.database, `projects/${project.id}/issues`),
      (snapshot) => {
        if (
          snapshot.docChanges().filter((change) => change.type === "added")
            .length > 0
        ) {
          callback(
            snapshot.docs.map((doc) => {
              const data = doc.data() as Issue;
              data.id = doc.id;
              return data;
            })
          );
        }
      }
    );
  }
}
