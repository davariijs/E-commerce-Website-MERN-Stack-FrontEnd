import * as authService from '../src/services/authService';
import { auth } from '../src/firebase/firebase';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('../src/firebase/firebase', () => ({
  auth: {
    currentUser: null
  }
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset fetch mock
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({})
    });
    
    // Create proper jest mock functions for localStorage
    const getItemMock = jest.fn();
    const setItemMock = jest.fn();
    const removeItemMock = jest.fn();
    
    // Mock localStorage with jest mock functions
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: getItemMock,
        setItem: setItemMock,
        removeItem: removeItemMock,
        clear: jest.fn(),
        length: 0,
        key: jest.fn()
      },
      writable: true
    });
  });

  describe('getJwtToken', () => {
    it('should return null if no current user', async () => {
      // Directly set currentUser to null
      Object.defineProperty(auth, 'currentUser', {
        value: null,
        writable: true
      });
      
      const result = await authService.getJwtToken();
      expect(result).toBeNull();
    });

    it('should fetch and return a JWT token when user is logged in', async () => {
      // Setup mock
      const mockIdToken = 'firebase-id-token';
      const mockJwtToken = 'jwt-token';
      
      // Directly set currentUser
      Object.defineProperty(auth, 'currentUser', {
        value: {
          getIdToken: jest.fn().mockResolvedValue(mockIdToken)
        },
        writable: true
      });
      
      // Mock fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ token: mockJwtToken })
      });

      const result = await authService.getJwtToken();

      expect(auth.currentUser?.getIdToken).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_URL_API}/api/auth/token`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ firebaseToken: mockIdToken })
        })
      );
      expect(localStorage.setItem).toHaveBeenCalledWith('jwtToken', mockJwtToken);
      expect(result).toBe(mockJwtToken);
    });

    it('should handle API errors', async () => {
      const mockIdToken = 'firebase-id-token';
      
      // Directly set currentUser
      Object.defineProperty(auth, 'currentUser', {
        value: {
          getIdToken: jest.fn().mockResolvedValue(mockIdToken)
        },
        writable: true
      });
      
      // Mock fetch response for error
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      const consoleSpy = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
        
      const result = await authService.getJwtToken();

      expect(consoleSpy).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('authenticatedFetch', () => {
    it('should add authorization header with existing token', async () => {
      const mockToken = 'existing-jwt-token';
      const mockUrl = 'https://api.example.com/data';
      const mockOptions = { method: 'GET' };
      
      // Set up localStorage.getItem to return the token
      (localStorage.getItem as jest.Mock).mockReturnValue(mockToken);
      
      // Mock fetch to return success
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        ok: true
      });

      // Mock getJwtToken to never be called (should use localStorage token)
      const getJwtTokenSpy = jest.spyOn(authService, 'getJwtToken')
        .mockImplementation(() => {
          throw new Error('getJwtToken should not be called in this test');
        });

      const result = await authService.authenticatedFetch(mockUrl, mockOptions);

      expect(localStorage.getItem).toHaveBeenCalledWith('jwtToken');
      expect(getJwtTokenSpy).not.toHaveBeenCalled();
      
      expect(global.fetch).toHaveBeenCalledWith(
        mockUrl,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${mockToken}`
          }
        })
      );
      expect(result.ok).toBe(true);
    });

    it('should get a new token if none exists', async () => {
      const mockNewToken = 'new-jwt-token';
      const mockUrl = 'https://api.example.com/data';
      const mockOptions = { method: 'GET' };
      
      // Mock no token in localStorage initially
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      
      // Mock getJwtToken to return a token
      jest.spyOn(authService, 'getJwtToken')
        .mockResolvedValueOnce(mockNewToken);
      
      // Mock fetch to return success
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        ok: true
      });

      const result = await authService.authenticatedFetch(mockUrl, mockOptions);

      expect(authService.getJwtToken).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        mockUrl,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${mockNewToken}`
          }
        })
      );
      expect(result.ok).toBe(true);
    });

    it('should refresh token on 401 response', async () => {
      const mockExpiredToken = 'expired-token';
      const mockNewToken = 'new-token';
      const mockUrl = 'https://api.example.com/data';
      const mockOptions = { method: 'GET' };
      
      // First call returns expired token
      (localStorage.getItem as jest.Mock).mockReturnValueOnce(mockExpiredToken);
      
      // First fetch returns 401
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          status: 401, 
          ok: false 
        })
        .mockResolvedValueOnce({  // Second fetch with new token succeeds
          status: 200, 
          ok: true 
        });
      
      // Mock getJwtToken to return new token on refresh
      jest.spyOn(authService, 'getJwtToken')
        .mockResolvedValueOnce(mockNewToken);
      
      const result = await authService.authenticatedFetch(mockUrl, mockOptions);
      
      expect(localStorage.removeItem).toHaveBeenCalledWith('jwtToken');
      expect(authService.getJwtToken).toHaveBeenCalled();
      
      // Check second fetch call with new token
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenLastCalledWith(
        mockUrl,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${mockNewToken}`
          }
        })
      );
      expect(result.ok).toBe(true);
    });
    
    it('should throw error if token cannot be obtained', async () => {
      const mockUrl = 'https://api.example.com/data';
      const mockOptions = { method: 'GET' };
      
      // No token in localStorage
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      
      // getJwtToken returns null (auth failed)
      jest.spyOn(authService, 'getJwtToken')
        .mockResolvedValueOnce(null);

      await expect(authService.authenticatedFetch(mockUrl, mockOptions))
        .rejects.toThrow('Not authenticated');
      
      expect(toast.error).toHaveBeenCalledWith('Authentication required. Please log in.');
      expect(localStorage.setItem).toHaveBeenCalledWith('authRedirect', 'true');
    });
  });

  describe('verifyJwtToken', () => {
    it('should return false if no token exists', async () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
        
      const consoleSpy = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      
      const result = await authService.verifyJwtToken();
      
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith('No JWT token found');
    });

    it('should return true when token is successfully verified', async () => {
      const mockToken = 'valid-jwt-token';
      (localStorage.getItem as jest.Mock).mockReturnValue(mockToken);
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });
      
      const result = await authService.verifyJwtToken();
      
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_URL_API}/api/auth/verify`,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${mockToken}`
          }
        })
      );
      expect(result).toBe(true);
    });
    
    it('should return false when verification fails', async () => {
      const mockToken = 'invalid-token';
      (localStorage.getItem as jest.Mock).mockReturnValue(mockToken);
      
      // Mock failed verification response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false
      });
      
      const consoleSpy = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      
      const result = await authService.verifyJwtToken();
      
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith('JWT token verification failed');
    });
  });
});