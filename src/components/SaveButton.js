import React from "react";
import "./SaveButton.css";

const SaveButton = ({ nodes, edges }) => {
  const handleSave = () => {
    console.log("🚀 ~ SaveButton ~ nodes:", edges);
    const nodesWithNoTargets = nodes.filter(
      (el) => el.sourcePosition && !el.targetPosition
    );
    if (nodesWithNoTargets.length > 1) {
      alert("Error: More than one node has empty target handles.");
    } else {
      alert("Flow Saved");
    }
  };

  return (
    <div className="btn-container">
      <button onClick={handleSave} className="save-button">
        Save Changes
      </button>
    </div>
  );
};

export default SaveButton;
