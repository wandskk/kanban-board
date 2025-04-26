"use client";

import React from "react";
import ColumnContainer from "@/components/Column/ColumnContainer";
import Button from "@/components/Button/Button";
import TaskCard from "@/components/TaskCard/TaskCard";
import { useColumns } from "@/context/ColumnsContext";
import { createDivWrapper } from "@/helpers/createDivWrapper";
import { createPortal } from "react-dom";
import { SortableContext } from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { LuCirclePlus } from "react-icons/lu";
import { extractDragInfo } from "@/helpers/extractDragEvent";

const KanbanBoard = () => {
  const {
    columnsIds,
    moveColumn,
    moveTask,
    moveTaskToColumn,
    setActiveColumn,
    setActiveTask,
  } = useColumns();

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const dragInfo = extractDragInfo(event);
    if (!dragInfo) return;

    moveColumn(dragInfo.activeId, dragInfo.overId);
  }

  function onDragOver(event: DragOverEvent) {
    const dragInfo = extractDragInfo(event);
    if (!dragInfo) return;

    const { active, over, activeId, overId } = dragInfo;

    if (active && over) {
      const isActiveTask = active.data.current?.type === "Task";
      const isOverTask = over.data.current?.type === "Task";
      const isOverColumn = over.data.current?.type === "Column";

      if (isActiveTask && isOverTask) {
        moveTask(activeId, overId);
      }

      if (isActiveTask && isOverColumn) {
        moveTaskToColumn(activeId, overId);
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <KanbanBoardContainer className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <KanbanBoardContent className="m-auto flex gap-4">
          <KanbanBoardColumns className="flex gap-4">
            <SortableContext items={columnsIds}>
              <KanbanBoardColumnsList />
            </SortableContext>
          </KanbanBoardColumns>

          <KanbanBoardButton.CreateColumn />
        </KanbanBoardContent>

        <KanbanBoardColumnPortal />
      </DndContext>
    </KanbanBoardContainer>
  );
};

const KanbanBoardContainer = createDivWrapper("KanbanBoardContainer");
const KanbanBoardContent = createDivWrapper("KanbanBoardContent");
const KanbanBoardColumns = createDivWrapper("KanbanBoardColumns");

const KanbanBoardColumnsList = () => {
  const { columns } = useColumns();

  return columns.map((col) => <ColumnContainer key={col.id} column={col} />);
};

const KanbanBoardButton = {
  CreateColumn: () => {
    const { createNewColumn } = useColumns();

    return (
      <Button
        onClick={createNewColumn}
        className="flex gap-2 items-center h-[60px] w-350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2"
      >
        <LuCirclePlus />
        Add Column
      </Button>
    );
  },
};

const KanbanBoardColumnPortal = () => {
  const { activeColumn, activeTask } = useColumns();

  if (document)
    return createPortal(
      <DragOverlay>
        {activeColumn && <ColumnContainer column={activeColumn} />}
        {activeTask && <TaskCard task={activeTask} />}
      </DragOverlay>,
      document.body
    );
};

export default KanbanBoard;
