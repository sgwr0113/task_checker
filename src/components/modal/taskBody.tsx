import React, { useContext, useState } from "react";
import { Select } from "../../components/select";
import { DataContext } from "../../pages/home";
import { TaskType } from "../../interfaces/Task";
import { taskRequest } from "../../requests/taskRequest";
import "./style.css";

interface Props {
  task?: TaskType;
  handleClose: () => void;
}

export const TaskBody = (props: Props) => {
  const { data, dispatch } = useContext(DataContext);
  const [name, setName] = useState<string>(
    (props.task && props.task.name) || ""
  );
  const [genreId, setGenreId] = useState<number>(
    (props.task && props.task.genre_id) || 1
  );
  const [explanation, setExplanation] = useState<string>(
    (props.task && props.task.explanation) || ""
  );
  const [deadlineDate, setDeadlineDate] = useState<string>(
    (props.task && props.task.deadline_date) || ""
  );

  const onClickSubmit = async () => {
    const requestData = {
      id: (props.task && props.task.id) || 0,
      name: name,
      genre_id: genreId,
      explanation: explanation,
      deadline_date: deadlineDate,
      status: (props.task && props.task.status) || 0,
    };

    if (props.task !== undefined) {
      try {
        const tasks: TaskType[] = await taskRequest("updateTasks", {
          data: requestData,
        });
        dispatch({ type: "success", payload: { task: tasks } });
      } catch (err) {
        dispatch({ type: "failure", payload: { error: err.message } });
      }
    } else {
      try {
        const tasks: TaskType[] = await taskRequest("createTasks", {
          data: requestData,
        });
        dispatch({ type: "success", payload: { task: tasks } });
      } catch (err) {
        dispatch({ type: "failure", payload: { error: err.message } });
      }
    }
    props.handleClose();
  };

  const handleChangeGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenreId(Number(event.target.value));
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeExplanation = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExplanation(event.target.value);
  };

  const handleChangeDeadlineDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeadlineDate(event.target.value);
  };

  const handleOnDelete = async () => {
    try {
      if (props.task) {
        const tasks: TaskType[] = await taskRequest("deleteTasks", {
          data: props.task,
        });
        dispatch({ type: "success", payload: { task: tasks } });
      }
      props.handleClose();
    } catch (err) {
      dispatch({ type: "failure", payload: { error: err.message } });
    }
  };

  return (
    <form className="flex direction_column horizontal_center vertical_center">
      <h2 className="input_menu">タスクを追加</h2>
      <div>
        <h4 className="input_title">ジャンル</h4>
        <div className="task_genre">
          <Select
            genres={data.genreData}
            selectList={handleChangeGenre}
            initialValue={genreId}
          />
        </div>
        <h4 className="input_title">タイトル</h4>
        <input type="text" value={name} onChange={handleChangeTitle} />
        <h4 className="input_title">説明</h4>
        <textarea value={explanation} onChange={handleChangeExplanation} />
        <h4 className="input_title">期限</h4>
        <input
          className="input_date"
          type="date"
          value={deadlineDate}
          onChange={handleChangeDeadlineDate}
        />
      </div>
      <input
        className="input_submit"
        type="button"
        value="送信"
        onClick={onClickSubmit}
      />
      {props.task && (
        <button
          className="button delete_button"
          type="button"
          onClick={handleOnDelete}
        >
          このタスクを削除する
        </button>
      )}
    </form>
  );
};