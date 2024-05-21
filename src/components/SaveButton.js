import React, { useEffect, useState } from "react";
import "./SaveButton.css";

const SaveButton = ({ nodes, edges }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, [3000]);
    }
  }, [error]);
  // validation for not more than 1 target handle should be empty
  const handleSave = () => {
    if (nodes.length - edges.length > 1) {
      setError("Error: More than one node has empty target handles.");
    } else {
      setError("Flow Saved");
    }
  };

  return (
    <div className="btn-container">
      {error && <span>{error}</span>}
      <button onClick={handleSave} className="save-button">
        Save Changes
      </button>
    </div>
  );
};

export default SaveButton;
