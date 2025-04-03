import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';

// Get Firebase token and exchange it for your custom JWT
export const getJwtToken = async (): Promise<string | null> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    const firebaseToken = await currentUser.getIdToken();

    console.log('Trying to fetch JWT from:', `${process.env.REACT_APP_URL_API}/api/auth/token`);
    const response = await fetch(`${process.env.REACT_APP_URL_API}/api/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firebaseToken }),
    });
    console.log('Response status:', response.status);

    if (!response.ok) throw new Error('Failed to get JWT token');

    const data = await response.json();
    localStorage.setItem('jwtToken', data.token);
    return data.token;
  } catch (error) {
    console.error('Error getting JWT token:', error);
    return null;
  }
};

// Create authenticated API request function with token refresh

export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  let token = localStorage.getItem('jwtToken');

  if (!token) {
    token = await getJwtToken();
    if (!token) {
      toast.error('Authentication required. Please log in.');
      localStorage.setItem('authRedirect', 'true');
      throw new Error('Not authenticated');
    }
  }

  const authenticatedOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  // First attempt
  const response = await fetch(url, authenticatedOptions);

  if (response.status === 401) {
    try {
      console.log('Token expired, refreshing...');
      localStorage.removeItem('jwtToken');
      const newToken = await getJwtToken();

      if (!newToken) {
        throw new Error('Failed to refresh token');
      }
      const newAuthenticatedOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      };

      return fetch(url, newAuthenticatedOptions);
    } catch (error) {
      console.error('Token refresh failed:', error);
      toast.error('Session expired. Please log in again.');
      localStorage.setItem('authRedirect', 'true');
      throw new Error('Authentication failed. Please login again.');
    }
  }
  return response;
};

// verify the JWT token
export const verifyJwtToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('No JWT token found');
      return false;
    }

    // Call your verification endpoint
    const response = await fetch(`${process.env.REACT_APP_URL_API}/api/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log('JWT token verified successfully');
      return true;
    } else {
      console.error('JWT token verification failed');
      return false;
    }
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return false;
  }
};
