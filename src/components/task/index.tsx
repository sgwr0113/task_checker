import React, { useContext, useState } from "react";
import { Select } from "../select";
import { DataContext } from "../../pages/home";
import { TaskType } from "../../interfaces/Task";
import { taskRequest } from "../../requests/taskRequest";
import "./style.css";

interface Props {
  task: TaskType;
  getMatchTask: (id: number) => void;
}

export const Task = (props: Props) => {
  const listElements: string[] = [
    "ToDo",
    "Pending",
    "Doing(ToDay)",
    "WIP",
    "Check",
    "Done",
  ];
  const date: Date = new Date();

  const [status, setStatus] = useState<number>(props.task.status);
  const { dispatch } = useContext(DataContext);

  const changeStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(event.target.value);
    try {
      const tasks: TaskType[] = await taskRequest("updateStatus", {
        data: props.task,
        status: val,
      });
      dispatch({ type: "success", payload: { task: tasks } });
      setStatus(val);
    } catch (err) {
      dispatch({ type: "failure", payload: { error: err.message } });
    }
  };

  return (
    // styleの追加（期限が切れていれば、rgb(250, 194, 194)をセット）
    <div
      className="task"
      style={{
        backgroundColor:
          new Date(props.task.deadline_date) > date
            ? "white"
            : "rgb(250, 194, 194)",
      }}
    >
      {/* 期日を表示 */}
      <span className="task_date">{props.task.deadline_date}</span>
      <div
        className="task_text_contents"
        onClick={() => props.getMatchTask(props.task.id)}
      >
        <h3 className="task_title">{props.task.name}</h3>
        <p className="task_sentence">{props.task.explanation}</p>
      </div>
      <div className="task_input_contents flex space_between">
        {/* タグの要素と、初期値と、変更した値をstateで管理する関数を渡す */}
        <Select
          optionElements={listElements}
          initialValue={status}
          selectList={changeStatus}
        />
      </div>
    </div>
  );
};