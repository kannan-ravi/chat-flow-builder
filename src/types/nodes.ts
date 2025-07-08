import type { BuiltInNode, Node, NodeTypes } from "@xyflow/react";
import TextNode from "../components/flow/nodes/TextNode";

export type TextMessageNode = Node<
  { label?: string; },
  "text"
>;

export type AppNode = BuiltInNode | TextMessageNode;

export const nodeTypes = {
  text: TextNode,
} satisfies NodeTypes;