import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({
  list,
  onDeleteList,
  onAddItem,
  onDeleteItem,
  onAddSubItem,
  onDeleteSubItem,
  onAddSubSubItem,
  onDeleteSubSubItem,
  onToggleDone,
  onToggleItemVisibility,
  onToggleSubItemVisibility,
  index,
}) => {
  const [newItemTitle, setNewItemTitle] = useState("");

  const addItem = (itemTitle) => {
    if (itemTitle.trim() === "") {
      alert("Please input a title for the item.");
    } else {
      onAddItem(itemTitle);
      setNewItemTitle(""); // Clear the input field
    }
  };

  const handleAddItemWithEnter = (e) => {
    if (e.key === "Enter" || e.key === "Return") {
      addItem(newItemTitle);
    }
  };

  return (
    <Draggable draggableId={list.id.toString()} index={index}>
      {(provided) => (
        <div
          className="todo-list"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="list-header">
            <div className="content-container0">
              <span
                {...provided.dragHandleProps}
                contentEditable="true"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    e.target.blur();
                  }
                }}
                style={{ maxWidth: "100%", display: "inline-block" }}
              >
                {list.title}
              </span>
            </div>
            <button onClick={onDeleteList}>&times;</button>
          </div>
          <Droppable droppableId={list.id.toString()} type="ITEM">
            {(provided) => (
              <ul
                className="list-items "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.items.map((item, itemIndex) => (
                  <TodoListItem
                    key={item.id}
                    item={item}
                    listId={list.id}
                    onDeleteItem={() => onDeleteItem(item.id)}
                    onAddSubItem={(subItemTitle) =>
                      onAddSubItem(item.id, subItemTitle)
                    }
                    onDeleteSubItem={(subItemId) =>
                      onDeleteSubItem(item.id, subItemId)
                    }
                    onAddSubSubItem={(subItemId, subSubItemTitle) =>
                      onAddSubSubItem(item.id, subItemId, subSubItemTitle)
                    }
                    onDeleteSubSubItem={(itemId, subItemId, subSubItemId) =>
                      onDeleteSubSubItem(itemId, subItemId, subSubItemId)
                    }
                    onToggleDone={(itemId, is_done) =>
                      onToggleDone(list.id, itemId, is_done)
                    }
                    index={itemIndex}
                    onToggleItemVisibility={(itemId, is_visible) =>
                      onToggleItemVisibility(list.id, itemId, is_visible)
                    }
                    onToggleSubItemVisibility={(
                      itemId,
                      subItemId,
                      is_sub_visible
                    ) =>
                      onToggleSubItemVisibility(
                        list.id,
                        itemId,
                        subItemId,
                        is_sub_visible
                      )
                    }
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <div className="add-item">
            <input
              type="text"
              placeholder="Add a new item"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              onKeyPress={handleAddItemWithEnter}
            />
            <button onClick={() => addItem(newItemTitle)}>&#10004;</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoList;
