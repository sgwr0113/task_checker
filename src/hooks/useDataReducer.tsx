import { useReducer } from "react";
import { TaskType } from "../interfaces/Task";
import { GenreType } from "../interfaces/Genre";

export type Data = {
  taskData: TaskType[];
  genreData: GenreType[];
  isLoading: boolean;
  error?: string;
};

export type DataAction = {  // actionはDataActionとして型定義 actionはdispatchを行う際に引数として渡す
  type: "request" | "success" | "failure";
  payload: { task?: TaskType[]; genre?: GenreType[]; error?: string };  // dispatchの際データを渡す必要がある場合が存在するため、payloadというデータを引数で渡す型指定も行いました。
};

export const useDataReducer = (): [
  Data,
  ({ type, payload }: DataAction) => void
] => {
  const initialData: Data = {   // 初期値の設定
    taskData: [
      {
        id: 0,
        name: "",
        explanation: "",
        deadline_date: "",
        status: 0,
        genre_id: 0,
      },
    ],
    genreData: [{ id: 0, name: "" }],
    isLoading: false,
    error: "",
  };

  const reducer = (data: Data, action: DataAction) => { // dispatchの引数を受け取りinitialDataの構成にしたがって値をセットし直せるようにする
    switch (action.type) {
      case "request":
        return {
          ...data,
          isLoading: true,
        };
      case "success":
        return {
          ...data,
          taskData: action.payload.task || data.taskData,
          genreData: action.payload.genre || data.genreData,
          isLoading: true,
        };
      case "failure":
        return {
          ...data,
          isLoading: true,
          error: action.payload.error,
        };
    }
  };

  const [data, dispatch] = useReducer(reducer, initialData);
  return [data, dispatch];
};