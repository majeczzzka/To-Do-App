import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { updateContent } from "../api";

const TodoListItem = ({
  item,
  subItem,
  subSubItem,
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
  const [is_done, set_is_done] = useState(false);
  const [is_sub_done, set_is_sub_done] = useState(false);
  const [is_sub_sub_done, set_is_sub_sub_done] = useState(false);
  const [is_visible, set_is_visible] = useState(true);
  const [is_sub_visible, set_is_sub_visible] = useState(
    item.sub_items
      ? item.sub_items.reduce((acc, curr) => {
          acc[curr.id] = true;
          return acc;
        }, {})
      : {}
  );

  useEffect(() => {
    if (item.sub_items) {
      const initialVisibility = item.sub_items.reduce((acc, curr) => {
        acc[curr.id] = true;
        return acc;
      }, {});
      set_is_sub_visible(initialVisibility);
    }
  }, []);

  const toggleDone = () => {
    set_is_done(!is_done);
    onToggleDone(item.id, !is_done);
  };

  const toggleSubDone = (subItemId) => {
    set_is_sub_done((prevDone) => ({
      ...prevDone,
      [subItemId]: !prevDone[subItemId],
    }));
  };

  const toggleSubSubDone = (subSubItemId) => {
    set_is_sub_sub_done((prevDone) => ({
      ...prevDone,
      [subSubItemId]: !prevDone[subSubItemId],
    }));
  };

  const editableContents = document.querySelectorAll(".item-content");

  editableContents.forEach((content) => {
    content.addEventListener("input", async () => {
      const contentId = content.getAttribute("id");
      const updatedContent = content.innerText;
      console.log("Updated Content:", updatedContent);

      try {
        // Call the API function to update the content
        const token = localStorage.getItem("token");
        const response = await updateContent(contentId, updatedContent, token);
        console.log("Content updated successfully:", response);
      } catch (error) {
        console.error("Error updating content:", error);
      }
    });
  });

  const toggleVisibility = () => {
    set_is_visible(!is_visible);
    onToggleItemVisibility(item.id, !is_visible);
  };

  const toggleSubVisibility = (subItemId) => {
    console.log("subItemId:", subItemId, is_sub_visible[subItemId]);
    set_is_sub_visible((prevState) => ({
      ...prevState,
      [subItemId]: !prevState[subItemId],
    }));
    onToggleSubItemVisibility(item.id, subItemId, !is_sub_visible[subItemId]);
  };

  const addSubItem = () => {
    const subItemTitle = prompt("Enter the title of the sub-item:");
    if (subItemTitle) {
      onAddSubItem(subItemTitle);
    }
  };

  const addSubSubItem = (subItemId) => {
    const subSubItemTitle = prompt("Enter the title of the sub-sub-item:");
    if (subSubItemTitle !== null) {
      onAddSubSubItem(subItemId, subSubItemTitle);
    }
  };
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        // Only render if it's not hidden
        <li
          className={`todo-list-item ${is_done ? "done" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="item-header">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="checkbox">
                <input
                  type="checkbox"
                  checked={is_done}
                  onChange={toggleDone}
                />
              </div>
              <div className="content-container">
                <span
                  contentEditable="true"
                  data-content-type="item"
                  data-content-id="item.id"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.target.blur();
                    }
                  }}
                  style={{
                    maxWidth: "100%",
                    display: "inline-block",
                    textDecoration: is_done ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </span>
              </div>
              {item.sub_items && item.sub_items.length > 0 && (
                <button
                  className="visibility-button"
                  onClick={toggleVisibility}
                >
                  {is_visible ? "▲" : "▼"}
                </button>
              )}
              <button className="add-sub-item-button" onClick={addSubItem}>
                <span role="img" aria-label="Add">
                  &#x2795;
                </span>
              </button>
            </div>
            <button className="delete-button" onClick={onDeleteItem}>
              <span role="img" aria-label="Delete">
                &times;
              </span>
            </button>
          </div>
          {item.sub_items && item.sub_items.length > 0 && is_visible && (
            <ul className="sub-items">
              {item.sub_items.map((subItem) => (
                <li key={subItem.id}>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      checked={is_done || is_sub_done[subItem.id] || false}
                      onChange={() => toggleSubDone(subItem.id)}
                    />
                  </div>
                  <div className="content-container2">
                    <span
                      contentEditable="true"
                      data-content-type="subItem"
                      data-content-id="subItem.id"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.target.blur();
                        }
                      }}
                      style={{
                        maxWidth: "100%",
                        display: "inline-block",
                        textDecoration:
                          is_done || is_sub_done[subItem.id]
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {subItem.title}
                    </span>
                  </div>
                  {subItem.sub_sub_items &&
                    subItem.sub_sub_items.length > 0 && (
                      <button
                        className="visibility-button"
                        onClick={() => toggleSubVisibility(subItem.id)}
                      >
                        {!is_sub_visible[subItem.id] ? "▲" : "▼"}
                      </button>
                    )}
                  <button
                    className="add-sub-sub-item-button"
                    onClick={() => addSubSubItem(subItem.id)}
                  >
                    <span role="img" aria-label="Add">
                      &#x2795;
                    </span>
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDeleteSubItem(subItem.id)}
                  >
                    &times;
                  </button>

                  {subItem.sub_sub_items &&
                    subItem.sub_sub_items.length > 0 &&
                    !is_sub_visible[subItem.id] && (
                      <ul className="sub-sub-items">
                        {subItem.sub_sub_items.map((subSubItem) => (
                          <li
                            key={subSubItem.id}
                            style={{ width: "100%", maxWidth: "100%" }}
                          >
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                checked={
                                  is_done ||
                                  is_sub_done[subItem.id] ||
                                  is_sub_sub_done[subSubItem.id] ||
                                  false
                                }
                                onChange={() => toggleSubSubDone(subSubItem.id)}
                              />
                            </div>
                            <div className="content-container3">
                              <span
                                contentEditable="true"
                                data-content-type="subSubItem"
                                data-content-id="item.id"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    e.target.blur();
                                  }
                                }}
                                style={{
                                  maxWidth: "100%",
                                  display: "inline-block",
                                  textDecoration:
                                    is_done ||
                                    is_sub_done[subItem.id] ||
                                    is_sub_sub_done[subSubItem.id]
                                      ? "line-through"
                                      : "none",
                                }}
                              >
                                {subSubItem.title}
                              </span>
                            </div>
                            <button
                              className="delete-button"
                              onClick={() => {
                                console.log(
                                  "Button Clicked - item.id:",
                                  item.id,
                                  "subItem.id:",
                                  subItem.id,
                                  "subSubItem.id:",
                                  subSubItem.id
                                );
                                onDeleteSubSubItem(
                                  item.id,
                                  subItem.id,
                                  subSubItem.id
                                );
                              }}
                            >
                              &times;
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default TodoListItem;
