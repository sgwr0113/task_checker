import React from "react";
import Modal from "react-modal";
import { TaskBody } from "./taskBody";
import { GenreBody } from "./genreBody";
import { TaskType } from "../../interfaces/Task";

interface Props {
  handleClose: () => void;
  open: boolean;
  body: string;
  task?: TaskType;
}

// モーダルのスタイルを指定するための変数
const customStyles = {
  overlay: {
    backgroundColor: "rgb(80, 80, 80)",
  },
  content: {
    top: "10%",
    left: "60%",
    right: "50%",
    height: "75vh",
    width: "20vw",
    marginLeft: "-30vw",
    padding: "2vw 10vw",
  },
};

// モーダルで表示する内容を返却する関数
const renderBody = (body: string, handleClose: () => void, task?: TaskType) => {
  switch (body) {
    case "taskBody":
      return <TaskBody handleClose={handleClose} task={task} />;
    case "genreBody":
      return <GenreBody />;
    default:
      return <div />;
  }
};

export const FormModal = (props: Props) => {
  // モーダルを設定するHTMLの要素を指定する
  Modal.setAppElement("#root");
  return (
    <Modal
      // モーダルの開閉を管理するprops
      isOpen={props.open}
      onRequestClose={props.handleClose}
      // 先ほど定義した、モーダルのスタイルをpropsとして渡す
      style={customStyles}
    >
      {/* モーダルとして表示される要素を指定
      今回はケースによって内容を分ける必要があるため関数として定義 */}
      {renderBody(props.body, props.handleClose, props.task)}
    </Modal>
  );
};