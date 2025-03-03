import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Read the topic from the request body
    const { topic } = await request.json();

    // Make a request to the DeepSeek API using the secret API key
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: `Please provide a list of ten recommended online courses for learning ${topic}. 
Output the result as a JSON array, where each object has the following fields: id, title, duration, category, instructor, link.`,
          },
        ],
      }),
    });

    // Parse the DeepSeek response
    const data = await response.json();

    // Return the JSON response to the client
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.error();
  }
}
