
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
      className={`
        relative flex min-h-[164px] min-w-0
        flex-col items-center justify-center
        rounded-3xl border-4 border-[#FFE7C2]
        p-3 transition-colors duration-200 sm:p-4
        ${
          isOver
            ? "bg-[#FFE7C2]/20"
            : "bg-transparent"
        }
      `}
      aria-label={`Posição ${index + 1} da timeline`}
    >
      {children ? (
        <div className="flex w-full min-w-0 justify-center pt-3">
          {children}
        </div>
      ) : (
        <p className="max-w-[180px] text-center text-base font-bold text-[#FFE7C2] sm:text-lg">
          Arraste o card até aqui
        </p>
      )}
    </div>
  );
};
