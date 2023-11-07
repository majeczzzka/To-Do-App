import React, { useState } from "react";

const AddTodo = ({ onAddList }) => {
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const [newSubItemTitle, setNewSubItemTitle] = useState("");
  const [newSubSubItemTitle, setNewSubSubItemTitle] = useState("");

  const handleAddSubItem = (index) => {
    const updatedList = [...list];
    updatedList[index].sub_items.push({
      id: new Date().getTime(),
      title: newSubItemTitle,
      subSubItems: [],
    });
    setList(updatedList);
    setNewSubItemTitle("");
  };

  const handleAddSubSubItem = (index, subIndex) => {
    console.log("Before adding subsubitem: ", list);
    const updatedList = [...list];
    updatedList[index].sub_items[subIndex].sub_sub_items.push({
      id: new Date().getTime(),
      title: newSubSubItemTitle,
    });
    setList(updatedList);
    setNewSubSubItemTitle("");
    console.log("After adding subsubitem: ", updatedList);
  };

  const handleAddListWithStructure = () => {
    console.log("Button clicked");
    if (title.trim() === "") {
      alert("Please input a title for the list.");
    } else {
      const listWithStructure = list.map((item) => ({
        ...item,
        sub_items: item.sub_items.map((subItem) => ({
          ...subItem,
          sub_sub_items: subItem.sub_sub_items || [],
        })),
      }));
      onAddList(title, listWithStructure);
      setTitle("");
      setList([]);
    }
  };

  const handleAddListWithEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddListWithStructure();
    }
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        placeholder="Add a new list"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleAddListWithEnter}
      />
      <button onClick={handleAddListWithStructure}>Add List</button>
      {list.map((item, index) => (
        <div key={item.id}>
          <input
            type="text"
            placeholder="Add item"
            value={item.title}
            onChange={(e) => {
              const updatedList = [...list];
              updatedList[index].title = e.target.value;
              setList(updatedList);
            }}
          />
          <input
            type="text"
            placeholder="Add sub-item"
            value={newSubItemTitle}
            onChange={(e) => setNewSubItemTitle(e.target.value)}
          />
          <button onClick={() => handleAddSubItem(index)}>Add Sub-Item</button>
          {item.sub_items.map((subItem, subIndex) => (
            <div key={subItem.id}>
              <input
                type="text"
                placeholder="Add sub-sub-item"
                value={newSubSubItemTitle}
                onChange={(e) => setNewSubSubItemTitle(e.target.value)}
              />
              <button onClick={() => handleAddSubSubItem(index, subIndex)}>
                Add Sub-Sub-Item
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AddTodo;
