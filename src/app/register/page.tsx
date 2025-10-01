'use client';
import { useState } from 'react';
import { signUp } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    userType: 'candidate' as 'candidate' | 'employer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F7F7', padding: '20px' }}>
      <div style={{ maxWidth: '500px', width: '100%', padding: '40px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#89CFF0' }}>Account aanmaken</h1>
        <p style={{ color: '#6B7280', marginBottom: '24px' }}>Start je reis met WeAreJobPilot AI</p>
        
        {error && (
          <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Ik ben een...</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label style={{ flex: 1, padding: '12px', border: `2px solid ${formData.userType === 'candidate' ? '#89CFF0' : '#D1D5DB'}`, borderRadius: '8px', cursor: 'pointer', textAlign: 'center', background: formData.userType === 'candidate' ? '#E0F2FE' : 'white' }}>
                <input
                  type="radio"
                  name="userType"
                  value="candidate"
                  checked={formData.userType === 'candidate'}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value as 'candidate' | 'employer' })}
                  style={{ display: 'none' }}
                />
                <span style={{ fontWeight: '600' }}>Kandidaat</span>
              </label>
              <label style={{ flex: 1, padding: '12px', border: `2px solid ${formData.userType === 'employer' ? '#89CFF0' : '#D1D5DB'}`, borderRadius: '8px', cursor: 'pointer', textAlign: 'center', background: formData.userType === 'employer' ? '#E0F2FE' : 'white' }}>
                <input
                  type="radio"
                  name="userType"
                  value="employer"
                  checked={formData.userType === 'employer'}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value as 'candidate' | 'employer' })}
                  style={{ display: 'none' }}
                />
                <span style={{ fontWeight: '600' }}>Werkgever</span>
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Volledige naam</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Wachtwoord</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '14px' }}
            />
            <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Minimaal 6 tekens</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#89CFF0', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Account aanmaken...' : 'Account aanmaken'}
          </button>
        </form>

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6B7280' }}>
          Al een account?{' '}
          <a href="/login" style={{ color: '#89CFF0', fontWeight: '600', textDecoration: 'none' }}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
