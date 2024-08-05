// utils/cartUtils.js

export async function addProductToCart(productId, quantity) {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
  
      const data = await response.json();
      console.log('Cart:', data);
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }
  
  export async function removeFromCart(productId) {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }
  
      const data = await response.json();
      console.log('Cart:', data);
      return data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }
  