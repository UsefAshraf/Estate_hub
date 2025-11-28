import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { updateUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";


export default function EditProfilePage() {
  const user = useSelector((state: RootState) => state.user); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState(user); // ⭐ ADDED

  const handleSave = () => {
    dispatch(updateUser(form)); // ⭐ ADDED
    navigate("/profile");       // ⭐ ADDED
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg">

      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Changes
      </button>

    </div>
  );
}
