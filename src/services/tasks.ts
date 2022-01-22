import { db } from "../firebase";
import { getDocs, setDoc, doc, collection } from "firebase/firestore";
import { getAllProjects } from "./projects";
import { Task } from "../features/tasks/tasksSlice";


// creates a new tasks or updates an existing tasks
export const updateTask = async (uid: string, task: Task) => {
  const path = `users/${uid}/projects/${task.projectId}/tasks`;
  await setDoc(doc(db, path, task.id), { ...task });
};

// gets all tasks for user from firestore
export const getAllTasks = async (uid: string, projects: any[]) => {
  const snapshots = projects.map((project) =>
    getDocs(collection(db, `users/${uid}/projects/${project.id}/tasks`))
  );
  const resolved = await Promise.all(snapshots);

  const tasks = resolved.reduce((acc: any[], snapshot) => {
    const list: any[] = [];
    snapshot.forEach((doc) => list.push(doc.data()));
    return acc.concat(list);
  }, []);

  return tasks;
};

// gets all tasks and projects from firestore
export const getAllData = async (uid: string) => {
  const projects: any[] = await getAllProjects(uid);
  const tasks: any[] = await getAllTasks(uid, projects);

  return [tasks, projects];
};
