import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

interface TaskListProps {
  tasks: { id: string; title: string; completed: boolean }[];
  editTask: (id: string, newTitle: string) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  selectTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, editTask, deleteTask, toggleTaskStatus, selectTask }) => {
  return (
    <div className="task-list">
      <h2>Список задач</h2>
      {tasks.length === 0 ? (
        <p>Список задач пуст</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
            toggleTaskStatus={toggleTaskStatus}
            selectTask={selectTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;