import { db } from "../firebase";
import { getDocs, setDoc, doc, collection } from "firebase/firestore";
import { Project } from "../features/projects/projectsSlice";

// creates or updates an existing project
export const updateProject = async (uid: string, project: Project) => {
  const path = `users/${uid}/projects`;
  await setDoc(doc(db, path, project.id), { ...project });
};

// gets all projects for user from firestore
export const getAllProjects = async (uid: string) => {
  const projects: any = [];

  const projectsSnapshot = await getDocs(
    collection(db, `users/${uid}/projects`)
  );
  projectsSnapshot.forEach((doc) =>
    projects.push({ id: doc.id, ...doc.data() })
  );

  return projects;
};
