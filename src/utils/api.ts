import { Task } from "@/interfaces/Task";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<any>(API_URL);

  const tasks: Task[] = response.data.map(
    (item: { id: number; title: string; completed: boolean }) => ({
      id: item.id,
      title: item.title,
      completed: item.completed,
    })
  );

  return tasks;
};
