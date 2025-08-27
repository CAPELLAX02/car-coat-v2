import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snapshot = await db.ref("kodlar").once("value");
    return NextResponse.json(snapshot.val() || {});
  } catch (err) {
    console.error("Firebase error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
