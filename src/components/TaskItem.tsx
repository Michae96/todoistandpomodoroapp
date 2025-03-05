import React, { useState } from 'react';
import './TaskItem.css';

interface TaskItemProps {
  task: { id: string; title: string; completed: boolean };
  editTask: (id: string, newTitle: string) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  selectTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, editTask, deleteTask, toggleTaskStatus, selectTask }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(task.title);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      ) : (
        <span className={task.completed ? 'completed' : ''}>{task.title}</span>
      )}
      <div className="task-controls">
        <button onClick={handleEdit}>{isEditing ? 'Сохранить' : 'Редактировать'}</button>
        <button onClick={() => deleteTask(task.id)}>Удалить</button>
        <button onClick={() => toggleTaskStatus(task.id)}>
          {task.completed ? 'В процессе' : 'Выполнено'}
        </button>
        <button onClick={() => selectTask(task.id)}>Выбрать для таймера</button>
      </div>
    </div>
  );
};

export default TaskItem;