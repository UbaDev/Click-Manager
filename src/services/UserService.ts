import { getAuth, UserInfo } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export class UserService {
  private static instance: UserService;
  private database: Firestore = getFirestore();
  private auth = getAuth();

  private constructor() {}
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async updateUser(): Promise<void> {
    const docRef = doc(this.database, `users/${this.auth.currentUser.uid}`);
    await setDoc(
      docRef,
      {
        uid: this.auth.currentUser.uid,
        displayName: this.auth.currentUser.displayName,
        email: this.auth.currentUser.email,
        photoURL: this.auth.currentUser.photoURL,
        emailVerified: this.auth.currentUser.emailVerified,
      },
      {
        merge: true,
      }
    );
  }

  public async getUsers(): Promise<UserInfo[]> {
    const snapshot = await getDocs(collection(this.database, `users`));
    return snapshot.docs.map((doc) => doc.data() as UserInfo);
  }

  public async getUsersByIds(ids: string[]): Promise<UserInfo[]> {
    const q = query(
      collection(this.database, "users"),
      where("uid", "in", ids)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as UserInfo);
    // const snapshot = await getDocs(collection(this.database, `users`));
    // return snapshot.docs.map((doc) => doc.data() as UserInfo);
  }
}
