"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IAppointment } from "@/models/Appointment";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch appointments when the component mounts
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments");
        const data = await response.json();

        if (response.ok) {
          setAppointments(data.appointments);
        } else {
          setError(data.message || "Failed to fetch appointments");
        }
      } catch (err) {
        setError("An error occurred while fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const formatDateTime = (date: string | Date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading appointments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => router.push("/")}
        className="mb-6 bg-black text-white px-4 py-2 rounded hover:bg-[#383838] transition duration-200"
      >
        Back to Home
      </button>

      <h1 className="text-3xl font-semibold mb-6 text-center">Your Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center text-lg">No appointments found.</div>
      ) : (
        <ul className="space-y-6">
          {appointments.map((appointment) => (
            <li
              // @ts-ignore
              key={appointment._id}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-200 ease-in-out"
            >
              <h2 className="text-xl font-semibold">{appointment.title.toString()}</h2>
              <p className="text-sm text-gray-600">
                {formatDateTime(appointment.start)} - {formatDateTime(appointment.end)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsPage;
