// src/services/authService.ts
import { auth } from '../firebase/firebase';

// Get Firebase token and exchange it for your custom JWT
export const getJwtToken = async (): Promise<string | null> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    
    const firebaseToken = await currentUser.getIdToken();

    const response = await fetch(`${process.env.REACT_APP_URL_API}/api/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firebaseToken }),
    });
    
    if (!response.ok) throw new Error('Failed to get JWT token');
    
    const data = await response.json();
    localStorage.setItem('jwtToken', data.token);
    return data.token;
  } catch (error) {
    console.error('Error getting JWT token:', error);
    return null;
  }
};

// Create authenticated API request function
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('jwtToken');
  
  if (!token) {
    // Try to get a new token if not found
    const newToken = await getJwtToken();
    if (!newToken) throw new Error('Not authenticated');
  }
  
  const authenticatedOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  };
  
  return fetch(url, authenticatedOptions);
};


// verify the JWT token
export const verifyJwtToken = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        console.error("No JWT token found");
        return false;
      }
      
      // Call your verification endpoint
      const response = await fetch(`${process.env.REACT_APP_URL_API}/api/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        console.log("JWT token verified successfully");
        return true;
      } else {
        console.error("JWT token verification failed");
        return false;
      }
    } catch (error) {
      console.error("Error verifying JWT token:", error);
      return false;
    }
  };