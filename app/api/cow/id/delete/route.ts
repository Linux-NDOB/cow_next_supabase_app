import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { eq } from "drizzle-orm";
import { cows as c, profiles as p } from "@/app/db/schema";

type ClientRequest = {
  clientId: string;
  cowId: string;
};

type ServerResponse = {
  status: number;
};

const userExists = async (clientId: string): Promise<Boolean> => {
  const user = await db.select().from(p).where(eq(p.user_id, clientId));
  return user.length > 0;
};

const cowExists = async (cowId: string): Promise<Boolean> => {
  const cow = await db.select().from(c).where(eq(c.cow_id, cowId));
  return cow.length > 0;
};

const deleteCow = async (cowId: string ): Promise<void> => {
  const cow = await db.delete(c).where(eq(c.cow_id, cowId));
};

export const DELETE = async (request: NextRequest): Promise<ServerResponse> => {
  const content: ClientRequest = await request.json();
  const { clientId, cowId } : { clientId : string, cowId : string} = content;
  const user: Boolean = await userExists(clientId);
  const cow: Boolean = await cowExists(cowId);

  if (!user){
    return NextResponse.json({ status: 404 });
  }

  if (!cow) {
    return NextResponse.json({ status: 404 });
  }

  await deleteCow(cowId);

  return NextResponse.json({ status: 200 });
};
