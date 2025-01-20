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


