import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db/index";
import { cows } from "../../../db/schema";
import { eq } from "drizzle-orm";

interface Params {
  id: string;
}
export function GET(request: Request, { params }: { params: Params }) {
  const content = request.body;
  const user_id = params.id;
  console.log(content);
}

