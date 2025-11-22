import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn || !user) {
    return (
      <div className="p-4 border rounded bg-red-100 text-red-700">
        <h2>You are not logged in!</h2>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

      <div className="space-y-3">
        <div className="p-3 border rounded">
          <strong>Name:</strong> {user.username}
        </div>

        <div className="p-3 border rounded">
          <strong>Email:</strong> {user.email}
        </div>

        {user.phone && (
          <div className="p-3 border rounded">
            <strong>Phone:</strong> {user.phone}
          </div>
        )}

        {user.address && (
          <div className="p-3 border rounded">
            <strong>Address:</strong> {user.address}
          </div>
        )}

        <div className="p-3 border rounded bg-gray-100 text-gray-700">
          <strong>User ID:</strong> {user._id || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default Profile;
