"use client";

import TaskList from "@/components/TaskList";
import { addTask } from "@/store/tasksSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddTask: React.FC = () => {
  const dispatch = useDispatch();

  const [task, setTask] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (task.trim() === "") {
      return;
    }
  
    const newTask = {
      id: Math.floor(Math.random() * 1000000),
      title: task,
      completed: false,
    };
  
    dispatch(addTask(newTask));
    console.log("Добавлена задача:", newTask);
  
    const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    currentTasks.unshift(newTask);
    localStorage.setItem('tasks', JSON.stringify(currentTasks)); 
  
    setTask("");
  };
  

  return (
    <div>
      <h1>Список задач</h1>
      <h2>Добавить новую задачу</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Введите задачу"
        />
        <button type="submit">Добавить задачу</button>
      </form>
      <TaskList />
    </div>
  );
};

export default AddTask;
