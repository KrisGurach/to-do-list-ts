"use client";
import { addTask, setTasks } from "@/store/tasksSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TaskList from '@/components/TaskList';
import { fetchTasks } from '@/utils/api';
import { Task } from "@/interfaces/Task";
import styles from "../app/page.module.css";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();

      const stored = localStorage.getItem('tasks');
      const savedTasks = stored ? (JSON.parse(stored)).value : [];

      const uniqueTasks: Task[] = [
        ...savedTasks,
        ...fetchedTasks.filter((fetchedTask: Task) => 
          !savedTasks.some((savedTask: Task) => fetchedTask.id === savedTask.id)
        )
      ];

      dispatch(setTasks(uniqueTasks));
    };

    loadTasks();
  }, [dispatch]);

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

    setTask("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Список задач</h1>
      <h2 className={styles.heading}>Добавить новую задачу</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Введите задачу"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Добавить задачу</button>
      </form>
      <ul className={styles.taskList}>
        <TaskList />
      </ul>
    </div>
  );
};

export default Home;
