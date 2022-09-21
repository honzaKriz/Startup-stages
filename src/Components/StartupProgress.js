import React from "react";
import Stage from "./Stage";

export default function Progress({ data, updateData }) {
  return (
    <div>
      {data.map((stage, index) => (
        <Stage key={index} stage={stage} updateData={updateData} />
      ))}
    </div>
  );
}
