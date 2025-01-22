"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { deleteTask, toggleTask } from "@/store/tasksSlice";
import { Task } from "@/interfaces/Task";

const TaskList: React.FC = ({}) => {
  const dispatch = useDispatch();

  const tasks = useSelector(  
    (state: { tasks: { value: Task[] } }) => state.tasks.value
  );

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Link href={`/tasks/${task.id}`}>
            <strong>{task.title}</strong>
          </Link>
          <span>{task.completed ? ' (выполнено)' : ' (не выполнено)'}</span>
          <button onClick={() => dispatch(toggleTask(task.id))}>
            {task.completed ? 'Не выполнено' : 'Выполнено'}
          </button>
          <button onClick={() => dispatch(deleteTask(task.id))}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
