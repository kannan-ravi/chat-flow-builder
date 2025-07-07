import { useDraggable } from "@dnd-kit/core";
import { MdOutlineMessage } from "react-icons/md";
import type { AppNode } from "../../types/nodes";
import { FaArrowLeft } from "react-icons/fa";

type SidebarPropsTypes = {
  selectedNodeText: string;
  selectedNode: AppNode | null;
  setSelectedNodeText: React.Dispatch<React.SetStateAction<string>>;
  onNodeLabelChange: () => void;
  onSidebarBack: () => void;
};

const Sidebar = ({
  selectedNodeText,
  selectedNode,
  setSelectedNodeText,
  onNodeLabelChange,
  onSidebarBack,
}: SidebarPropsTypes) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
    disabled: selectedNode !== null,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div className="min-w-64 border-l-2 border-gray-100 shadow">
      {selectedNode ? (
        <div>
          <div className="flex items-center gap-4 py-2 border-t border-b border-gray-200 px-4">
            <FaArrowLeft onClick={onSidebarBack} className="cursor-pointer" />
            <p>Message</p>
          </div>

          <div className="px-4 py-2">
            <p className="text-sm text-gray-600 mb-4">Text:</p>
            <input
              type="text"
              value={selectedNodeText}
              onChange={(e) => setSelectedNodeText(e.target.value)}
              className="px-4 py-2 border-gray-200 outline-0 border-2 shadow w-full"
            />
          </div>

          <div className="text-center my-4">
            <button
              type="button"
              onClick={onNodeLabelChange}
              className="border border-blue-600 text-blue-600 cursor-pointer transition duration-300 outline-0 px-5 py-1.5 text-base"
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <div className="px-2 py-8 grid grid-cols-2">
          <div
            className="flex flex-col justify-center items-center border border-gray-200 shadow w-full py-2.5 cursor-grab bg-white"
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
          >
            <MdOutlineMessage className="text-xl" />
            <h3 className="text-base font-medium">Message</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
