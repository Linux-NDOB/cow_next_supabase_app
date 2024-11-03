import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { eq } from "drizzle-orm";
import { profiles as t } from "@/app/db/schema";
import {
  ClientId,
  ClientProfile,
  ClientRequest,
  ServerResponse,
} from "./types";

const userExists = async (clientId: string): Promise<Boolean> => {
  const user = await db.select().from(t).where(eq(t.user_id, clientId));
  return user.length > 0;
};

const getProfile = async (userId: ClientId): Promise<ServerResponse> => {
  const userProfile: ClientProfile = await db
    .select()
    .from(t)
    .where(eq(t.user_id, userId));

  return { status: 200, user: userProfile };
};

export const POST = async (request: NextRequest): Promise<ServerResponse> => {
  const body: ClientRequest = await request.json();
  const { clientId }: { clientId: string } = body;
  const user = await userExists(clientId);

  if (!user) {
    return NextResponse.json({ status: 404 });
  }

  const userProfile: ServerResponse = await getProfile(clientId);

  return NextResponse.json(userProfile);
};
