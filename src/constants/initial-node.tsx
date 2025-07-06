
import type { AppNode } from "../types/nodes";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "text",
    position: { x: 100, y: 100 },
    data: { label: "Hello" },
  },
  {
    id: "b",
    type: "text",
    position: { x: 400, y: 100 },
    data: { label: "This is test" },
  },
]