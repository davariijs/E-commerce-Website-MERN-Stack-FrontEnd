interface TWishlist {
  uid: string | null;
  title: string,
  image: string,
  price: string | number,
  pathname: string,
}

export const handleAddWishlist = async ({title, image, price, pathname, uid}:TWishlist) => {
    
    try {
      let result = await fetch(`${process.env.REACT_APP_URL_API}/add-wishlist`, {
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
      const result = await fetch(`${process.env.REACT_APP_URL_API}/info-account/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Parse the response JSON
      const response = await result.json();
  
      if (result.ok) {
        console.log('Data fetched successfully:', response); // Log the fetched data
        return response; // Return the fetched data if needed
      } else {
        console.error('Error fetching data:', response); // Log the error response from the server
        throw new Error(response.message || 'Failed to fetch data'); // Throw a meaningful error
      }
    } catch (error:any) {
      console.error('Error fetching data:', error.message); // Log the error message
      throw error; // Rethrow the error so the caller can handle it
    }
  };

  export const OrderFunc = async (uid:string | null) => {
    try {
      const result = await fetch(`${process.env.REACT_APP_URL_API}/check-out/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Parse the response JSON
      const response = await result.json();
  
      if (result.ok) {
        console.log('Data fetched successfully:', response); // Log the fetched data
        return response; // Return the fetched data if needed
      } else {
        console.error('Error fetching data:', response); // Log the error response from the server
        throw new Error(response.message || 'Failed to fetch data'); // Throw a meaningful error
      }
    } catch (error:any) {
      console.error('Error fetching data:', error.message); // Log the error message
      throw error; // Rethrow the error so the caller can handle it
    }
  };



