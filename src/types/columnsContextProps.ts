import { Id } from "@/types/id";
import { Column } from "@/types/column";
import { Dispatch, SetStateAction } from "react";

export type ColumnsContextProps = {
    columns: Column[];
    columnsId: Id[];
    createNewColumn: () => void;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    moveColumn: (activeColumnId: Id, overColumnId: Id) => void;
    activeColumn: Column | null;
    setActiveColumn: Dispatch<SetStateAction<Column | null>>;
};
