export async function addProductToWishlist(productId) {
  try {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add product to wishlist");
    }

    return await response.json(); // Return the updated wishlist
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return null;
  }
}

// Function to remove a product from the wishlist
export async function removeProductFromWishlist(productId) {
  try {
    const response = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error("Failed to remove product from wishlist");
    }

    return await response.json(); // Return the updated wishlist
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    return null;
  }
}

export async function getWishlistProducts() {
  try {
    const response = await fetch("/api/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wishlist products");
    }

    return await response.json(); // Return the list of products
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    return null;
  }
}
