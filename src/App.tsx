import { useCallback, useRef } from "react";
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
  MarkerType,
} from "@xyflow/react";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Flow from "./components/flow/Flow";
import { initialNodes } from "./constants/initial-node";
import { initialEdges } from "./constants/initial-edge";
import type { AppNode } from "./types/nodes";
import type { AppEdge } from "./types/edge";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>(initialEdges);

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
          data: { label: `Node ${nodes.length + 1}` },
        },
      ]);
    }
  }

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
            />
            <Sidebar />
          </DndContext>
        </ReactFlowProvider>
      </main>
    </>
  );
}

export default App;
