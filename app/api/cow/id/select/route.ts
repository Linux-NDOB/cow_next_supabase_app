import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { eq } from "drizzle-orm";
import { cows as c, profiles as p } from "@/app/db/schema";

type ClientRequest = {
  clientId: string;
};

type ServerResponse =
  | {
      status: number;
      cowList: {
        user_id: string;
        cow_name: string;
        cow_code: string;
        cow_breed: string;
        cow_age: number;
        cow_weight: number;
        cow_weight_date: string;
      }[];
    }
  | { status: number };

const userExists = async (clientId: string): Promise<Boolean> => {
  const user = await db.select().from(p).where(eq(p.user_id, clientId));
  return user.length > 0;
};

const getCowListById = async (user_id: string) : Promise<ServerResponse> => {
  const result = await db.select().from(c).where(eq(c.user_id, user_id));
  return { status: 200, cowList: result };
};

export const POST = async (request: NextRequest): Promise<ServerResponse> => {
  const body: ClientRequest = await request.json();
  const { clientId }: { clientId: string } = body;
  const user: Boolean = await userExists(clientId);

  if (!user) {
    return NextResponse.json({ status: 404 });
  }

  const cowList: ServerResponse = await getCowListById(clientId);

  return NextResponse.json(cowList);
};
