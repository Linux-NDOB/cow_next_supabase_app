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
  await db.insert(t).values(cowData);
};

export async function POST(request: NextRequest) {
  const content = await request.json();

  const isInserted = await insertCow(content);
  
  return NextResponse.json({ Message: content });
}
