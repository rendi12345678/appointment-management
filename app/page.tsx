"use client";

import Link from "next/link";

export default function Home() {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (result.status === "success") {
        alert(result.message);
        window.location.href = "/login";
      } else {
        alert("Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="grid place-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 items-center">
        {/* Create Appointment Button */}
        <Link
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="/create-appointment"
        >
          Create Appointment
        </Link>

        {/* See Appointments Button */}
        <Link
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="/appointments"
        >
          See Appointments
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Logout
        </button>
      </main>
    </div>
  );
}
