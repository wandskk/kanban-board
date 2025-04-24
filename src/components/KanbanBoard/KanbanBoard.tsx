"use client";

import React from "react";

import { Column } from "@/types/column";
import { idHelper } from "@/helpers/id";
import { LuCirclePlus } from "react-icons/lu";

const KanbanBoard = () => {
  const [columns, setColumns] = React.useState<Column[]>([]);

  function createNewColumn() {
    const columnsToAdd: Column = {
      id: idHelper.generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnsToAdd]);
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((column) => (
            <div key={column.id}>{column.title}</div>
          ))}
        </div>
        <button
          onClick={() => createNewColumn()}
          className="flex gap-2 items-center h-[60px] w-350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2"
        >
          <LuCirclePlus />
          Add Column
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
