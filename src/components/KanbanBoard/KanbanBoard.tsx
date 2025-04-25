"use client";

import React from "react";
import ColumnContainer from "@/components/Column/ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useColumns } from "@/context/ColumnsContext";
import { createDivWrapper } from "@/helpers/createDivWrapper";
import Button from "@/components/Button/Button";
import { LuCirclePlus } from "react-icons/lu";

const KanbanBoard = () => {
  const { columnsId, createNewColumn, moveColumn, setActiveColumn } =
    useColumns();

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    moveColumn(activeColumnId, overColumnId);
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
      >
        <KanbanBoardContent className="m-auto flex gap-4">
          <KanbanBoardColumns className="flex gap-4">
            <SortableContext items={columnsId}>
              <RenderKanbanBoardColumns />
            </SortableContext>
          </KanbanBoardColumns>

          <Button
            onClick={createNewColumn}
            className="flex gap-2 items-center h-[60px] w-350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2"
          >
            <LuCirclePlus />
            Add Column
          </Button>
        </KanbanBoardContent>

        <RenderKanbanBoardColumnPortal />
      </DndContext>
    </KanbanBoardContainer>
  );
};

const KanbanBoardContainer = createDivWrapper("KanbanBoardContainer");
const KanbanBoardContent = createDivWrapper("KanbanBoardContent");
const KanbanBoardColumns = createDivWrapper("KanbanBoardColumns");

const RenderKanbanBoardColumns = () => {
  const { columns, deleteColumn, updateColumn } = useColumns();

  return columns.map((col) => (
    <ColumnContainer
      key={col.id}
      column={col}
      deleteColumn={deleteColumn}
      updateColumn={updateColumn}
    />
  ));
};

const RenderKanbanBoardColumnPortal = () => {
  const { deleteColumn, updateColumn, activeColumn } = useColumns();

  if (document)
    return createPortal(
      <DragOverlay>
        {activeColumn && (
          <ColumnContainer
            column={activeColumn}
            deleteColumn={deleteColumn}
            updateColumn={updateColumn}
          />
        )}
      </DragOverlay>,
      document.body
    );
};

export default KanbanBoard;
