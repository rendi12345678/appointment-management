import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import { UserJwtPayload, verifyAuth } from "@/lib/auth";
import User from '@/models/User';
import { COOKIE_NAME } from "@/constanst";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    let verifiedToken: UserJwtPayload | null = null;

    verifiedToken = await verifyAuth(token as string);
    const userId = verifiedToken?._id;

    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated.' }, { status: 401 });
    }

    await connectToDatabase();

    const users = await User.find({ _id: { $ne: userId } });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Error fetching users.' }, { status: 500 });
  }
}
