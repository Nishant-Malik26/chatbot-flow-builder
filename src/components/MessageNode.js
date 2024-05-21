import { Handle, Position } from "reactflow";
import { BiMessageRoundedDots } from "react-icons/bi";
import "../common.css";

function MessageNode(props) {
  const { data, isConnectable } = props;
  // console.log("🚀 ~ MessageNode ~ data:", data);
  // console.log("🚀 ~ MessageNode ~ isConnectable:", isConnectable);

  return (
    <>
      <div className="text-updater-node">
        <Handle
          type="target"
          id="a"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <div className="node-header">
          <BiMessageRoundedDots /> <span>Send Message</span>
        </div>
        <div>{data?.label}</div>
        <Handle
          type="source"
          id="b"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default MessageNode;
