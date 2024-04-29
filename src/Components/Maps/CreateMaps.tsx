import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";
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
import Swal from "sweetalert2";
import "./CreateMaps.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Context from "../../Context";
import { useNavigate } from "react-router-dom";

interface InitialNode {
  id: string;
  type: string;
  data: { label: string };
  position: XYPosition;
}

const initialNode: InitialNode[] = [
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
  let navigate = useNavigate();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const location = useLocation();
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Untitled");
  const { userData, WEB_IP } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [editMap, setEditMap] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);
  const [mapID, setMapId] = useState<string>();

  const [initialNodes, setInitialNodes] = useState<InitialNode[]>([]);
  const [initialEdges, setInitialEdges] = useState<Edge[]>([]);
  const [initialTitle, setInitialTitle] = useState("");

  const handleHeaderDoubleClick = () => {
    if (editMap || location.pathname.split("/").includes("newMap")) {
      setIsEditingHeader(true);
    }
  };

  const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderTitle(event.target.value);
  };

  const handleHeaderBlur = () => {
    setIsEditingHeader(false);
  };
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
    async (event: React.MouseEvent, node: Node) => {
      const { value: newLabel } = await Swal.fire({
        title: "Enter new label",
        input: "text",
        inputLabel: "New label",
        inputValue: node.data.label,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });

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

  const saveMap = () => {
    const url = isEditing
      ? `http://${WEB_IP}:8000/api/editMap/${mapID}`
      : `http://${WEB_IP}:8000/api/createMap`;
    return axios
      .post(
        url,
        { name: headerTitle, nodes: nodes, edges: edges },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(response.statusText);
        }
        console.log(response.data);
        return response.data;
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/maps"));
      });
  };

  const handleEditClick = () => {
    setEditMap(true);
    setIsDraggable(true);
  };

  const cancel = () => {
    // Revert to the initial state
    setNodes(initialNodes);
    setEdges(initialEdges);
    setHeaderTitle(initialTitle);

    // Additional UI state resets as needed
    setIsEditingHeader(false);
    setEditMap(false); // Assuming this exits edit mode
    setIsDraggable(false); // Assuming this makes nodes and edges non-draggable
  };

  useEffect(() => {
    // Determine if we're creating a new map or editing an existing one based on the URL
    const pathSegments = location.pathname.split("/");
    const mapId = pathSegments[pathSegments.length - 1]; // Assuming URL structure is /maps/edit/:mapId
    const isEditMode = location.pathname.includes("editMap") && mapId;
    setMapId(mapId);

    if (isEditMode) {
      setIsEditing(true);
      setIsDraggable(false);
      // Replace this URL with your actual API endpoint
      const url = `http://${WEB_IP}:8000/api/getMap/${mapId}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((response) => {
          // Assuming response data structure is { nodes: [...], edges: [...] }
          const {
            nodes: fetchedNodes,
            edges: fetchedEdges,
            name: name,
          } = response.data;
          setNodes(fetchedNodes);
          setInitialNodes(fetchedNodes); // Store initial nodes
          setEdges(fetchedEdges);
          setInitialEdges(fetchedEdges); // Store initial edges
          setHeaderTitle(name);
          setInitialTitle(name); // Store initial title
        })
        .catch((error) => console.error("Failed to fetch map data:", error));
    } else {
      // If not editing, set nodes to initial state or whatever your "new" state should be
      setNodes(initialNodes);
      setEdges([]); // Assuming no edges for a new map
    }
  }, [location.pathname]);

  return (
    <div className="main_content dashboard_part">
      <Navbar />
      <div className="card mt-4 mx-4" id="Map">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            {isEditingHeader ? (
              <input
                type="text"
                value={headerTitle}
                onChange={handleHeaderChange}
                onBlur={handleHeaderBlur}
                autoFocus // Automatically focus the input when it appears
                className="form-control" // You might want to adjust the styling
              />
            ) : (
              <h5 onDoubleClick={handleHeaderDoubleClick}>{headerTitle}</h5>
            )}
          </div>
          <div>
            {isEditing && editMap ? (
              <>
                <button className="btn btn-success me-3" onClick={saveMap}>
                  Save Changes
                </button>
                <button className="btn btn-danger" onClick={cancel}>
                  Cancel
                </button>
              </>
            ) : isEditing ? (
              <button className="btn btn-success" onClick={handleEditClick}>
                Edit Map
              </button>
            ) : (
              <button className="btn btn-success" onClick={saveMap}>
                Save
              </button>
            )}
          </div>
        </div>
        <div className="card-body">
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
                  nodesDraggable={isDraggable}
                  nodesConnectable={isDraggable}
                  elementsSelectable={isDraggable}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onNodeDoubleClick={onNodeClick}
                  fitView
                >
                  <Controls />
                  <Background />
                </ReactFlow>
              </div>
              <Nodes />
            </ReactFlowProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flow;
