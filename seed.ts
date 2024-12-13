import User from "./models/User";
import { connectToDatabase } from "@/lib/dbConnect";

const users = [
  { name: "Asep", username: "asep", preferred_timezone: "Asia/Jakarta" },
  { name: "Agus", username: "agus", preferred_timezone: "Asia/Jayapura" },
  { name: "Ujang", username: "ujang", preferred_timezone: "Pacific/Auckland" },
];

const seedDatabase = async () => {
  try {
    await connectToDatabase()
    console.log("Connected to MongoDB");

    const existingUsers = await User.find({});

    if (existingUsers.length === 0) {
      console.log("No users found, seeding database...");

      await User.insertMany(users);
      console.log("Database seeded successfully");
    } else {
      console.log("Users already exist, skipping seeding.");
    }

  } catch (error) {
    console.error("Failed to seed database:", error);
  }
};

export default seedDatabase;
