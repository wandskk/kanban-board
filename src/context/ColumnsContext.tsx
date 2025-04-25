"use client";

import React, { createContext, useState, useCallback, useContext } from "react";
import { Id } from "@/types/id";
import { Column } from "@/types/column";
import { ColumnsContextProps } from "@/types/columnsContextProps";
import { idHelper } from "@/helpers/id";
import { arrayMove } from "@dnd-kit/sortable";

const ColumnsContext = createContext<ColumnsContextProps | undefined>(
  undefined
);

const ColumnsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const columnsId = React.useMemo(
    () => columns.map((col) => col.id),
    [columns]
  );

  const createNewColumn = useCallback(() => {
    const columnsToAdd: Column = {
      id: idHelper.generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnsToAdd]);
  }, [columns]);

  const deleteColumn = useCallback(
    (id: Id) => {
      const filteredColumns = columns.filter((col) => col.id !== id);
      setColumns(filteredColumns);
    },
    [columns]
  );

  const updateColumn = useCallback(
    (id: Id, title: string) => {
      const newColumns = columns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, title };
      });
      setColumns(newColumns);
    },
    [columns]
  );

  const moveColumn = useCallback((activeColumnId: Id, overColumnId: Id) => {
    setColumns((prevColumns) => {
      const activeColumnIndex = prevColumns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = prevColumns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
    });
  }, []);

  const contextValue = {
    columns,
    columnsId,
    createNewColumn,
    deleteColumn,
    updateColumn,
    moveColumn,
    activeColumn,
    setActiveColumn,
  };

  return (
    <ColumnsContext.Provider value={contextValue}>
      {children}
    </ColumnsContext.Provider>
  );
};

const useColumns = () => {
  const context = useContext(ColumnsContext);
  if (!context) {
    throw new Error("useColumns must be used within a ColumnsProvider");
  }
  return context;
};

export { ColumnsProvider, useColumns };
