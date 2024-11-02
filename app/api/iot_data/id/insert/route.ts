import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/app/db/index";

export default function POST(request: NextRequest) {
  return NextResponse.json({ Message: "On insert cow segment" });
}
