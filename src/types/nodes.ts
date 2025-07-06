import type { BuiltInNode, Node } from "@xyflow/react";

export type TextMessageNode = Node<
  { label?: string; },
  "text"
>;

export type AppNode = BuiltInNode | TextMessageNode;