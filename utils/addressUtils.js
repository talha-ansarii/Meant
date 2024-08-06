

export async function fetchAddresses() {
    try {
        const response = await fetch('/api/addresses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }
      
        return await response.json();
        
    } catch (error) {
        console.log(error)
        
    }
  }
  
  export async function addAddress(add) {
    try {
        const response = await fetch('/api/addresses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( add ),
        });
      
        if (!response.ok) {
          throw new Error('Failed to add address');
        }
      
        return await response.json();
        
    } catch (error) {
        console.log(error)
        
    }
  }

  export const updateAddress = async (addressId, newAddress) => {
    try {
      const response = await fetch("/api/addresses", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addressId, newAddress }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };

  

