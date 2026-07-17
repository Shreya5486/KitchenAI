import React from 'react';
import { BookOpen, Trash2, Calendar, ChefHat } from 'lucide-react';
import { Session } from '../types';
import { getRecipeImageUrl } from '../utils/recipeImage';

interface SessionSidebarProps {
  sessions: Session[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
}

export default function SessionSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
  onClearAll,
}: SessionSidebarProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm font-sans flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800">
          <BookOpen className="text-indigo-600" size={18} />
          <h3 className="font-semibold text-sm uppercase tracking-widest text-slate-500">My Recipe Book</h3>
        </div>
        {sessions.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[10px] text-slate-500 hover:text-slate-800 hover:underline cursor-pointer tracking-wider uppercase font-semibold font-mono"
          >
            Clear All
          </button>
        )}
      </div>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-slate-400 flex-grow">
          <ChefHat size={36} className="stroke-slate-300 mb-2 animate-pulse" />
          <p className="text-xs font-semibold">Your Recipe Book is empty.</p>
          <p className="text-[10px] text-slate-500 mt-1">
            Generate recipes using free-form ingredients to populate your saved database automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto max-h-[350px] lg:max-h-[500px] pr-1 flex-grow">
          {sessions.map((session) => {
            const isActive = activeSessionId === session.id;
            return (
              <div
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`group flex items-center gap-3 p-2 rounded-lg border text-left cursor-pointer transition-all ${
                  isActive
                    ? 'bg-indigo-50/75 border-indigo-200 text-slate-900 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700 hover:border-slate-200'
                }`}
              >
                {/* Recipe image right in front of the description */}
                <div className="w-10 h-10 rounded-md overflow-hidden shrink-0 bg-slate-100 border border-slate-200/50">
                  <img
                    src={getRecipeImageUrl(session.recipe.title)}
                    alt={session.recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-grow min-w-0 mr-1">
                  <h4 className="font-semibold text-xs truncate leading-snug text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {session.recipe.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1 font-mono">
                    <Calendar size={10} className="text-slate-400" />
                    <span>{formatDate(session.timestamp)}</span>
                    {session.refinements.length > 0 && (
                      <span className="bg-slate-100 text-slate-600 px-1 py-0.25 rounded text-[8px] font-semibold border border-slate-200/50">
                        {session.refinements.length} loop{session.refinements.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => onDeleteSession(session.id, e)}
                  className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-rose-600 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all"
                  title="Delete recipe"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
