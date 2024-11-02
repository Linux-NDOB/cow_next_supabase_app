import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { eq } from "drizzle-orm";
import { cows as c, profiles as p } from "@/app/db/schema";


const getCowListById = async (user_id : string )  => {
    try {
        const result = await db.select().from(c).where(eq(c.user_id, user_id));
        return { success: true, cowList: result };  
    } catch (error) {
        return { success: "false", error: "no se pudo obtener el listado" };
        
    }  
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json();
  const { clientId } = body;

  const cowList = await getCowListById(clientId);

  return NextResponse.json(cowList);
};
