import React from "react";

import { Column as ColumnType } from "@/types/column";
import { LuTrash2 } from "react-icons/lu";
import { Id } from "@/types/id";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createDivWrapper } from "@/helpers/createDivWrapper";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

interface Props {
  column: ColumnType;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn, updateColumn } = props;
  const [editMode, setEditMode] = React.useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <ColumnDragging
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-40 border-2 border-rose-500"
      />
    );

  return (
    <Column
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <ColumnHeader
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rouded-md rounded-b-none p-3 font-bold border-columnBackgroundColor  border-4 flex items-center justify-between"
      >
        <ColumnHeaderContent className="flex gap-2">
          <ColumnHeaderCounter className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </ColumnHeaderCounter>
          <ColumnHeaderTitle>
            {!editMode && column.title}
            {editMode && (
              <Input
                className="bg-black focus:border-rose-500 border rounded outline-none px-2"
                value={column.title}
                onChange={({ target }) => updateColumn(column.id, target.value)}
                autoFocus
                onBlur={() => setEditMode(false)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            )}
          </ColumnHeaderTitle>
        </ColumnHeaderContent>

        <ColumnHeaderActions>
          <Button
            className="hover:bg-columnBackgroundColor rounded px-1 py-2 cursor-pointer"
            onClick={() => deleteColumn(column.id)}
          >
            <LuTrash2 className="stroke-gray-500 hover:stroke-white" />
          </Button>
        </ColumnHeaderActions>
      </ColumnHeader>

      <ColumnContent className="flex flex-grow">Content</ColumnContent>

      <ColumnFooter>Footer</ColumnFooter>
    </Column>
  );
};

const Column = createDivWrapper("Column");
const ColumnDragging = createDivWrapper("ColumnDragging");
const ColumnHeader = createDivWrapper("ColumnHeader");
const ColumnHeaderContent = createDivWrapper("ColumnHeaderContent");
const ColumnHeaderCounter = createDivWrapper("ColumnHeaderCounter");
const ColumnHeaderTitle = createDivWrapper("ColumnHeaderTitle");
const ColumnHeaderActions = createDivWrapper("ColumnHeaderActions");
const ColumnContent = createDivWrapper("ColumnContent");
const ColumnFooter = createDivWrapper("ColumnFooter");

export default ColumnContainer;
