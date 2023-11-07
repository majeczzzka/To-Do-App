// Function to start dragging an item
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }
  
  // Function to allow dropping an item
  function allowDrop(event) {
    event.preventDefault();
  }
  
  // Function to drop an item into a different list
  function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var itemToMove = document.getElementById(data);
  
    // Ensure that the item is moved only between lists
    if (event.target.classList.contains("todo-list-container")) {
      event.target.appendChild(itemToMove);
    }
  }
  