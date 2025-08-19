import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'ceo-1',
    type: 'person',
    position: { x: 400, y: 50 },
    data: {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      department: 'Executive',
      level: 'ceo',
    },
  },
  {
    id: 'cto-1',
    type: 'person',
    position: { x: 150, y: 200 },
    data: {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      department: 'Engineering',
      level: 'manager',
    },
  },
  {
    id: 'cmo-1',
    type: 'person',
    position: { x: 400, y: 200 },
    data: {
      name: 'Emily Rodriguez',
      role: 'Chief Marketing Officer',
      department: 'Marketing',
      level: 'manager',
    },
  },
  {
    id: 'cfo-1',
    type: 'person',
    position: { x: 650, y: 200 },
    data: {
      name: 'David Kim',
      role: 'Chief Financial Officer',
      department: 'Finance',
      level: 'manager',
    },
  },
  {
    id: 'dev-1',
    type: 'person',
    position: { x: 50, y: 350 },
    data: {
      name: 'Alex Thompson',
      role: 'Senior Developer',
      department: 'Engineering',
      level: 'employee',
    },
  },
  {
    id: 'dev-2',
    type: 'person',
    position: { x: 250, y: 350 },
    data: {
      name: 'Jessica Wu',
      role: 'Frontend Developer',
      department: 'Engineering',
      level: 'employee',
    },
  },
  {
    id: 'marketing-1',
    type: 'person',
    position: { x: 350, y: 350 },
    data: {
      name: 'Ryan O\'Connor',
      role: 'Marketing Specialist',
      department: 'Marketing',
      level: 'employee',
    },
  },
  {
    id: 'marketing-2',
    type: 'person',
    position: { x: 450, y: 350 },
    data: {
      name: 'Lisa Park',
      role: 'Content Manager',
      department: 'Marketing',
      level: 'employee',
    },
  },
  {
    id: 'finance-1',
    type: 'person',
    position: { x: 600, y: 350 },
    data: {
      name: 'James Wilson',
      role: 'Financial Analyst',
      department: 'Finance',
      level: 'employee',
    },
  },
  {
    id: 'finance-2',
    type: 'person',
    position: { x: 700, y: 350 },
    data: {
      name: 'Sophie Davis',
      role: 'Accountant',
      department: 'Finance',
      level: 'employee',
    },
  },
];

export const initialEdges: Edge[] = [
  // CEO to department heads
  {
    id: 'e1',
    source: 'ceo-1',
    target: 'cto-1',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
  },
  {
    id: 'e2',
    source: 'ceo-1',
    target: 'cmo-1',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
  },
  {
    id: 'e3',
    source: 'ceo-1',
    target: 'cfo-1',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
  },
  // Department heads to employees
  {
    id: 'e4',
    source: 'cto-1',
    target: 'dev-1',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--accent))', strokeWidth: 1.5 },
  },
  {
    id: 'e5',
    source: 'cto-1',
    target: 'dev-2',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--accent))', strokeWidth: 1.5 },
  },
  {
    id: 'e6',
    source: 'cmo-1',
    target: 'marketing-1',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--accent))', strokeWidth: 1.5 },
  },
  {
    id: 'e7',
    source: 'cmo-1',
    target: 'marketing-2',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--accent))', strokeWidth: 1.5 },
  },
  {
    id: 'e8',
    source: 'cfo-1',
    target: 'finance-1',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--accent))', strokeWidth: 1.5 },
  },
  {
    id: 'e9',
    source: 'cfo-1',
    target: 'finance-2',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--accent))', strokeWidth: 1.5 },
  },
];