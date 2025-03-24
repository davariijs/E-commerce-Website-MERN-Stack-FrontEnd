import { toast } from "react-toastify";
import { addWishlistItem } from "src/redux/wishLists/wishlistSlice";
import { authenticatedFetch } from "src/services/authService";
import { store } from "src/store";

interface TWishlist {
  uid: string | null;
  title: string,
  image: string,
  price: string | number,
  pathname: string,
}

export const handleAddWishlist = async ({title, image, price, pathname, uid}: TWishlist) => {
  try {
    if (!uid) {
      toast.error('User is not logged in');
      return;
    }
    
    const response = await authenticatedFetch(
      `${process.env.REACT_APP_URL_API}/api/wishlist`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, image, price, pathname, uid }),
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to add item to wishlist');
    }
    
    const result = await response.json();
    
    store.dispatch(addWishlistItem(result));
    
    return result;
  } catch (error) {
    console.error('Error saving to wishlist:', error);
    toast.error('Failed to add to wishlist');
    throw error;
  }
};



  export const InfoAccountFunc = async (uid:string | null) => {
    try {
      if (!uid) {
        toast.error('User is not logged in');
        return;
      }
      
      const result = await authenticatedFetch(`${process.env.REACT_APP_URL_API}/api/info-account/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await result.json();
  
      if (result.ok) {
        return response;
      } else {
        console.error('Error fetching data:', response);
        throw new Error(response.message || 'Failed to fetch data'); 
      }
    } catch (error:any) {
      console.error('Error fetching data:', error.message); 
      throw error;
    }
  };

  export const OrderFunc = async (uid:string | null) => {
    try {
      const result = await fetch(`${process.env.REACT_APP_URL_API}/api/check-out/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  

      const response = await result.json();
  
      if (result.ok) {
        return response;
      } else {
        console.error('Error fetching data:', response); 
        throw new Error(response.message || 'Failed to fetch data'); 
      }
    } catch (error:any) {
      console.error('Error fetching data:', error.message); 
      throw error;
    }
  };



