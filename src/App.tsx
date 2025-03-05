import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: string; title: string; completed: boolean }[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'incomplete'>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setIsRunning(false);
            if (isWorking) {
              alert('Работа завершена! Время для отдыха.');
              setIsWorking(false);
              setTimeLeft(5 * 60);
            } else {
              alert('Отдых завершен! Время для работы.');
              setIsWorking(true);
              setTimeLeft(25 * 60);
            }
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isWorking]);

  const addTask = (title: string) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorking(true);
    setTimeLeft(25 * 60);
  };

  const toggleTimerMode = () => {
    setIsWorking((prev) => !prev);
    setTimeLeft((prev) => (prev === 25 * 60 ? 5 * 60 : 25 * 60));
  };

  const selectTask = (id: string) => {
    setCurrentTaskId(id);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'incomplete' && !task.completed);
    return matchesSearch && matchesStatus;
  });

  const currentTask = tasks.find((task) => task.id === currentTaskId);

  return (
    <div className="app">
      <h1>To-Do List with Pomodoro Timer</h1>
      <TaskForm addTask={addTask} />
      <div className="filters">
        <input
          type="text"
          placeholder="Поиск задач"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'incomplete')}
        >
          <option value="all">Все</option>
          <option value="completed">Выполненные</option>
          <option value="incomplete">Невыполненные</option>
        </select>
      </div>
      <TaskList
        tasks={filteredTasks}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleTaskStatus={toggleTaskStatus}
        selectTask={selectTask}
      />
      <Timer
        timeLeft={timeLeft}
        isRunning={isRunning}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
        toggleTimerMode={toggleTimerMode}
        isWorking={isWorking}
        currentTask={currentTask}
      />
    </div>
  );
};

export default App;