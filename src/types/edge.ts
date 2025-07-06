import type { BuiltInEdge, Edge } from "@xyflow/react";

export type CustomEdgeData = {
  id: string;
  source: string;
  target: string;
  animated: boolean;
};
export type CustomEdge = Edge<CustomEdgeData, "custom-edge">;

export type AppEdge = BuiltInEdge | CustomEdge;
