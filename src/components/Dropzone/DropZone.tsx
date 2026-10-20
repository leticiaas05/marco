import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

interface DropZoneProps {
  id: string;
  index: number;
  children?: ReactNode;
}

export const DropZone = ({
  id,
  index,
  children,
}: DropZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      data-drop-active={isOver}
      className={`
        relative flex min-h-[112px] w-full min-w-0
        flex-col items-center justify-center
        rounded-3xl border-4 border-[#FFE7C2]
        p-2 transition-colors duration-200 sm:p-3
        ${isOver ? "bg-[#FFE7C2]/20" : "bg-transparent"}
      `}
      aria-label={`Posição ${index + 1} da timeline`}
    >
      {children ? (
        <div className="flex w-full min-w-0 justify-center">
          {children}
        </div>
      ) : (
        <p className="max-w-[180px] text-center text-sm font-bold text-[#FFE7C2] sm:text-base">
          Arraste o card até aqui
        </p>
      )}
    </div>
  );
};