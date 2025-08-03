// File: /app/api/create-chat/route.ts

import { loadS3IntoPinecone } from "@/lib/db/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    const pages = await loadS3IntoPinecone(file_key);
    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Error in create-chat route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
