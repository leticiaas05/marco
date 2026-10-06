interface EventCardProps{
    title: string;
    description: string;
    image: string;
}

export function EventCard({title, description, image}: EventCardProps){
    return(
        <article className="w-full max-w-xs overflow-hidden rounded-2xl bg-historical-card-bg text-historical-card-text">
            <img src={image} className="h-24 w-full object-cover"/>
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