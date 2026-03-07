import { CreateJobApplicationUseCase } from '@core/application/use-cases/jobs/create-job-application.use-case';
import { FetchJobApplicationRepository } from '@infrastructure/adapters/job-application/fetch-job-application.repository';
import { useState } from 'react';
import type { CreateJobApplication } from '@core/domain/entities/job-application.entity';

export const CreateJobForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState<CreateJobApplication>({
    company: '',
    position: '',
    status: 'PENDING',
    url: '',
    salaryRange: '',
    notes: '',
    userId: 'mock-user-id', // TODO: Get from auth context
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const repo = new FetchJobApplicationRepository();
    const useCase = new CreateJobApplicationUseCase(repo);
    try {
      await useCase.execute(formData);
      onSuccess();
      window.location.reload();
    } catch {
      alert('Error al crear la aplicación');
    }
  };

  const inputStyles =
    'w-full px-5 py-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-white placeholder-slate-600 outline-none focus:border-nebula-primary/50 focus:bg-white/[0.05] transition-all duration-300';
  const labelStyles =
    'block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className={labelStyles}>
            Empresa
          </label>
          <input
            id="company"
            name="company"
            required
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className={inputStyles}
            placeholder="Google, Vercel, Stripe..."
          />
        </div>
        <div>
          <label htmlFor="position" className={labelStyles}>
            Puesto
          </label>
          <input
            id="position"
            name="position"
            required
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            className={inputStyles}
            placeholder="Staff Frontend Engineer"
          />
        </div>
      </div>

      <div>
        <label htmlFor="url" className={labelStyles}>
          Enlace de la Oferta
        </label>
        <input
          id="url"
          type="url"
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className={inputStyles}
          placeholder="https://linkedin.com/jobs/..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="status" className={labelStyles}>
            Estado
          </label>
          <div className="relative">
            <select
              id="status"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as CreateJobApplication['status'],
                })
              }
              className={`${inputStyles} appearance-none cursor-pointer`}
            >
              <option value="PENDING">Pendiente</option>
              <option value="APPLIED">Enviada</option>
              <option value="INTERVIEWING">Entrevistado</option>
              <option value="OFFERED">Oferta</option>
              <option value="REJECTED">Rechazada</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              ↓
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="salaryRange" className={labelStyles}>
            Expectativa Salarial
          </label>
          <input
            id="salaryRange"
            onChange={(e) =>
              setFormData({ ...formData, salaryRange: e.target.value })
            }
            className={inputStyles}
            placeholder="Ej: 60k - 80k €"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-5 mt-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white bg-gradient-to-r from-nebula-primary to-nebula-secondary shadow-[0_10px_40px_-10px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_50px_-10px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
      >
        Añadir Aplicación
      </button>
    </form>
  );
};
