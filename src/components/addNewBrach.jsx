import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import clone from "clone";
import React, { useState } from "react";

function addChildByName(object, parentName, childName, setTree) {
  function addChildRecursive(node) {
    if (node.name === parentName) {
      const newNodeChildrenData = node.children;

      const newTree = {
        name: childName,
        children: [],
        id: Date.now(),
      };
      newNodeChildrenData.push(newTree);

      setTree(clone(object));

      return true;
    }

    if (node.children) {
      for (const childNode of node.children) {
        if (addChildRecursive(childNode)) {
          return true;
        }
      }
    }

    return false;
  }

  addChildRecursive(object[0]);
}

function removeChildByName(object, parentName, setTree) {
  function deleteRecursive(node) {
    for (let i = 0; i < node.children.length; i++) {
      deleteRecursive(node.children[i]);
    }
    node.children = [];
  }
  function removeChildRecursive(node) {
    if (node.name === parentName) {
      let newNodeChildrenData = node.children;

      deleteRecursive(node);

      newNodeChildrenData = [];

      setTree(clone(object));

      return true;
    }

    if (node.children) {
      for (const childNode of node.children) {
        if (removeChildRecursive(childNode)) {
          return true;
        }
      }
    }

    return false;
  }

  removeChildRecursive(object[0]);
}

const AddNewBrach = ({ isOpen, handleClose, parentName, tree, setTree }) => {
  const [name, setName] = useState("");

  const handleChange = () => {
    addChildByName(tree, parentName, name, setTree);
    handleClose();
    setName("");
  };

  const handleDelete = () => {
    alert("Точно вы хотите удалить элемент");
    removeChildByName(tree, parentName, setTree);
    handleClose();
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            background: "#f2f2f2",
            px: 5,
            py: 2,
            width: "450px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ py: 2 }}>Добавте новый элемент</Typography>
            <Button variant="outlined" onClick={handleClose} color="warning">
              X
            </Button>
          </Box>
          <TextField
            fullWidth
            value={name}
            placeholder="Добавте город или поселок"
            onChange={(e) => setName(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              onClick={handleDelete}
              color="error"
              sx={{ mt: 3 }}
            >
              Удалить
            </Button>
            <Button
              variant="contained"
              disabled={!name}
              onClick={handleChange}
              color="primary"
              title="Добавить"
              sx={{ mt: 3 }}
            >
              Добавить
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNewBrach;
