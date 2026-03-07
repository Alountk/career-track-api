import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CreateJobForm } from './CreateJobForm';

export const AddJobModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  const modalContent = isOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-nebula-950/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
        role="button"
        tabIndex={0}
        aria-label="Cerrar modal"
      />

      <div className="relative w-full max-w-lg bg-nebula-800 border border-white/10 p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white">
            Nueva Aplicación 🚀
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <CreateJobForm onSuccess={() => setIsOpen(false)} />
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-nebula-primary to-nebula-secondary text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-nebula-primary/20"
      >
        + Nueva Aplicación
      </button>

      {createPortal(modalContent, document.body)}
    </>
  );
};
