"use client";

import React from "react";
import { Id } from "@/types/id";
import { Column } from "@/types/column";
import { ColumnsContextProps } from "@/types/columnsContextProps";
import { idHelper } from "@/helpers/id";
import { arrayMove } from "@dnd-kit/sortable";
import { Task } from "@/types/task";

const ColumnsContext = React.createContext<ColumnsContextProps | undefined>(
  undefined
);

const ColumnsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columns, setColumns] = React.useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = React.useState<Column | null>(null);
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const columnsIds = React.useMemo(
    () => columns.map((col) => col.id),
    [columns]
  );

  const tasksIds = React.useMemo(() => tasks.map((task) => task.id), [tasks]);

  const createNewColumn = React.useCallback(() => {
    const columnsToAdd: Column = {
      id: idHelper.generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnsToAdd]);
  }, [columns]);

  const deleteColumn = React.useCallback(
    (id: Id) => {
      const filteredColumns = columns.filter((col) => col.id !== id);
      setColumns(filteredColumns);

      const newTasks = tasks.filter((task) => task.columnId !== id);
      setTasks(newTasks);
    },
    [columns]
  );

  const updateColumn = React.useCallback(
    (id: Id, title: string) => {
      const newColumns = columns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, title };
      });
      setColumns(newColumns);
    },
    [columns]
  );

  const moveColumn = React.useCallback(
    (activeColumnId: Id, overColumnId: Id) => {
      setColumns((prevColumns) => {
        const activeColumnIndex = prevColumns.findIndex(
          (col) => col.id === activeColumnId
        );
        const overColumnIndex = prevColumns.findIndex(
          (col) => col.id === overColumnId
        );
        return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
      });
    },
    []
  );

  const moveTask = React.useCallback((activeTaskId: Id, overTaskId: Id) => {
    setTasks((prevTasks) => {
      const activeTaskIndex = prevTasks.findIndex(
        (task) => task.id === activeTaskId
      );
      const overTaskIndex = prevTasks.findIndex(
        (task) => task.id === overTaskId
      );

      if (
        prevTasks[activeTaskIndex].columnId !==
        prevTasks[overTaskIndex].columnId
      ) {
        prevTasks[activeTaskIndex].columnId = prevTasks[overTaskIndex].columnId;
      }

      return arrayMove(prevTasks, activeTaskIndex, overTaskIndex);
    });
  }, []);

  const moveTaskToColumn = React.useCallback((taskId: Id, columnId: Id) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.id === taskId);

      if (taskIndex === -1) return prevTasks;

      const newTasks = [...prevTasks];
      newTasks[taskIndex] = {
        ...newTasks[taskIndex],
        columnId,
      };

      return newTasks;
    });
  }, []);

  const createTask = React.useCallback(
    (columnId: Id) => {
      const newTask: Task = {
        id: idHelper.generateId(),
        columnId,
        content: `Task ${tasks.length + 1}`,
      };
      setTasks([...tasks, newTask]);
    },
    [tasks]
  );

  const deleteTask = React.useCallback(
    (taskId: Id) => {
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(filteredTasks);
    },
    [tasks]
  );

  const updateTask = React.useCallback(
    (taskId: Id, content: string) => {
      const newTasks = tasks.map((task) => {
        if (task.id !== taskId) return task;
        return { ...task, content };
      });
      setTasks(newTasks);
    },
    [tasks]
  );

  const contextValue = {
    columns,
    columnsIds,
    activeColumn,
    activeTask,
    tasks,
    tasksIds,
    createNewColumn,
    deleteColumn,
    updateColumn,
    moveColumn,
    moveTask,
    moveTaskToColumn,
    setActiveColumn,
    setActiveTask,
    createTask,
    deleteTask,
    updateTask,
  };

  return (
    <ColumnsContext.Provider value={contextValue}>
      {children}
    </ColumnsContext.Provider>
  );
};

const useColumns = () => {
  const context = React.useContext(ColumnsContext);
  if (!context) {
    throw new Error("useColumns must be used within a ColumnsProvider");
  }
  return context;
};

export { ColumnsProvider, useColumns };
