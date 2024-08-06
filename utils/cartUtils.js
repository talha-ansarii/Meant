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



export async function getCartProducts() {
    try {
      const response = await fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch cart products');
      }
  
      // Parse the JSON response
      const cart = await response.json();
      return cart;
    } catch (error) {
      console.error('Error fetching cart products:', error);
      return null;
    }
  }

  export async function updateCartQuantity(productId, action) {
    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, action }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update cart quantity');
      }
  
      const updatedCart = await response.json();
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      return null;
    }
  }

  export async function getAllProducts() {
    try {
      const response = await fetch('/api/get-products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return null;
    }
  }
  