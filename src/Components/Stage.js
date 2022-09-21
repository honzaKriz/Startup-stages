import React from "react";
import Task from "./Task";
import { CheckOutlined } from "@ant-design/icons";

export default function Stage({ stage, updateData }) {
  const mapClickToTask = (taskId) => {
    if (stage.isActive && !stage.isDone) {
      updateData(stage.id, taskId);
    }
  };

  const styles = {
    color: stage.isActive ? "black" : "grey",
  };

  return (
    <>
      <div className="stageTitle">
        <div className="stageNumber">{stage.id}</div>
        <div className="stageText">{stage.text}</div>
        <div className="checkMark">{stage.isDone ? <CheckOutlined /> : ""}</div>
      </div>
      <div className="stage" style={styles}>
        {stage.tasks.map((item) => (
          <Task
            id={item.id}
            text={item.text}
            isDone={item.isDone}
            onClick={() => mapClickToTask(item.id)}
          />
        ))}
      </div>
    </>
  );
}
