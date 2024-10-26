import { db } from "../../db/index";
import { profiles } from "../../db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const user = await db.select().from(profiles);
    return NextResponse.json(user);
}

export async function POST(req: NextRequest){
    console.log(req);
    const { content } = await req.json();
    return NextResponse.json({ message : "hi"});
}
