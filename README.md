# Hierarchical To Do List

This application allows users to manage their tasks with a simple and intuitive interface. It integrates 3 levels of task management (tasks, subtasks, and sub-subtasks) as well as introduces task completion, option to hide specific levels of tasks, as well as introduces a functionality to drag root tasks around to different lists. App enables to edit names of each task/list names. Moroever, if user check marks a higher-level task, all the tasks that belong to it will also be marked as done.

## Introductory Video

https://www.loom.com/share/f0e961ae05b246e38db1e853d370670f?sid=8564de71-8c47-4db0-8475-8d022281a4ec

## Build With

- **Frontend**: Built with React, JavaScript and other libraries like `react-router-dom`.
- **Backend**: Built with Flask, Python and SQLite.

### Installation

1. **Clone the Repo**

`git clone`

1. **Backend Setup**:

   - Navigate to the backend directory: `cd backend`
   - Install Python dependencies: `pip install -r requirements.txt`
   - Navigate to the backend_project folder: `cd backend_project`
   - Configurate the main file: `export FLASK_APP=main.py`
   - Run the App: `flask run --port 5002`

2. **Frontend Setup**:
   - Navigate to the frontend directory: `cd frontend`
   - Install JavaScript dependencies: `npm install`
   - Start the development server: `npm start`
