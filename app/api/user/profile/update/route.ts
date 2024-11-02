import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { profiles as t } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { ClientRequest } from "./types";

type Selectuser = {
  userId: string | null;
}[];

const selectUserById = async (clientId: string): Promise<Boolean> => {
  let userExists: Boolean = false;
  try {
    const user: Selectuser = await db
      .select({ userId: t.user_id })
      .from(t)
      .where(eq(t.user_id, clientId));

    const { userId }: { userId: string | null } = user[0];

    if (userId) {
      return (userExists = true);
    }
  } catch (error) {
    return userExists;
  }

  return userExists;
};

const updateUserProfile = async (
  profileData: ClientRequest,
): Promise<Boolean> => {
  const { user_id, ...requestData }: { user_id: string } = profileData;
  let transactionCompleted = false;
  try {
    const updateQuery = await db
      .update(t)
      .set(requestData)
      .where(eq(t.user_id, user_id));

    return (transactionCompleted = true);
  } catch (error) {
    return transactionCompleted;
  }
};

export const PUT = async (request: NextRequest) => {
  const content = await request.json();
  const { user_id } = content;
  console.log("user id: ", content);

  const isUser = await selectUserById(user_id);

  if (!isUser) {
    return NextResponse.json({ success: "false", error: "user not found" });
  }
  const isUpdated = updateUserProfile(content);

  if (!isUpdated) {
    return NextResponse.json({ success: "false", message: "error ocurred" });
  }

  return NextResponse.json({ success: "true", message: "updated" });
};
