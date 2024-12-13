"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AppointmentCreationPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState("2024-01-01T08:00");
  const [endDateTime, setEndDateTime] = useState("2024-01-01T17:00");
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // @ts-ignore
  const handleAppointmentCreation = async (e) => {
    e.preventDefault();
    try {
      const parsedStartTime = parseTime(startDateTime);
      const parsedEndTime = parseTime(endDateTime);

      if (!isValidWorkingHour(parsedStartTime) || !isValidWorkingHour(parsedEndTime)) {
        throw new Error("Appointments must be within working hours (8:00 - 17:00)");
      }

      if (parsedStartTime >= parsedEndTime) {
        throw new Error("End time must be after start time");
      }

      const response = await axios.post("http://localhost:3000/api/appointments", {
        title,
        startTime: startDateTime,
        endTime: endDateTime,
        invitedUsers: selectedUsers,
      });

      alert("Appointment created successfully!");
    } catch (err: any) {
      setError(err.message || "Error creating appointment.");
    }
  };

  const parseTime = (dateTimeString: string) => {
    const [date, time] = dateTimeString.split("T");
    const [hours, minutes] = time.split(":");
    return parseInt(hours, 10);
  };

  const isValidWorkingHour = (time: number) => {
    return time >= 8 && time <= 17;
  };

  const handleUserSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userId = e.target.value;
    setSelectedUsers((prevSelectedUsers) =>
      e.target.checked
        ? [...prevSelectedUsers, userId]
        : prevSelectedUsers.filter((id) => id !== userId)
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Appointment</h1>

        <form onSubmit={handleAppointmentCreation}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="startDateTime" className="block text-sm font-medium text-gray-700">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endDateTime" className="block text-sm font-medium text-gray-700">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              id="endDateTime"
              name="endDateTime"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="invitedUsers" className="block text-sm font-medium text-gray-700">
              Invite Users
            </label>
            <div className="mt-2">
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`user-${user._id}`}
                      value={user._id}
                      checked={selectedUsers.includes(user._id)}
                      onChange={handleUserSelectionChange}
                      className="mr-2"
                    />
                    <label htmlFor={`user-${user._id}`} className="text-sm text-gray-700">
                      {user.name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No users available to invite</p>
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          <button
            type="submit"
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Create Appointment
          </button>
        </form>

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-gray-300 text-black rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AppointmentCreationPage;
