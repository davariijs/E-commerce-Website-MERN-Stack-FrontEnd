export const handleAddWishlist = async (title, image, price, uid) => {
    
    try {
      let result = await fetch('http://localhost:5000/add-wishlist', {
        method: 'post',
        body: JSON.stringify({ title, image, price, uid }),
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

  export const handleAddUserToMongo = async (email, name, uid) => {
    try {
      const result = await fetch('http://localhost:5000/user', {
        method: 'POST',
        body: JSON.stringify({ email, name, uid }), // Correct payload structure
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const response = await result.json();
      console.warn(response);
  
      if (result.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Error saving data:', response.error);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  export const InfoAccountFunc = async (uid) => {
    try {
      const result = await fetch(`http://localhost:5000/info-account/${uid}`, {
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
    } catch (error) {
      console.error('Error fetching data:', error.message); // Log the error message
      throw error; // Rethrow the error so the caller can handle it
    }
  };



