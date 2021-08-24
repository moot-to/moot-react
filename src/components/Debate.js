import React, { useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';
import Node from './Node';
import { useParams } from 'react-router-dom';

const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

const Debate = (props) => {
	const {id} = useParams();

	const position = { x: 250, y: 0 }
	const initialElements = [
		{
			id: '1',
			type: 'tweet',
			data: { id },
			position,
			targetPosition: "top"
		},
		{
			id: '2',
			type: 'tweet',
			data: { id: "1414594335144914947" },
			position,
			sourcePosition: "bottom"
		},
		{
			id: '3',
			type: 'tweet',
			data: { id: "1367721339738611714" },
			position,
			sourcePosition: "bottom"
		},
		{
			id: 'e1-2', source: '2', target: '1',
			type: 'smoothstep',
			label: "AMA",
			labelBgPadding: [8, 4],
			labelBgBorderRadius: 4,
			labelStyle: { fill: "#fff", fontSize: "15px" },
			labelBgStyle: { fill: "#ff1133", fillOpacity: 0.9},
			style: { stroke: '#111', strokeWidth: 3 }
		},
		{
			id: 'e1-3', source: '3', target: '1',
			type: 'smoothstep',
			label: "AMA",
			labelBgPadding: [8, 4],
			labelBgBorderRadius: 4,
			labelStyle: { fill: "#fff", fontSize: "15px" },
			labelBgStyle: { fill: "#ff1133", fillOpacity: 0.9},
			style: { stroke: '#111', strokeWidth: 3 }
		}
	];

  const [elements, setElements] = useState(initialElements);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

	const nodeTypes = {
		tweet: Node,
	};

	return <ReactFlow
		elements={elements}
		onConnect={onConnect}
		onLoad={onLoad}
		nodeTypes={nodeTypes} >
		<MiniMap />
		<Controls />
		<Background />
	</ReactFlow>
}

export default Debate;
