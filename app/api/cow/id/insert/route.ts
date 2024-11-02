import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/app/db/index";
import { cows as t } from "@/app/db/schema";

type CowData = {
  user_id: string;
  cow_name: string;
  cow_code: string;
  cow_age: number;
  cow_weight: number;
  cow_weight_date: string;
  cow_breed: string;
};

const insertCow = async (cowData: CowData) => {
  let isInserted = false;

  try {
    await db.insert(t).values(cowData);
    return (isInserted = true);
  } catch (error) {
    console.log(error);
    return isInserted;
  }
};

export async function POST(request: NextRequest) {
  const content = await request.json();

  const isInserted = await insertCow(content);

  if(!isInserted){
    return NextResponse.json({ success: "false", error: "error" });
  }
  return NextResponse.json({ Message: content });
}
