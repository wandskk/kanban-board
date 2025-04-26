import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";

type DragEvent = DragEndEvent | DragOverEvent;

interface ExtractDragResult {
    active: DragEvent["active"];
    over: DragEvent["over"];
    activeId: string | number;
    overId: string | number;
}

export function extractDragInfo(event: DragEvent): ExtractDragResult | null {
    const { active, over } = event;

    if (!over) return null;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return null;

    return {
        active,
        over,
        activeId,
        overId,
    };
}
