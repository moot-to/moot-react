import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background, isNode } from 'react-flow-renderer';

import Node from './Node';
import API from '../utils/api';
import { useParams } from 'react-router-dom';
import dagre from 'dagre';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const edgeStyles = {
	'0': { type: 'step', style: { stroke: '#777', strokeWidth: 3 } },
	'1': { type: 'step', style: { stroke: '#777', strokeWidth: 3 } },
	'2': { type: 'step', style: { stroke: '#777', strokeWidth: 3 } },
}

const onLoad = (reactFlowInstance) => {
	reactFlowInstance.fitView();
};

const waitForElement = el => new Promise(resolve => {
	let waitingElement = setInterval(() => {
		if(document.querySelector(`div[data-id="${el.id}"] .tweet`)){
			resolve(el);
			clearInterval(waitingElement)
		}
	}, 100)
})

const Debate = (props) => {
	const {id} = useParams();
  const [tree, setTree] = useState([]);

	const fetchTrees = () => {
		API.getTree(id).then(trees => {
			const _tree = trees.map(tree => ({ id: tree.statusId, type: "tweet", data: { id: tree.statusId, type: tree.type, refetch: fetchTrees }, position: { x: 0, y: 0 } }));
			const _links = trees.filter(t => t.repliedTo)
				.map(t => ({ id: `e${t.repliedTo}-${t.statusId}`, target: t.statusId, source: t.repliedTo, ...edgeStyles[t.type] }))

			const branches = [..._tree, ..._links]

			Promise.all(branches.filter(isNode).map(branch => waitForElement(branch)))
				.then(res => { setTree(getLayoutedElements(branches)) })

			setTree(branches)
		})
	}
	useEffect(fetchTrees, [id])

	const position = { x: 0, y: 0 }
  const onElementsRemove = (elementsToRemove) => setTree((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setTree((els) => addEdge(params, els));

	const nodeTypes = {
		tweet: Node
	};

	return <ReactFlow
			nodesDraggable={false}
			elements={tree}
			onConnect={onConnect}
			onLoad={onLoad}
			nodeTypes={nodeTypes}>
			<MiniMap />
			<Controls />
			<Background />
		</ReactFlow>
}

const getLayoutedElements = (elements, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
			var status = document.querySelector(`div[data-id="${el.id}"]`);
      dagreGraph.setNode(el.id, { width: status.clientWidth + 50, height: status.clientHeight + 50 });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? 'left' : 'top';
      el.sourcePosition = isHorizontal ? 'right' : 'bottom';
			var status = document.querySelector(`div[data-id="${el.id}"]`);
      el.position = {
        x: nodeWithPosition.x - status.clientWidth / 2,
        y: nodeWithPosition.y - status.clientHeight / 2,
      };
    }

    return el;
  });
};
export default Debate;
