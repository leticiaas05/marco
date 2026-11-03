
import type { Evento } from "../types/events";
import dados from "./events.json";

const eventos: Evento[] = dados.map((evento) => ({
  ...evento,
  phase: evento.phase as Evento["phase"],
}));

export default eventos;
