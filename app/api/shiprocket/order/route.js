import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const orderDetails = await req.json(); // Parse the JSON body from the request
    console.log("Received Order Details:", orderDetails);

    const token = process.env.SHIPROCKET_API_TOKEN;
    console.log("Shiprocket API Token:", token);

    if (!token) {
      console.error("API Token is not defined");
      return NextResponse.json(
        { error: "API Token not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Shiprocket Error Status:", response.status);
      console.error("Shiprocket Error Body:", errorText);
      return NextResponse.json(
        { error: "Failed to create Shiprocket order" },
        { status: 500 }
      );
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Shiprocket Order Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
