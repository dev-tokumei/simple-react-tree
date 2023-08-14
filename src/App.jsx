import React, { useEffect, useState } from "react";
import AddNewBrach from "./components/addNewBrach";
import Tree from "react-d3-tree";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [tree, setTree] = useState([{}]);
  const [parentName, setParentName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const treeCollection = collection(db, "tree");
        setIsLoading(true);
        const snapshot = await getDocs(treeCollection);

        snapshot.forEach((doc) => {
          const treeItem = doc.data();
          setTree(treeItem.dataArray);
        });

        setError(null);
      } catch (error) {
        console.error("Error fetching tree data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleNodeClick = (datum) => {
    setParentName(datum.data.name);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="container">
      {error ? (
        <div>
          Ошибка при получения данных {":("} {error}
        </div>
      ) : isLoading ? (
        <div>Загрузка....</div>
      ) : (
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
      )}

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
