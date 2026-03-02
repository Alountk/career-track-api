import { RegisterUseCase } from '@core/application/use-cases/auth/register.use-case';
import { FetchAuthRepository } from '@infrastructure/adapters/auth/fetch-auth.repository';
import { useState, type FormEvent } from 'react';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const authRepo = new FetchAuthRepository();
    const registerUseCase = new RegisterUseCase(authRepo);

    try {
      // Por ahora el role es fijo como 'user' para el registro público
      await registerUseCase.execute({ ...formData, role: 'user' });
      window.location.href = '/';
    } catch (error) {
      setError('Error al crear la cuenta. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-nebula-800/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-black text-white">
          Únete a Career Track 🚀
        </h2>
        <p className="mt-2 text-slate-400">
          Crea tu cuenta para empezar a rastrear tu futuro.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && (
          <div className="p-4 text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor='name' className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-nebula-950/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-nebula-primary transition-all outline-none"
              placeholder="Juan"
            />
          </div>
          <div>
            <label htmlFor='lastName' className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1">
              Apellidos
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-nebula-950/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-nebula-primary transition-all outline-none"
              placeholder="Pérez"
            />
          </div>
        </div>

        <div>
          <label htmlFor='email' className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-nebula-950/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-nebula-primary transition-all outline-none"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor='password' className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-nebula-950/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-nebula-primary transition-all outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-4 rounded-xl text-sm font-black uppercase tracking-widest text-white bg-gradient-to-r from-nebula-primary to-nebula-secondary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-nebula-primary/25 disabled:opacity-50"
        >
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>

        <p className="text-center text-sm text-slate-400 mt-6">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            className="font-bold text-nebula-primary hover:text-white transition-colors"
          >
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </div>
  );
};
