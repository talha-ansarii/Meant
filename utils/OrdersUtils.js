

export const getAllOrders = async () => {
    try {
      const response = await fetch('/api/get-orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
  
      const orders = await response.json();
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  export const getOrderByRazorpayPaymentId = async (razorpayPaymentId) => {
    try {
      const response = await fetch(`/api/get-order-by-payment-id?razorpay_payment_id=${razorpayPaymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }
      // console.log(response)
  
      const order = await response.json();
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }
  
  