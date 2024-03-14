import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  Connection,
  Node,
  XYPosition,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import Nodes from "./nodes";

import "./CreateMaps.css";

interface InitialNode {
  id: string;
  type: string;
  data: { label: string };
  position: XYPosition;
}

const initialNodes: InitialNode[] = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = (): string => `node_${id++}`;

const Flow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Use useCallback for onConnect to ensure the function is not recreated on every render
  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => {
      const newEdges = addEdge(params, eds);
      console.log("Updated Edges:", newEdges); // Log updated edges
      return newEdges;
    });
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (
        typeof type === "undefined" ||
        !type ||
        !reactFlowInstance ||
        !reactFlowBounds
      ) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }) as XYPosition;
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => {
        const updatedNodes = nds.concat(newNode);
        console.log("Updated Nodes:", updatedNodes); // Log updated nodes
        return updatedNodes;
      });
    },
    [reactFlowInstance, setNodes]
  );

  useEffect(() => {
    const handleDeleteKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        // Start by filtering out selected nodes
        const nodesToDelete = nodes.filter((node) => node.selected);
        const edgesToDelete = edges.filter((edge) => edge.selected);

        if (nodesToDelete.length > 0) {
          // If there are nodes to delete, remove them and any edges connected to them
          const nodeIdsToDelete = nodesToDelete.map((node) => node.id);
          setNodes((prevNodes) =>
            prevNodes.filter((node) => !nodeIdsToDelete.includes(node.id))
          );
          // Remove edges that are connected to the deleted nodes, plus any selected edges
          setEdges((prevEdges) =>
            prevEdges.filter(
              (edge) =>
                !nodeIdsToDelete.includes(edge.source) &&
                !nodeIdsToDelete.includes(edge.target) &&
                !edgesToDelete.map((e) => e.id).includes(edge.id)
            )
          );
        } else if (edgesToDelete.length > 0) {
          // If no nodes are selected but some edges are, delete those selected edges
          const edgeIdsToDelete = edgesToDelete.map((edge) => edge.id);
          setEdges((prevEdges) =>
            prevEdges.filter((edge) => !edgeIdsToDelete.includes(edge.id))
          );
        }
      }
    };

    // Add and remove the event listener
    document.addEventListener("keydown", handleDeleteKeyPress);
    return () => document.removeEventListener("keydown", handleDeleteKeyPress);
  }, [nodes, edges, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const newLabel = window.prompt("Enter new label:", node.data.label);
      if (newLabel) {
        setNodes((nds) => {
          const updatedNodes = nds.map((n) =>
            n.id === node.id
              ? { ...n, data: { ...n.data, label: newLabel } }
              : n
          );
          console.log("Nodes after label update:", updatedNodes); // Log nodes after label update
          return updatedNodes;
        });
      }
    },
    [setNodes]
  );

  const flowWrapperStyle = {
    width: "100%",
    height: "90vh", // Adjust height as necessary
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          style={flowWrapperStyle}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <Nodes />
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
