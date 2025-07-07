import { useCallback, useRef, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  type OnConnect,
  ReactFlowProvider,
  type ReactFlowInstance,
  type Connection,
  type IsValidConnection,
  type NodeMouseHandler,
} from "@xyflow/react";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Flow from "./components/flow/Flow";
import { initialNodes } from "./constants/initial-node";
import { initialEdges } from "./constants/initial-edge";
import type { AppNode, TextMessageNode } from "./types/nodes";
import type { AppEdge } from "./types/edge";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<AppNode | null>(null);
  const [selectedNodeText, setSelectedNodeText] = useState<string>("");

  const reactFlowWrapperRef = useRef<HTMLDivElement | null>(null);
  const reactFlowInstance = useRef<ReactFlowInstance<AppNode, AppEdge> | null>(
    null
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds as AppEdge[])),
    [setEdges]
  );

  const isValid: IsValidConnection<AppEdge> = useCallback(
    (connection: Connection | AppEdge) => {
      const existingConnectionsFromSourceNode = edges.filter(
        (edge) => edge.source === connection.source
      );

      return existingConnectionsFromSourceNode.length === 0;
    },
    [edges]
  );

  function handleDragEnd(event: DragEndEvent) {
    if (
      event.over &&
      event.over.id === "droppable" &&
      reactFlowWrapperRef.current &&
      reactFlowInstance.current
    ) {
      const reactFlowBounds =
        reactFlowWrapperRef.current.getBoundingClientRect();

      let initialClientX = 0;
      let initialClientY = 0;

      if (event.activatorEvent instanceof MouseEvent) {
        initialClientX = event.activatorEvent.clientX;
        initialClientY = event.activatorEvent.clientY;
      } else if (event.activatorEvent instanceof TouchEvent) {
        initialClientX = event.activatorEvent.touches[0]?.clientX || 0;
        initialClientY = event.activatorEvent.touches[0]?.clientY || 0;
      }

      const finalClientX = initialClientX + event.delta.x;
      const finalClientY = initialClientY + event.delta.y;

      const position = reactFlowInstance.current.screenToFlowPosition({
        x: finalClientX - reactFlowBounds.left,
        y: finalClientY - reactFlowBounds.top,
      });

      const nodeId = `node-${Date.now()}`;

      setNodes((nds) => [
        ...nds,
        {
          id: nodeId,
          type: "text",
          position,
          selected: false,
          data: { label: `Node ${nodes.length + 1}` },
        },
      ]);
    }
  }

  const onNodeClick: NodeMouseHandler<AppNode> = useCallback(
    (event, node) => {
      setNodes((nds) => nds.map((n) => ({ ...n, selected: n.id === node.id })));
      setSelectedNodeText(node.data.label || "");
      setSelectedNode(node);
    },
    [setNodes]
  );

  const onNodeLabelChange = useCallback(() => {
    if (selectedNode?.type === "text") {
      setNodes((prev) =>
        prev.map((n) =>
          selectedNode.id === n.id
            ? { ...n, data: { ...n.data, label: selectedNodeText } }
            : n
        )
      );

      setSelectedNode(null);
      setSelectedNodeText("");
    }
  }, [selectedNode, selectedNodeText, setNodes]);

  const onSidebarBack = useCallback(() => {
    setSelectedNode(null);
    setSelectedNodeText("");
    setNodes((prev) => prev.map((n) => ({ ...n, selected: false })));
  }, [setNodes]);

  return (
    <>
      <Header />
      <main className="h-[calc(100vh-56px)] flex">
        <ReactFlowProvider>
          <DndContext onDragEnd={handleDragEnd}>
            <Flow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              reactFlowWrapperRef={reactFlowWrapperRef}
              onInit={(instance) => (reactFlowInstance.current = instance)}
              isValid={isValid}
              onNodeClick={onNodeClick}
            />
            <Sidebar
              selectedNode={selectedNode}
              selectedNodeText={selectedNodeText}
              setSelectedNodeText={setSelectedNodeText}
              onNodeLabelChange={onNodeLabelChange}
              onSidebarBack={onSidebarBack}
            />
          </DndContext>
        </ReactFlowProvider>
      </main>
    </>
  );
}

export default App;
