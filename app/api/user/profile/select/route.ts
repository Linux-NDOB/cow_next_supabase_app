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

const selectUserProfile = async (
  userId: ClientId
): Promise<ServerResponse> => {
  const userProfile: ClientProfile = await db
    .select()
    .from(t)
    .where(eq(t.user_id, userId));

  if (!userProfile || userProfile.length === 0) {
    return { success: false, error: "No data found"};
  }

  return { success: true, userProfileData : userProfile};
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const body: ClientRequest = await request.json();
  const clientId = body.clientId;

  const userProfile: ServerResponse = await selectUserProfile(clientId);

  return NextResponse.json(userProfile);
};
