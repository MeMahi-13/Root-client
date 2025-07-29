// Register.jsx
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import Social from "./Social";

export default function Register() {
  const { register, handleSubmit, getValues, reset, formState: { errors, isSubmitting } } = useForm();
  const { createUser, updateUserProfile } = UseAuth();
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile({ displayName: data.name, photoURL: profilePic });
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: data.name,
        email: data.email,
        role: data.role,
        designation: data.designation,
        bank_account_no: data.bank_account_no,
        salary: parseFloat(data.salary),
        photo: profilePic,
        isVerified: false,
        isFired: false,
      });

      await Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created.",
        icon: "success",
        confirmButtonText: "Continue",
      });

      reset();
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      await Swal.fire({
        title: "Registration Failed",
        text: error.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );
      const url = res.data?.data?.url;
      if (url) setProfilePic(url);
      else await Swal.fire({ title: "Upload Failed", text: "Could not upload image.", icon: "error", confirmButtonText: "OK" });
    } catch (error) {
      console.error("Upload error:", error);
      await Swal.fire({ title: "Upload Error", text: "An error occurred during upload.", icon: "error", confirmButtonText: "OK" });
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://i.ibb.co/xqj5qHTd/pexels-jplenio-1105391.jpg')] bg-cover flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 py-5">Register Yourself</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
              })}
              className="input input-bordered w-full"
              placeholder="Your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Profile Photo */}
          <div className="md:col-span-2">
            <div className="md:col-span-2">
  <label className="block mb-1 text-gray-700">Profile Photo</label>

  <label
    htmlFor="profilePicInput"
    className="cursor-pointer inline-block px-4 py-2 bg-amber-400 text-white rounded-md hover:bg-amber-500 transition"
  >
    Choose Profile Photo
  </label>
  <input
    id="profilePicInput"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />

  {profilePic && (
    <img
      src={profilePic}
      alt="Profile Preview"
      className="mt-3 w-24 h-24 rounded-full object-cover border-2 border-amber-400"
    />
  )}
</div>

           
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-gray-700">Role</label>
            <select {...register("role", { required: "Role is required" })} className="select select-bordered w-full">
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Designation */}
          <div>
            <label className="block mb-1 text-gray-700">Designation</label>
            <input
              type="text"
              {...register("designation", { required: "Designation is required" })}
              className="input input-bordered w-full"
              placeholder="e.g. Digital Marketer"
            />
            {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
          </div>

          {/* Bank Account */}
          <div>
            <label className="block mb-1 text-gray-700">Bank Account No.</label>
            <input
              type="text"
              {...register("bank_account_no", { required: "Bank account number is required" })}
              className="input input-bordered w-full"
              placeholder="e.g. 1234567890"
            />
            {errors.bank_account_no && <p className="text-red-500 text-sm">{errors.bank_account_no.message}</p>}
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-1 text-gray-700">Salary</label>
            <input
              type="number"
              {...register("salary", { required: "Salary is required" })}
              className="input input-bordered w-full"
              placeholder="e.g. 25000"
            />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                validate: {
                  minLength: v => v.length >= 6 || "Minimum 6 characters",
                  hasUpperCase: v => /[A-Z]/.test(v) || "Must contain uppercase letter",
                  hasSpecialChar: v => /[^A-Za-z0-9]/.test(v) || "Must contain special character",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirm", {
                required: "Confirm your password",
                validate: value => value === getValues("password") || "Passwords do not match",
              })}
              className="input input-bordered w-full"
              placeholder="Confirm Password"
            />
            {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm.message}</p>}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full cursor-pointer hover:shadow-amber-900 hover:shadow-md p-3 rounded-full bg-amber-400 mt-6 text-white">
          {isSubmitting ? "Registering…" : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-600 underline">Login here</a>
        </p>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-3  text-gray-500">Or continue with</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <Social />
      </form>
    </div>
  );
}
