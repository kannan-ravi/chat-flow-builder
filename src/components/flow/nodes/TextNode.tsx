import {
  Handle,
  Position,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import type { TextMessageNode } from "../../../types/nodes";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdDelete, MdOutlineMessage } from "react-icons/md";

function TextNode({ data }: NodeProps<TextMessageNode>) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className="flex items-center gap-2 bg-cyan-100 px-4 py-2 justify-between">
        <div className="flex items-center gap-2">
          <MdOutlineMessage className="text-md" />
          <h3 className="text-md font-medium">Send Message</h3>
        </div>
        <div className="flex items-center gap-2">
          <IoLogoWhatsapp className="text-lg text-green-500 cursor-pointer" />
          <MdDelete className="text-lg text-red-500 cursor-pointer" />
        </div>
      </div>
      <p className="text-smxs px-4 py-2 bg-white">{data.label}</p>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

export default TextNode;

export const nodeTypes = {
  text: TextNode,
} satisfies NodeTypes;
