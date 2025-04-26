"use client";

import React from "react";
import { useColumns } from "@/context/ColumnsContext";

const STORAGE_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY ?? "";

const StorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { columns, tasks, setColumns, setTasks } = useColumns();

  React.useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const { columns: storedColumns, tasks: storedTasks } =
          JSON.parse(storedData);
        if (Array.isArray(storedColumns) && Array.isArray(storedTasks)) {
          setColumns(storedColumns);
          setTasks(storedTasks);
        }
      } catch {}
    }
  }, [setColumns, setTasks]);

  React.useEffect(() => {
    const dataToSave = { columns, tasks };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [columns, tasks]);

  return <>{children}</>;
};

export { StorageProvider };
