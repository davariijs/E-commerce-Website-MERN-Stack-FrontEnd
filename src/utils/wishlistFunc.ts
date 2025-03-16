interface TWishlist {
  uid: string | null;
  title: string,
  image: string,
  price: string | number,
  pathname: string,
}

export const handleAddWishlist = async ({title, image, price, pathname, uid}:TWishlist) => {
    
    try {
      let result = await fetch(`${process.env.REACT_APP_URL_API}/api/add-wishlist`, {
        method: 'post',
        body: JSON.stringify({ title, image, price, pathname, uid }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      result = await result.json();
      console.warn(result);
      if (result) {
        console.log('Data saved successfully');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
};



  export const InfoAccountFunc = async (uid:string | null) => {
    try {
      const result = await fetch(`${process.env.REACT_APP_URL_API}/api/info-account/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  

      const response = await result.json();
  
      if (result.ok) {
        console.log('Data fetched successfully:', response); 
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
        console.log('Data fetched successfully:', response); 
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



