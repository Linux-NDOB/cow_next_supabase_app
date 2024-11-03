import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { profiles as t } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { ClientRequest, UpdateData } from "./types";

type ServerResponse = {
  status: number;
};

const selectUserById = async (clientId: string): Promise<Boolean> => {
  const user = await db
    .select({ userId: t.user_id })
    .from(t)
    .where(eq(t.user_id, clientId));

  return user.length > 0;
};

const updateUserProfile = async (profileData: ClientRequest): Promise<void> => {
  const { user_id, ...requestData }: { user_id: string } = profileData;

  const updateQuery = await db
    .update(t)
    .set(requestData)
    .where(eq(t.user_id, user_id));
};

export const PUT = async (request: NextRequest): Promise<ServerResponse> => {
  const content: ClientRequest = await request.json();
  const { user_id }: { user_id: string } = content;

  const isUser: Boolean = await selectUserById(user_id);

  if (!isUser) {
    return NextResponse.json({ status: 404 });
  }

  const isUpdated: void = await updateUserProfile(content);

  return NextResponse.json({ status: 200 });
};
