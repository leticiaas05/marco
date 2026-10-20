import React from "react";
import "./HowToPlayModal.css";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card bg-[#FFE7C2] text-[#381313]" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button" 
          className="modal-close" 
          onClick={onClose}
          aria-label="Fechar modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-extrabold mb-4 text-center">Como jogar?</h2>

        <div className="space-y-3 mb-6 text-sm sm:text-base leading-relaxed">
          <p>O jogo é dividido em três (3) fases.</p>
          <p>A cada fase você deverá construir uma linha do tempo.</p>
          <p>Arraste os cartões para a posição correta na linha do tempo e ao final você terá uma linha do tempo com 9 acontecimentos históricos.</p>
          <p className="font-semibold">
            Para obter uma maior dificuldade, evite clicar nos cards de informações extras{" "}
            <span className="inline-flex items-center gap-1 align-middle">
              (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 shrink-0"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M12 11v5m0-8h.01"
                  strokeLinecap="round"
                />
              </svg>
              ).
            </span>
          </p>
        </div>

        <div className="video-container w-full rounded-xl overflow-hidden shadow-md bg-black">
          <video 
            className="w-full h-auto max-h-[220px] object-cover" 
            controls 
            autoPlay 
            muted 
            loop
          >
            <source src="/videos/gameplay.mp4" type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>
      </div>
    </div>
  );
};