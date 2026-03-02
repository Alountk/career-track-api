import { LoginUseCase } from '@core/application/use-cases/auth/login.use-case';
import { FetchAuthRepository } from '@infrastructure/adapters/auth/fetch-auth.repository';
import { useState, type FormEvent } from 'react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const authRepo = new FetchAuthRepository();
    const loginUseCase = new LoginUseCase(authRepo);

    try {
      await loginUseCase.execute({ email, password });
      window.location.href = '/';
    } catch (error) {
      setError('Incorrect Credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-nebula-800/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-black text-white">¡Hola de nuevo! ✨</h2>
        <p className="mt-2 text-slate-400">
          Entra para gestionar tus oportunidades.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="p-4 text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-xl">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor='email' className="block text-sm font-medium text-slate-300 ml-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-nebula-950/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-nebula-primary focus:border-transparent transition-all outline-none"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor='password' className="block text-sm font-medium text-slate-300 ml-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-nebula-950/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-nebula-primary focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-nebula-primary to-nebula-secondary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-nebula-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Entrando...' : 'Iniciar Sesión'}
        </button>
        <p className="text-center text-sm text-slate-400">
          ¿No tienes cuenta?{' '}
          <a
            href="/register"
            className="font-bold text-nebula-primary hover:text-white transition-colors"
          >
            Crea una aquí
          </a>
        </p>
      </form>
    </div>
  );
};
