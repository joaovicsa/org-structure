import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { PersonNode } from './nodes/PersonNode';
import { OrgSidebar } from './OrgSidebar';
import { initialNodes, initialEdges } from '../data/orgData';

const nodeTypes = {
  person: PersonNode,
};

export const OrgChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addPerson = (data: { name: string; role: string; department: string; level: 'ceo' | 'manager' | 'employee' }) => {
    const newNode: Node = {
      id: `person-${Date.now()}`,
      type: 'person',
      position: { x: Math.random() * 500 + 100, y: Math.random() * 300 + 100 },
      data,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const updatePerson = (nodeId: string, data: { name: string; role: string; department: string; level: 'ceo' | 'manager' | 'employee' }) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data } : node
      )
    );
    setSelectedNode(null);
  };

  const deletePerson = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <OrgSidebar
        selectedNode={selectedNode}
        onAddPerson={addPerson}
        onUpdatePerson={updatePerson}
        onDeletePerson={deletePerson}
        onCancel={() => setSelectedNode(null)}
      />
      
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          style={{ background: 'hsl(var(--background))' }}
          className="rounded-lg"
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1}
            color="hsl(var(--border))"
          />
          <Controls className="bg-card border border-border shadow-card" />
          <MiniMap 
            className="bg-card border border-border shadow-card rounded-lg"
            nodeColor={(node) => {
              switch (node.data.level) {
                case 'ceo': return 'hsl(var(--primary))';
                case 'manager': return 'hsl(var(--accent))';
                default: return 'hsl(var(--muted))';
              }
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
};