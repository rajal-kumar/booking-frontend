import api from './api';

export async function loginUser(email: string, password: string) {
  const response = await api.post('/api/v1/login', {
    user: { email, password },
  });

  const token = response.headers.authorization;
  if (!token) throw new Error('Token not found in response');

  return token.replace('Bearer ', '');
}
