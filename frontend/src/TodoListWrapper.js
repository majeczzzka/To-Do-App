import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { useNavigate } from "react-router-dom";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import {
  createItem,
  createList,
  createSubItem,
  createSubSubItem,
  updateDeleteItem,
  updateDeleteList,
  updateDeleteSubItem,
  updateDeleteSubSubItem,
  updateItemDoneStatus,
  updateSubItemVisibility,
  updateSubSubItemVisibility,
  getAllLists,
  getAllItems,
  getAllSubItems,
  getAllSubSubItems,
} from "./api";

function TodoListWrapper() {
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]);
  const [subItems, setSubItems] = useState([]);
  const [subSubItems, setSubSubItems] = useState([]);
  const [listId, setListId] = useState(null); // Define listId state
  const [itemId, setItemId] = useState(null); // Define itemId state
  const [subItemId, setSubItemId] = useState(null);
  const [subSubItemId, setSubSubItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loadLists = async () => {
      try {
        const response = await getAllLists(token);
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    loadLists();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadItems = async () => {
      try {
        const response = await getAllItems(listId, token);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    loadItems();
  }, [listId]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadSubItems = async () => {
      try {
        const response = await getAllSubItems(listId, itemId, token);
        setSubItems(response.data);
      } catch (error) {
        console.error("Error fetching subitems:", error);
      }
    };

    loadSubItems();
  }, [listId, itemId]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadSubSubItems = async () => {
      try {
        const response = await getAllSubSubItems(
          listId,
          itemId,
          subItemId,
          token
        );
        setSubSubItems(response.data);
      } catch (error) {
        console.error("Error fetching subsubitems:", error);
      }
    };

    loadSubSubItems();
  }, [listId, itemId, subItemId]);

  const addList = (title) => {
    const token = localStorage.getItem("token");
    console.log("AAA");
    if (title) {
      console.log("BBtgjhkhjkt5B");
      createList(title, token).then((response) => {
        console.log("reeffrfr");
        const newList = response.data;
        setLists([...lists, newList]);
      });
    }
  };

  const deleteList = (listId) => {
    const token = localStorage.getItem("token");

    console.log("in delete list", listId);
    updateDeleteList(listId, token);
    const updatedLists = lists.filter((list) => list.id !== listId);
    console.log("after delete list", listId);
    setLists(updatedLists);
  };

  const toggleDone = (listId, itemId, is_done) => {
    const token = localStorage.getItem("token");

    console.log("Before Update", listId, itemId, is_done);
    updateItemDoneStatus(listId, itemId, is_done, token).then((response) => {
      console.log("After Update response is", response.data);
      is_done = response.data.is_done;
      console.log("After Update", response.data.is_done);

      // Create a copy of the current state
      console.log("ids", listId, is_done);
      const updatedLists = lists.map((list) => {
        if (list.id === listId) {
          // Create a copy of the items array
          list.items = list.items.map((item) => {
            if (item.id === itemId) {
              // Toggle the "isDone" property
              item.is_done = is_done;
            }
            return item;
          });
        }
        return list;
      });

      // Update the state with the modified data
      setLists(updatedLists);
    });
  };

  const addListItem = (listId, itemTitle) => {
    const token = localStorage.getItem("token");

    if (itemTitle) {
      createItem(listId, itemTitle, token).then((response) => {
        const newItem = response;

        const updatedLists = lists.map((list) => {
          if (list.id === listId) {
            if (Array.isArray(newItem)) {
              return {
                ...list,
                items: [...list.items, ...newItem],
              };
            } else {
              return {
                ...list,
                items: [...list.items, newItem],
              };
            }
          }
          return list;
        });

        setLists(updatedLists);
      });
    }
  };

  const deleteListItem = (listId, itemId) => {
    const token = localStorage.getItem("token");

    updateDeleteItem(listId, itemId, token);
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        list.items = list.items.filter((item) => item.id !== itemId);
      }
      return list;
    });
    setLists(updatedLists);
  };

  const addSubItem = (listId, itemId, subItemTitle) => {
    const token = localStorage.getItem("token");

    if (subItemTitle) {
      createSubItem(listId, itemId, subItemTitle, token).then((response) => {
        const newSubItem = response.data;
        const updatedLists = lists.map((list) => {
          if (list.id === listId) {
            list.items = list.items.map((item) => {
              if (item.id === itemId) {
                return {
                  ...item,
                  sub_items: [...item.sub_items, newSubItem],
                };
              }
              return item;
            });
          }
          return list;
        });
        setLists(updatedLists);
      });
    }
  };
  const deleteSubItem = (listId, itemId, subItemId) => {
    const token = localStorage.getItem("token");

    updateDeleteSubItem(listId, itemId, subItemId, token);
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        list.items = list.items.map((item) => {
          if (item.id === itemId) {
            item.sub_items = item.sub_items.filter(
              (subItem) => subItem.id !== subItemId
            );
          }
          return item;
        });
      }
      return list;
    });
    setLists(updatedLists);
  };

  const addSubSubItem = (listId, itemId, subItemId, subSubItemTitle) => {
    const token = localStorage.getItem("token");

    if (subSubItemTitle) {
      createSubSubItem(listId, itemId, subItemId, subSubItemTitle, token).then(
        (response) => {
          const newSubSubItem = response.data;
          const updatedLists = lists.map((list) => {
            if (list.id === listId) {
              list.items = list.items.map((item) => {
                if (item.id === itemId) {
                  item.sub_items = item.sub_items.map((subItem) => {
                    if (subItem.id === subItemId) {
                      return {
                        ...subItem,
                        sub_sub_items: [
                          ...subItem.sub_sub_items,
                          newSubSubItem,
                        ],
                      };
                    }
                    return subItem;
                  });
                }
                return item;
              });
            }
            return list;
          });
          setLists(updatedLists);
        }
      );
    }
  };

  const deleteSubSubItem = (listId, itemId, subItemId, subSubItemId) => {
    const token = localStorage.getItem("token");

    updateDeleteSubSubItem(listId, itemId, subItemId, subSubItemId, token);
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        list.items = list.items.map((item) => {
          if (item.id === itemId) {
            item.sub_items = item.sub_items.map((subItem) => {
              if (subItem.id === subItemId) {
                subItem.sub_sub_items = subItem.sub_sub_items.filter(
                  (subSubItem) => subSubItem.id !== subSubItemId
                );
              }
              return subItem;
            });
          }
          return item;
        });
      }
      return list;
    });
    setLists(updatedLists);
  };

  const toggleVisibility = (listId, itemId, is_visible) => {
    const token = localStorage.getItem("token");

    updateSubItemVisibility(listId, itemId, is_visible, token).then(
      (response) => {
        console.log(response.data.is_visible);
        is_visible = response.data.is_visible;
        const updatedLists = lists.map((list) => {
          if (list.id === listId) {
            list.items = list.items.map((item) => {
              if (item.id === itemId) {
                item.is_visible = is_visible; // Set the visibility flag
              }
              return item;
            });
          }
          return list;
        });
        setLists(updatedLists);
      }
    );
  };

  const toggleSubVisibility = (listId, itemId, subItemId, is_sub_visible) => {
    const token = localStorage.getItem("token");

    console.log("in tsw", is_sub_visible, subItemId);
    updateSubSubItemVisibility(
      listId,
      itemId,
      subItemId,
      is_sub_visible,
      token
    ).then((response) => {
      console.log(response);
      const updatedVisibility = response.data.is_sub_visible;
      const updatedLists = lists.map((list) => {
        if (list.id === listId) {
          list.items = list.items.map((item) => {
            if (item.id === itemId) {
              item.sub_items = item.sub_items.map((sub_item) => {
                if (sub_item.id === subItemId) {
                  sub_item.is_sub_visible = updatedVisibility; // Set the visibility flag
                }
                return sub_item;
              });
            }
            return item;
          });
        }
        return list;
      });
      setLists(updatedLists);
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, type } = result;

    if (type === "COLUMN") {
      const updatedLists = [...lists];
      const [removed] = updatedLists.splice(source.index, 1);
      updatedLists.splice(destination.index, 0, removed);

      setLists(updatedLists);
    } else if (type === "ITEM") {
      const sourceList = lists.find(
        (list) => list.id.toString() === source.droppableId
      );
      const destList = lists.find(
        (list) => list.id.toString() === destination.droppableId
      );

      const sourceIndex = source.index;
      const destIndex = destination.index;

      if (sourceList === destList) {
        const updatedItems = [...sourceList.items];
        const [movedItem] = updatedItems.splice(sourceIndex, 1);
        updatedItems.splice(destIndex, 0, movedItem);

        sourceList.items = updatedItems;
        setLists([...lists]);
      } else {
        const sourceItems = [...sourceList.items];
        const destItems = [...destList.items];

        const [movedItem] = sourceItems.splice(sourceIndex, 1);
        destItems.splice(destIndex, 0, movedItem);

        sourceList.items = sourceItems;
        destList.items = destItems;

        setLists([...lists]);
      }
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="list-title">
          t h e &nbsp; T o - D o &nbsp; L i s t &nbsp; y o u &nbsp; w e r e
          &nbsp; l o o k i n g &nbsp; f o r.{" "}
          <span role="img" aria-label="Star Emoji">
            &#127775;
          </span>
        </h1>
        <button onClick={() => navigate("/login")} className="logout">
          Log Out
        </button>
      </div>
      <AddTodo onAddList={addList} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          type="COLUMN"
          direction="horizontal"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="todo-list-container"
            >
              {lists.map((list, index) => (
                <TodoList
                  key={list.id}
                  list={list}
                  onDeleteList={() => deleteList(list.id)}
                  onAddItem={(itemTitle) => addListItem(list.id, itemTitle)}
                  onDeleteItem={(itemId) => deleteListItem(list.id, itemId)}
                  onAddSubItem={(itemId, subItemTitle) =>
                    addSubItem(list.id, itemId, subItemTitle)
                  }
                  onDeleteSubItem={(itemId, subItemId) =>
                    deleteSubItem(list.id, itemId, subItemId)
                  }
                  onAddSubSubItem={(itemId, subItemId, subSubItemTitle) =>
                    addSubSubItem(list.id, itemId, subItemId, subSubItemTitle)
                  }
                  onDeleteSubSubItem={(itemId, subItemId, subSubItemId) => {
                    deleteSubSubItem(list.id, itemId, subItemId, subSubItemId);
                  }}
                  onToggleDone={(listId, itemId, is_done) =>
                    toggleDone(listId, itemId, is_done)
                  }
                  onToggleItemVisibility={(listId, itemId, is_visible) =>
                    toggleVisibility(listId, itemId, is_visible)
                  }
                  onToggleSubItemVisibility={(
                    listId,
                    itemId,
                    subItemId,
                    is_sub_visible
                  ) =>
                    toggleSubVisibility(
                      listId,
                      itemId,
                      subItemId,
                      is_sub_visible
                    )
                  }
                  index={index}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TodoListWrapper;
