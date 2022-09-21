import React from "react";
import { Checkbox } from "antd";

export default function Task({ text, isDone, onClick }) {
  return (
    <>
      <div className="task" onClick={onClick}>
        <Checkbox checked={isDone}>{text}</Checkbox>
      </div>
    </>
  );
}
