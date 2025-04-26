import React from "react";

import Input from "@/components/Form/Input";
import Button from "@/components/Button/Button";
import TaskCard from "@/components/TaskCard/TaskCard";
import { Id } from "@/types/id";
import { Task } from "@/types/task";
import { Column as ColumnType } from "@/types/column";
import { createDivWrapper } from "@/helpers/createDivWrapper";
import { useColumns } from "@/context/ColumnsContext";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LuCirclePlus, LuTrash2 } from "react-icons/lu";

const ColumnContainer = ({ column }: { column: ColumnType }) => {
  const [editMode, setEditMode] = React.useState(false);
  const { tasks, tasksIds } = useColumns();
  const filteredTasks = tasks.filter((task) => task.columnId === column.id);
  const tasksCounter = filteredTasks.length;

  const toggleEditMode = () => setEditMode((prev) => !prev);

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
        onClick={toggleEditMode}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rouded-md rounded-b-none p-3 font-bold border-columnBackgroundColor  border-4 flex items-center justify-between"
      >
        <ColumnHeaderContent className="flex gap-2">
          <ColumnCounter className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            {tasksCounter}
          </ColumnCounter>

          <ColumnTitle
            title={column.title}
            columnId={column.id}
            editMode={editMode}
            toggleEditMode={toggleEditMode}
          />
        </ColumnHeaderContent>

        <ColumnActions>
          <ColumnButton.DeleteColumn columnId={column.id} />
        </ColumnActions>
      </ColumnHeader>

      <ColumnContent className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          <ColumnTasksList tasks={filteredTasks} />
        </SortableContext>
      </ColumnContent>

      <ColumnFooter className="flex">
        <ColumnButton.CreateTask columnId={column.id} />
      </ColumnFooter>
    </Column>
  );
};

const Column = createDivWrapper("Column");
const ColumnDragging = createDivWrapper("ColumnDragging");
const ColumnHeader = createDivWrapper("ColumnHeader");
const ColumnHeaderContent = createDivWrapper("ColumnHeaderContent");
const ColumnCounter = createDivWrapper("ColumnCounter");
const ColumnActions = createDivWrapper("ColumnActions");
const ColumnContent = createDivWrapper("ColumnContent");
const ColumnFooter = createDivWrapper("ColumnFooter");

interface ColumnTitleProps {
  title: string;
  columnId: Id;
  editMode: boolean;
  toggleEditMode: () => void;
}

const ColumnTitle = ({
  title,
  columnId,
  editMode,
  toggleEditMode,
}: ColumnTitleProps) => {
  const { updateColumn } = useColumns();

  return !editMode ? (
    title
  ) : (
    <Input
      className="bg-black focus:border-rose-500 border rounded outline-none px-2"
      value={title}
      onChange={({ target }) => updateColumn(columnId, target.value)}
      autoFocus
      onClick={toggleEditMode}
      onBlur={toggleEditMode}
      onKeyDown={({ key }) => key == "Enter" && toggleEditMode()}
    />
  );
};

const ColumnTasksList = ({ tasks }: { tasks: Task[] }) => {
  return tasks.map((task) => <TaskCard key={task.id} task={task} />);
};

const ColumnButton = {
  DeleteColumn: ({ columnId }: { columnId: Id }) => {
    const { deleteColumn } = useColumns();

    return (
      <Button
        className="hover:bg-columnBackgroundColor rounded px-1 py-2 cursor-pointer"
        onClick={() => deleteColumn(columnId)}
      >
        <LuTrash2 className="stroke-gray-500 hover:stroke-white" />
      </Button>
    );
  },
  CreateTask: ({ columnId }: { columnId: Id }) => {
    const { createTask } = useColumns();

    return (
      <Button
        onClick={() => createTask(columnId)}
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 cursor-pointer w-100  active:bg-black"
      >
        <LuCirclePlus />
        Add task
      </Button>
    );
  },
};

export default ColumnContainer;
