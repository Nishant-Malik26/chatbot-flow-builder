import React, { useEffect, useState } from "react";
import "./SettingsPanel.css";
import { IoMdArrowRoundBack } from "react-icons/io";

const SettingsPanel = ({ node, onChange, handleBackButtonClick }) => {
  const [updatedNode, setUpdatedNode] = useState(node.data.label);
  //updating text of selected node
  useEffect(() => {
    setUpdatedNode(node.data.label);
  }, [node]);
  const onLabelChange = (event) => {
    const newNode = {
      ...node,
      data: { ...node.data, label: event.target.value },
    };
    setUpdatedNode(newNode.data.label);
    onChange(newNode);
  };

  return (
    <div className="settings-panel">
      <span className="back-button" onClick={handleBackButtonClick}>
        <IoMdArrowRoundBack size={30} />
      </span>
      <div>Settings Panel</div>
      <span>Text : </span>
      <textarea type="text" value={updatedNode} onChange={onLabelChange} />
    </div>
  );
};

export default SettingsPanel;
