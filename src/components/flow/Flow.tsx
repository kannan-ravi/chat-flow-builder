import {
  Controls,
  ReactFlow,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type ReactFlowInstance,
  type IsValidConnection,
  MarkerType,
  type NodeMouseHandler,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes } from "./nodes/TextNode";
import { edgeTypes } from "../../constants/initial-edge";

import { useDroppable } from "@dnd-kit/core";
import type { AppNode } from "../../types/nodes";
import type { AppEdge } from "../../types/edge";

type FlowPropsTypes = {
  nodes: AppNode[];
  onNodesChange: OnNodesChange<AppNode>;
  edges: AppEdge[];
  onEdgesChange: OnEdgesChange<AppEdge>;
  onConnect: OnConnect;
  isValid: IsValidConnection<AppEdge>;
  reactFlowWrapperRef: React.RefObject<HTMLDivElement | null>;
  onInit: (instance: ReactFlowInstance<AppNode, AppEdge>) => void;
  onNodeClick: NodeMouseHandler<AppNode>;
};

export default function Flow({
  nodes,
  onNodesChange,
  edges,
  onEdgesChange,
  onConnect,
  isValid,
  reactFlowWrapperRef,
  onInit,
  onNodeClick,
}: FlowPropsTypes) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const defaultEdgeOptions = {
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#3d3d3d",
    },
  };

  return (
    <div
      ref={(el) => {
        if (el) {
          setNodeRef(el);
          reactFlowWrapperRef.current = el;
        }
      }}
      className={`h-full w-full transition-all duration-300 ${
        isOver ? "bg-gray-100" : ""
      }`}
    >
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValid}
        onInit={onInit}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodeClick={onNodeClick}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
