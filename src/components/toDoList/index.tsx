import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { FormModal } from "../../components/modal";
import { Task } from "../task";
import { TaskType } from "../../interfaces/Task";
import { GenreType } from "../../interfaces/Genre";
import "./style.css";

interface Props {
  tasks: TaskType[];
  title: string;
  genres: GenreType[];
}

export const ToDoList = (props: Props) => {
  const [modalState, setModalState] = useState<boolean>(true);  // タスクを非表示にするかどうか（初期値は表示）
  const [open, setOpen] = useState(false);
  const [selectTask, setSelectTask] = useState<TaskType | undefined>();

  const handleOnClick = () => {
    modalState ? setModalState(false) : setModalState(true);  // modalStateがtrueだったらfalseに、falseだったらtrueにする
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const getMatchTask = (id: number) => {
    setSelectTask(
      props.tasks.filter((obj: TaskType) => {
        return id === obj.id;
      })[0]
    );
    handleOpen();
  };

  return (
    <div className="task_list">
      <FormModal
        body="taskBody"
        handleClose={handleClose}
        open={open}
        task={selectTask}
      />
      <div className="section">
        <MenuIcon className="section_ele" onClick={handleOnClick} />
        <span className="section_ele">{props.title}</span>
        {props.title === "ToDo" && (
          <AddCircleOutlineIcon
            className="add_circle_outline_icon"
            fontSize="small"
            onClick={handleOpen}
          />
        )}
      </div>
      <div className="task_field">
        {modalState && (
          <div className="task_field">
            {props.tasks.map((task: TaskType) => (
              <Task task={task} key={task.id} getMatchTask={getMatchTask} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};