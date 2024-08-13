  "use client";

  import Image from "next/image";
  import { Toaster, toast } from "sonner";
  import React, { useEffect, useRef, useState } from "react";
  import { HoverBorderGradient } from "../ui/hover-border-gradient";
  import { useUser } from "@clerk/nextjs";
  import { useRouter } from "next/navigation";
  import { addProductToCart } from "@/utils/cartUtils";

  import {
    addProductToWishlist,
    getWishlistProducts,
    removeProductFromWishlist,
  } from "@/utils/wishlistUtils";
  import Link from "next/link";
  import LikeButton from "../likeButton/LikeButton";

  const Day = ({ products }) => {
    const [isInWishlist1, setIsInWishlist1] = useState(false);
    const [isInCart1, setIsInCart1] = useState(false);
    const { isSignedIn } = useUser();
    const [wishlistFilled, setWishlistFilled] = useState(false);

    const router = useRouter();

    const ref = useRef(null);
    const canvasref = useRef(null);

    const productName1 = "Day Dazzle Lipstick";
    const product1 = products.find((p) => p.name === productName1);

    const handleCartClick = async (e) => {
      e.stopPropagation();
    
      if (!isSignedIn) {
        return router.push("/sign-in");
      }
    
      try {
        await addProductToCart(product1.id, 1);
        toast.success("Added to cart");
    
        
    
        // Retrieve existing cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
        // Check if the product is already in the cart
        const existingCartItemIndex = cartItems.findIndex(item => item.id === product1.id);
    
        if (existingCartItemIndex !== -1) {
          // If product exists, update its quantity
          cartItems[existingCartItemIndex].quantity += 1;
        } else {
          // If product doesn't exist, add it to the cart
          const newCartItem = { id: product1.id, quantity: 1 };
          cartItems.push(newCartItem);
        }
    
        // Save the updated cart items to local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    };




    const handleWishlistClick = async (e, product1) => {
      e.stopPropagation();
      const wishlistKey = 'wishlist';
      
      // Initialize the wishlist from localStorage or an empty array
      let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    
      if (!isSignedIn) {
        if (wishlistFilled) {
          wishlist = wishlist.filter((item) => item !== product1.id);
          toast.error("Removed from wishlist");
        } else {
          if (!wishlist.includes(product1.id)) {
            wishlist.push(product1.id);
          }
          toast.success("Added to wishlist");
        }
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      } else {
        try {
          if (wishlistFilled) {
            await removeProductFromWishlist(product1.id);
            toast.error("Removed from wishlist");
          } else {
            await addProductToWishlist(product1.id);
            toast.success("Added to wishlist");
          }
    
          // Update local storage
          if (!wishlist.includes(product1.id)) {
            wishlist.push(product1.id);
          } else {
            wishlist = wishlist.filter((item) => item !== product1.id);
          }
          localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
        } catch (error) {
          console.error("Error updating wishlist in the database", error);
          toast.error("Error updating wishlist");
        }
      }
    
      setWishlistFilled(!wishlistFilled);
    };
    useEffect(() => {

      if(product1){
        const fetchWishlistProducts = async () => {
          let wishListproducts = [];
    
          if (isSignedIn) {
            // Fetch wishlist products from the database
            try {
              wishListproducts = await getWishlistProducts();
            } catch (error) {
              console.error("Error fetching wishlist products", error);
            }
          } else {
            // Fetch wishlist products from localStorage
            const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishListproducts = localWishlist.map(id => ({ productId: id }));
          }
    
          // Check if the product is in the wishlist
          const contains = wishListproducts.some(prod => prod.productId === product1.id);
          setWishlistFilled(contains);
        };
    
        fetchWishlistProducts();

      }
    }, [product1, isSignedIn]);

    

    return (
      <div className="">
        {/* <div className="w-full h-[110px] gradient1"></div> */}
        <div className="w-full overflow-hidden  ">
        <img src="/assets/images/gradientt.jpg" alt="day" className="w-full overflow-x-hidden hidden md:block mt-[-20px] lg:block mb-[-150px] lg:mb-[-230px]  object-cover" />

        </div>
        <img src="/assets/images/gradientt.jpg" alt="day" className="w-full md:hidden  lg:hidden mb-[-20px]  object-cover" />
        <Toaster position="top-right" richColors />
        <div className="w-full bg-white h-[600px] lg:h-[800px] md:h-[500px] relative overflow-hidden flex md:flex-row lg:flex-row flex-col  justify-center items-center ">
          <div
            ref={canvasref}
            className="bg-white  overflow-hidden md:w-[90%] lg:w-[80%]  md:flex-row lg:flex-row flex-col m-auto flex"
          >
            <div className="w-[90%]  h-[500px] mx-auto flex justify-center items-center pt-[60px]  md:w-[50%] lg:w-[50%] ">
              {/* <div className="w-[1257px] absolute z-0 top-[-300px] left-[-200px] h-[1180px] radial-gradient"></div> */}
              {/* <Image
                width={556}
                alt="day"
                height={556}
                src={"/assets/images/day.png"}
                className=""
              /> */}
            </div>
            <div className="w-[90%] mx-auto  md:w-[50%] lg:w-[50%] z-20 flex flex-col lg:gap-10 lg:px-16   md:pt-[80px] lg:pt-[170px]">
              <div className="">
                <Image
                  src="/HomePage/day/Day Dazzle Lipstick.svg"
                  alt="hero"
                  width={556}
                  height={75}
                  className="w-[556px] h-[75px]"
                />
              </div>
              <div className="font-poppins font-[400] mb-2 md:text-[20px] md:leading-[30px] lg:text-[26px] leading-[20px] text-black">
                Four stunning matte lipstick shades for your perfect day out!
                <br />
                Available in four new lip adapting shades.
              </div>
              {/* <div className="flex l mt-2 items-center ml-[20px]  z-[300]  gap-4">
              
                <div
                onClick={(e) => handleWishlistClick(e, product1)}
                className="relative mr-[16px]">
                <LikeButton wishlistFilled={wishlistFilled} />

                </div>
                <HoverBorderGradient
                  containerClassName=" rounded-[34px]"
                  as="button"
                  className=" bg-black text-white w-[100px] h-[30px] md:w-[130px] lg:w-[147px] md:h-[45px] lg:h-[45px] md:text-[14px] lg:text-[14px] flex items-center justify-center cursor-pointer font-poppins space-x-2 text-[10px] font-[500] leading-[18px]"
                  onClick={handleCartClick}
                  disabled={isInCart1}
                >
                  <span>ADD TO CART</span>
                </HoverBorderGradient>

                <HoverBorderGradient
                  containerClassName=" rounded-[34px]"
                  as="button"
                  className=" bg-black text-white w-[100px] h-[30px] md:w-[130px] lg:w-[147px] md:h-[45px] lg:h-[45px] flex items-center justify-center font-poppins space-x-2 text-[10px] md:text-[14px] lg:text-[14px] font-[500] leading-[18px]"
                >
                  <Link href={"/product/58"}>
                    <span>ORDER NOW</span>
                  </Link>
                </HoverBorderGradient>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="w-full h-[110px] gradient2"></div> */}
        <img src="/assets/images/gradientt2.jpg" alt="day" className="w-full  hidden md:block lg:block  mt-[-150px] lg:mt-[-200px]  object-cover" />
        <img src="/assets/images/gradientt2.jpg" alt="day" className="w-full md:hidden lg:hidden mt-[-10px]  object-cover" />

      </div>
    );
  };

  export default Day;
