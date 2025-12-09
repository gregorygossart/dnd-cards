import React, { useState } from "react";
import { useDeckStore } from "@/hooks/useDeckStore";

export const AddDeckButton: React.FC = () => {
  const { addDeck } = useDeckStore();
  const [isAdding, setIsAdding] = useState(false);
  const [deckName, setDeckName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deckName.trim()) {
      addDeck(deckName.trim());
      setDeckName("");
      setIsAdding(false);
    }
  };

  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className="px-3 py-2">
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Deck name..."
          autoFocus
          className="w-full px-2 py-1 text-sm bg-slate-800 border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          onBlur={() => {
            if (!deckName.trim()) {
              setIsAdding(false);
            }
          }}
        />
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center gap-2 group hover:bg-slate-800/50 text-slate-400 hover:text-slate-300"
    >
      <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-slate-700 group-hover:bg-violet-600">
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <span className="font-medium">Add Deck</span>
    </button>
  );
};
