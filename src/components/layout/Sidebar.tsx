import { useDraggable } from "@dnd-kit/core";
import { MdOutlineMessage } from "react-icons/md";

const Sidebar = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div className="min-w-64 border-l-2 border-gray-100 shadow px-4 py-8">
      <div
        className="flex flex-col gap-2 justify-center items-center border border-gray-100 shadow px-4 py-2 y-2 w-fit min-w-40 cursor-grab bg-white"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        <MdOutlineMessage className="text-2xl" />
        <h3 className="text-lg font-medium">Message</h3>
      </div>
    </div>
  );
};

export default Sidebar;
