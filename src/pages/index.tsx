"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
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

  return (
    <div>
      <h1>Список задач</h1>
      <Link href="/add-task">Добавить задачу</Link>
      <TaskList />
    </div>
  );
};

export default Home;