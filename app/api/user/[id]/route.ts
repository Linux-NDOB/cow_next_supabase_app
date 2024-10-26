import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db/index";
import { profiles } from "../../../db/schema";
import { eq } from "drizzle-orm";

interface Params {
    id: string;
}

export async function GET(request: NextRequest, { params } : { params: Params}) {
    const user_id = params.id;

    const user = await db.select().from(profiles).where(eq(profiles.user_id, user_id));

    return NextResponse.json({ message: user[0] });
}

interface ProfileRequest {
  user_nit: string;
  user_name: string;
  user_lastname: string;
  date_of_birth: string;
  phone_number: string;
}

export async function PUT(request: ProfileRequest, { params } : { params: Params}){
    const user_id = params.id;

    const insert = await db.update(profiles).set(request).where(eq(profiles.user_id, user_id));

    return NextResponse.json({ message: "updated"});
}

export async function DELETE(request: Request, { params }: { params: Params}){
    const user_id = params.id;
    
    const delete_user = await db.delete(profiles).where(eq(profiles.user_id, user_id));

    return NextResponse.json({message: "Deleted"});
}
