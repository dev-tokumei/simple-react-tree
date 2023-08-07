import React, { useState } from "react";
import AddNewBrach from "./components/addNewBrach";
import Tree from "react-d3-tree";

const App = () => {
  const [parentName, setParentName] = useState(null);

  const [tree, setTree] = useState([
    {
      name: " ",
      parent_id: 0,
      children: [
        { name: "AO", parent_id: 1, children: [], id: 1 },
        { name: "Город", parent_id: 2, children: [], id: 2 },
        { name: "Область", parent_id: 3, children: [], id: 3 },
        { name: "РРП", parent_id: 4, children: [], id: 4 },
      ],
      id: 1,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleNodeClick = (datum) => {
    setParentName(datum.data.name);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNewbranch = (tree, datumtId, newBranch) => {
    return tree.map((node) => {
      if (node.id === datumtId) {
        return {
          ...node,
          children: [...node.children, newBranch],
        };
      } else if (node.children.length > 0) {
        return {
          ...node,
          children: handleNewbranch(node.children, datumtId, newBranch),
        };
      }
      return node;
    });
  };

  return (
    <div className="container">
      <Tree
        zoomable={true}
        orientation="vertical"
        onNodeClick={(datum) => handleNodeClick(datum)}
        data={tree}
        translate={{
          x: 700,
          y: 170,
        }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
      />

      <AddNewBrach
        isOpen={isOpen}
        handleClose={handleClose}
        parentName={parentName}
        tree={tree}
        setTree={setTree}
      />
    </div>
  );
};

export default App;
