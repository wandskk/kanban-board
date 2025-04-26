import { Dispatch, SetStateAction } from "react";
import { Id } from "@/types/id";
import { Column } from "@/types/column";
import { Task } from "@/types/task";

export type ColumnsContextProps = {
    columns: Column[];
    columnsIds: Id[];
    activeColumn: Column | null;
    activeTask: Task | null;
    tasks: Task[];
    tasksIds: Id[];
    createNewColumn: () => void;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    moveColumn: (activeColumnId: Id, overColumnId: Id) => void;
    moveTask: (activeTaskId: Id, overTaskId: Id) => void;
    moveTaskToColumn: (activeTaskId: Id, overTaskId: Id) => void;
    setActiveColumn: Dispatch<SetStateAction<Column | null>>;
    setActiveTask: Dispatch<SetStateAction<Task | null>>;
    createTask: (columnId: Id) => void;
    deleteTask: (taskId: Id) => void;
    updateTask: (taskId: Id, content: string) => void;
    setColumns: Dispatch<SetStateAction<Column[] | []>>;
    setTasks: Dispatch<SetStateAction<Task[] | []>>;
};
