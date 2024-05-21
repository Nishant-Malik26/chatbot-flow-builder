import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";
import "reactflow/dist/style.css";

import MessageNode from "./MessageNode.js";

import "../common.css";
import NodesPanel from "./NodesPanel.js";
import SaveButton from "./SaveButton.js";
import SettingsPanel from "./SettingsPanel.js";
const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [];
const nodeTypes = { textUpdater: MessageNode };

function Flow() {
  const [selectedNode, setSelectedNode] = useState(null);
  console.log("🚀 ~ Flow ~ selectedNode:", selectedNode);

  const [nodeId, setNodeId] = useState(0);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  console.log("🚀 ~ Flow ~ edges:", edges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = (event) => {
    // console.log("🚀 ~ onDragOver ~ event:", event);
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeClick = (event, element) => {
    console.log("🚀 ~ onNodeClick ~ element:", element);
    // console.log("🚀 ~ onNodeClick ~ element:", element);
    if (element.type === "textUpdater") {
      setSelectedNode(element);
    }
  };

  const onNodeChange = (node) => {
    setNodes((els) => els.map((el) => (el.id === node.id ? node : el)));
  };

  const onDrop = (event) => {
    console.log("🚀 ~ onDrop ~ event:", event);
    event.preventDefault();
    // console.log("🚀 ~ onDrop ~ event.dataTransfer:", event.dataTransfer);
    // const position = screenToFlowPosition({
    //   x: event.clientX,
    //   y: event.clientY,
    // });
    // console.log("🚀 ~ onDrop ~ nodes:", nodes);

    const newNode = {
      id: `node_${nodeId}`,
      type: "textUpdater",
      position: { x: event.clientX, y: event.clientY },
      data: { label: "Hello There!!" },
    };

    setNodes((es) => es.concat(newNode));
    // setNodes((nds) => {
    //   console.log(nds);
    //   applyNodeChanges([newNode]);
    // });

    setNodeId(nodeId + 1);
  };

  const handleBackButtonClick = () => {
    setSelectedNode(null);
  };

  const outgoers = getConnectedEdges(nodes, edges);
  console.log("🚀 ~ Flow ~ outgoers:", edges, nodes);

  const isValidConnection = (connection) => {
    const { source, target } = connection;

    if (source === target) {
      return false;
    }

    const sourceNodeEdges = edges.filter(
      (el) =>
        el.source === source && el.sourceHandle === connection.sourceHandle
    );

    if (sourceNodeEdges.length > 0) {
      return false;
    }

    return true;
  };

  return (
    <>
      <div>
        <SaveButton nodes={nodes} edges={edges} outgoers={outgoers} />
      </div>
      <div className="container">
        <div className="left-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            isValidConnection={isValidConnection}
            style={rfStyle}
          />
        </div>
        <div className="right-container">
          {!selectedNode && <NodesPanel />}
          {selectedNode && (
            <div className="settings-panel">
              <SettingsPanel
                node={selectedNode}
                onChange={onNodeChange}
                handleBackButtonClick={handleBackButtonClick}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Flow;
