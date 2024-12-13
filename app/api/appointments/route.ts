import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import { UserJwtPayload, verifyAuth } from "@/lib/auth";
import Appointment from '@/models/Appointment';
import UserAppointment from '@/models/UserAppointment';
import { COOKIE_NAME } from "@/constanst";
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    let verifiedToken: UserJwtPayload | null = null;
    const { title, startTime, endTime, invitedUsers, preferred_timezone } = await req.json();

    verifiedToken = await verifyAuth(token as string);
    const userId = verifiedToken?._id;

    if (!verifiedToken || !userId) {
      return NextResponse.json({ message: 'User not authenticated.' }, { status: 401 });
    }

    await connectToDatabase();

    const zonedStartTime = fromZonedTime(startTime, preferred_timezone);
    const zonedEndTime = fromZonedTime(endTime, preferred_timezone);

    const newAppointment = await Appointment.create({
      title,
      start: zonedStartTime,
      end: zonedEndTime,
      creator_id: userId,
    });

    if (invitedUsers && invitedUsers.length > 0) {
      await Promise.all(
        invitedUsers.map(async (invitedUserId: string) => {
          await UserAppointment.create({ userId: invitedUserId, appointmentId: newAppointment._id });
        })
      );
    }

    return NextResponse.json({ message: 'Appointment created successfully.', appointment: newAppointment }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ message: 'Error creating appointment.' }, { status: 500 });
  }
}

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

    const userAppointments = await UserAppointment.find({ userId })
      .populate('appointmentId')
      .exec();

    if (!userAppointments || userAppointments.length === 0) {
      return NextResponse.json({ message: 'No appointments found.' }, { status: 404 });
    }

    const appointments = userAppointments.map((userAppointment) => {
      const appointment: any = userAppointment.appointmentId;

      const localStartTime = toZonedTime(appointment.start, verifiedToken?.preferred_timezone);
      const localEndTime = toZonedTime(appointment.end, verifiedToken?.preferred_timezone);

      return {
        title: appointment.title,
        start: localStartTime,
        end: localEndTime,
      };
    });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ message: 'Error fetching appointments.' }, { status: 500 });
  }
}
