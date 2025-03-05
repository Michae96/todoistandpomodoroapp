import React from 'react';
import './Timer.css';

interface TimerProps {
  timeLeft: number;
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  currentTask: { id: string; title: string; completed: boolean } | undefined;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, isRunning, startTimer, pauseTimer, resetTimer, currentTask }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      <h2>Таймер</h2>
      <div className="time-display">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="timer-controls">
        <button onClick={startTimer} disabled={isRunning}>
          Старт
        </button>
        <button onClick={pauseTimer} disabled={!isRunning}>
          Пауза
        </button>
        <button onClick={resetTimer}>Рефреш</button>
      </div>
      {currentTask && (
        <div className="current-task">
          <h3>Текущая задача:</h3>
          <p>{currentTask.title}</p>
        </div>
      )}
    </div>
  );
};

export default Timer;