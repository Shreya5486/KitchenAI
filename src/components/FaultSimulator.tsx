import React from 'react';
import { AlertOctagon, RefreshCw, ServerCrash, Clock, ShieldCheck, Bug } from 'lucide-react';
import { SimulatedFaultType } from '../types';

interface FaultSimulatorProps {
  currentFault: SimulatedFaultType;
  onChangeFault: (fault: SimulatedFaultType) => void;
}

export default function FaultSimulator({ currentFault, onChangeFault }: FaultSimulatorProps) {
  const options: { value: SimulatedFaultType; label: string; icon: any; color: string; desc: string }[] = [
    {
      value: 'none',
      label: 'Perfect Parser (Healthy)',
      icon: ShieldCheck,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-300 hover:bg-emerald-100',
      desc: 'Standard healthy operation. The parser engine returns highly detailed recipe JSON fitting the requested schema perfectly.'
    },
    {
      value: 'malformed_json',
      label: 'Broken Syntax',
      icon: AlertOctagon,
      color: 'text-rose-700 bg-rose-50 border-rose-300 hover:bg-rose-100',
      desc: 'Simulates the parser cutting off its output or returning syntactically broken, unparseable JSON code (missing fields/brackets).'
    },
    {
      value: 'wrong_shape',
      label: 'Wrong Schema',
      icon: Bug,
      color: 'text-amber-700 bg-amber-50 border-amber-300 hover:bg-amber-100',
      desc: 'Simulates the parser engine returning perfectly valid JSON, but with a completely incorrect structure (none of our required fields exist).'
    },
    {
      value: 'timeout',
      label: 'API Latency (Timeout)',
      icon: Clock,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-300 hover:bg-indigo-100',
      desc: 'Simulates a severely delayed response (12s delay). The client-side safety timeout will abort the fetch and prompt a retry.'
    },
    {
      value: 'server_error',
      label: '500 Server Crash',
      icon: ServerCrash,
      color: 'text-slate-700 bg-slate-50 border-slate-300 hover:bg-slate-100',
      desc: 'Simulates an unexpected server exception or internal database blackout returning an immediate HTTP 500 error.'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 font-sans shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Bug className="text-indigo-600 animate-pulse" size={18} />
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Robustness Monitor & Chaos Injector
          </h3>
        </div>
        <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono font-bold">
          FAULT ENGINE STATUS: READY
        </span>
      </div>
      
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        The core of this evaluation is resilience under pressure. Use the controllers below to inject real faults into the next processing cycle, then monitor how the system handles the failure gracefully.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {options.map((opt) => {
          const IconComp = opt.icon;
          const isSelected = currentFault === opt.value;
          
          return (
            <button
              key={opt.value}
              onClick={() => onChangeFault(opt.value)}
              className={`flex flex-col text-left p-3.5 rounded-lg border text-xs transition-all cursor-pointer relative group overflow-hidden ${
                isSelected 
                  ? `${opt.color} ring-2 ring-indigo-600/10 font-medium scale-[1.01] shadow-xs` 
                  : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-800">
                <IconComp size={14} className={isSelected ? 'text-indigo-600' : 'text-slate-400'} />
                <span>{opt.label}</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                {opt.desc}
              </p>
              {isSelected && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
