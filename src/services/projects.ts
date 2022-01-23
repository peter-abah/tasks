import { db } from "../firebase";
import { getDocs, setDoc, doc, collection, deleteDoc } from "firebase/firestore";
import { Project } from "../features/projects/projectsSlice";

// creates or updates an existing project
export const updateProject = async (uid: string, project: Project) => {
  const path = `users/${uid}/projects`;
  await setDoc(doc(db, path, project.id), { ...project });
};

export const deleteProject = async (uid: string, project: Project) => {
  const path = `users/${uid}/projects/`
  await deleteDoc(doc(db, path, project.id))
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
