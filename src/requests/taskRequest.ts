import axiosBase from "axios";
import { TaskType } from "../interfaces/Task";

type action =
  | "fetchTasks"  // 取得
  | "createTasks"  // 作成
  | "updateTasks"  // 編集
  | "deleteTasks"  // 削除
  | "updateStatus";  // 状態変更

type parameter = { data: TaskType; status?: number };

const api = axiosBase.create({
  baseURL: "http://localhost:3000/tasks",
  responseType: "json",
});

export const taskRequest: (
  action: action,
  parameter?: parameter
) => any = async (action: action, parameter?: parameter) => {
  if (parameter) {
    switch (action) {
      case "createTasks":
        const createTasks = await api.post(`/`, parameter.data);
        return createTasks.data;
      case "updateTasks":
        const updateTasks = await api.put(
          `/${parameter.data.id}`,
          parameter.data
        );
        return updateTasks.data;
      case "deleteTasks":
        const deleteTasks = await api.delete(`/${parameter.data.id}`);
        return deleteTasks.data;
      case "updateStatus":
        const updateStatus = await api.post(`/${parameter.data.id}/status`, {
          status: parameter.status,
        });
        return updateStatus.data;
      default:
        return null;
    }
  } else {
    switch (action) {
      case "fetchTasks":
        const tasks = await api.get("/");
        return tasks.data;
      default:
        return null;
    }
  }
};