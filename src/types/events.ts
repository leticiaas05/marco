export interface Evento {
    id: string;
    phase: 1 | 2 | 3;
    title: string;
    year: number;
    description: string;
    detailedFeedback: string;
    image: string;
}