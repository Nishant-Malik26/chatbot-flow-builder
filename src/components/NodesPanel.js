import React from "react";
import "./NodePanel.css";
import { BiMessageRoundedDots } from "react-icons/bi";

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

const NodesPanel = () => (
  <div>
    <div className="description">
      Drag and drop these nodes to the pane on the left.
    </div>
    <div
      className="messageNode"
      onDragStart={(event) => onDragStart(event, "default")}
      draggable
    >
      <div>
        <BiMessageRoundedDots color="blue" size={50} />
      </div>
      Message
    </div>
  </div>
);

export default NodesPanel;
