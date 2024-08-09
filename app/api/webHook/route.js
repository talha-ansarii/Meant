


export async function POST(request) {
    console.log("webhook called"); 
    const body = await request.json();
    console.log(body);
    return new Response(
        JSON.stringify({
          message: "Webhook received successfully",
        }),
        { status: 200 }
      );
}