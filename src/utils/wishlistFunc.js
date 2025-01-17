export const handleAddWishlist = async (title, image, price) => {
    
    try {
      let result = await fetch('http://localhost:5000/add-wishlist', {
        method: 'post',
        body: JSON.stringify({ title, image, price }),
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


