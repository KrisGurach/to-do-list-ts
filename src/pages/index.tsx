"use client";
import { addTask } from "@/store/tasksSlice";
import React, { useState } from "react";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Link from 'next/link';
import { fetchTasks } from '@/utils/api';
import { setTasks } from '@/store/tasksSlice';
import TaskList from '@/components/TaskList';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      dispatch(setTasks(fetchedTasks));
    };

    loadTasks();
  }, [dispatch]);

  
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

export default Home;