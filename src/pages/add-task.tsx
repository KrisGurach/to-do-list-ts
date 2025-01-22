"use client";

import Link from "next/link";
import React from "react";

const AddTask: React.FC = ({}) => {
  return (
    <div>
      <p>Тут добавление задачи...</p>
      <Link href="/">К списку задач</Link>
    </div>
  );
};

export default AddTask;
