import { useEffect, useMemo } from "react";

interface EmojiRainProps {
  type: "success" | "error" | null;
  onComplete?: () => void;
}

const SUCCESS_EMOJIS = ["❤️", "👍", "👏", "🎉", "🎆", "✨", "🎊", "🌟", "🏆", "🔥", "🥳"];
const ERROR_EMOJIS = ["😥", "😨", "👎", "💔", "🧐", "🧠", "💡", "🧱"];

interface Particle {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export function EmojiRain({ type, onComplete }: EmojiRainProps) {
  // Usamos uma função inicializadora no useState para rodar Math.random de forma segura e pura apenas na montagem
  const particles = useMemo<Particle[]>(() => {
  const emojisList =
    type === "success" ? SUCCESS_EMOJIS : ERROR_EMOJIS;

  const count = type === "success" ? 30 : 18;

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: emojisList[
      Math.floor(Math.random() * emojisList.length)
    ],
    left: Math.random() * 90 + 5,
    size: Math.random() * 1.5 + 1.5,
    duration: Math.random() * 1.5 + 1.5,
    delay: Math.random() * 0.5,
  }));
}, [type]);

    useEffect(() => {
        const duracaoMaxima = Math.max(
            ...particles.map((p) => p.duration + p.delay)
        );

        const timer = setTimeout(() => {
            onComplete?.();
        }, duracaoMaxima * 1000 + 100);

        return () => clearTimeout(timer);
    }, [particles, onComplete]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 animate-float-up opacity-0 select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
