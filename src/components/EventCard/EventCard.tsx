import { useDraggable } from "@dnd-kit/core";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export function EventCard({
  id,
  title,
  description,
  image,
}: EventCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-full h-60 shrink-0 overflow-hidden rounded-2xl bg-historical-card-bg text-historical-card-text shadow-md cursor-grab active:cursor-grabbing select-none touch-none ${
        isDragging
          ? "opacity-50 z-50 shadow-2xl"
          : "opacity-100"
      }`}
    >
      <img
        src={image}
        className="h-24 w-full object-cover pointer-events-none"
        alt={title}
        draggable={false}
      />

      <div className="px-4 py-2">
        <h2 className="text-center text-sm font-bold leading-tight">
          {title}
        </h2>

        <p className="mt-1 text-justify text-xs leading-snug">
          {description}
        </p>
      </div>
    </article>
  );
}