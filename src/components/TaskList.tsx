"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleTask, clearCompletedTasks } from "@/store/tasksSlice";
import { Task } from "@/interfaces/Task";
import './TaskList.css';

const TaskList: React.FC = ({}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const tasks = useSelector((state: { tasks: { value: Task[] } }) => state.tasks.value);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') {
      return !task.completed;
    }
    if (filter === 'completed') {
      return task.completed;
    }
    return true;
  });

  return (
    <div className="list">
      <div className="filterButtons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Все</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Активные</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Завершенные</button>
      </div>
      <button onClick={() => dispatch(clearCompletedTasks())} className="clearButton">Очистить завершенные</button>
      <ul className="taskList">
        {filteredTasks.slice().reverse().map((task) => (
          <li key={task.id} className="taskItem">
            <button 
              className="toggleButton" 
              onClick={() => dispatch(toggleTask(task.id))}
            >
              {task.completed && <span className="checkmark">✔</span>}
            </button>

            <p className={task.completed ? 'completed' : ''}>{task.title}</p>

            <button onClick={() => dispatch(deleteTask(task.id))} className="deleteButton">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
