import jsonServerInstance from '../api/jsonInstance';

interface LoginResponse {
  id: string;
  email: string;
  role: 'cliente' | 'alcaldía';
  token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await jsonServerInstance.post('/login', { email, password });
    return response.data as LoginResponse;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};