import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../features/auth/authSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function AuthPage({ mode }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();
  const { user, loading, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (user) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    const action = mode === 'login' ? login : register;
    const r = await dispatch(action(form));
    if (!r.error) nav(loc.state?.from?.pathname || '/');
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1>MediaVault</h1>
        <p>{mode === 'login' ? 'Sign in to your library' : 'Create your secure media library'}</p>
        {mode === 'register' && (
          <input
            placeholder="Name"
            required
            minLength="2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password (8+ chars)"
          required
          minLength="8"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <div className="error">{error}</div>}
        <button disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Register'}</button>
        <a href={mode === 'login' ? '/register' : '/login'}>
          {mode === 'login' ? 'Create an account' : 'Already have an account?'}
        </a>
      </form>
    </main>
  );
}

