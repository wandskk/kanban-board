import React from "react";
import Button from "@/components/Button/Button";
import Textarea from "@/components/Form/Textarea";
import { createDivWrapper } from "@/helpers/createDivWrapper";
import { useColumns } from "@/context/ColumnsContext";
import { Id } from "@/types/id";
import { Task } from "@/types/task";
import { LuTrash2 } from "react-icons/lu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task }: { task: Task }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [mouseIsOver, setMouseIsOver] = React.useState(false);
  const { id, content } = task;
  const { updateTask } = useColumns();

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <TaskCardDragging
        ref={setNodeRef}
        style={style}
        className="opacity-30 relative bg-mainBackgroundColor p-2.5 min-h-[100px] h-[100px] items-center text-left rounded-xl border-2 border-rose-500 cursor-grab"
      />
    );
  }

  if (editMode)
    return (
      <TaskCardMain
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className=" h-[100px] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
      >
        <Textarea
          className="bg-black focus:border-rose-500 border rounded outline-none px-2 h-[90px] w-full resize-none text-white focus:outline-none "
          value={content}
          onChange={({ target }) => updateTask(task.id, target.value)}
          autoFocus
          onBlur={toggleEditMode}
          placeholder="Task content here"
          onKeyDown={({ key, shiftKey }) =>
            key == "Enter" && shiftKey && toggleEditMode()
          }
        />
      </TaskCardMain>
    );

  return (
    <TaskCardContainer
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="task relative bg-mainBackgroundColor p-2.5 min-h-[100px] h-[100px] flex items-center text-left rounded-xl hover:ring-2 hover:ring-rose-500 cursor-grab"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <TaskCardMain className="h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </TaskCardMain>

      <TaskCardActions>
        <TaskCardTrashButton mouseIsOver={mouseIsOver} cardId={id} />
      </TaskCardActions>
    </TaskCardContainer>
  );
};

const TaskCardMain = createDivWrapper("TaskCardMain");
const TaskCardDragging = createDivWrapper("TaskCardDragging");
const TaskCardContainer = createDivWrapper("TaskCardContainer");
const TaskCardActions = createDivWrapper("TaskCardActions");

interface TaskCardTrashButtonProps {
  cardId: Id;
  mouseIsOver: boolean;
}

const TaskCardTrashButton = ({
  cardId,
  mouseIsOver,
}: TaskCardTrashButtonProps) => {
  const { deleteTask } = useColumns();
  return (
    mouseIsOver && (
      <Button
        onClick={() => deleteTask(cardId)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded cursor-pointer"
      >
        <LuTrash2 className="stroke-white" />
      </Button>
    )
  );
};

export default TaskCard;
