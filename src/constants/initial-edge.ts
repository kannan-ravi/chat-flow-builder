import type { Edge, EdgeTypes } from "@xyflow/react";

export const initialEdges = [
  { id: "a->b", source: "a", target: "b", animated: true },
] satisfies Edge[];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
