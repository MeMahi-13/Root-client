import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import Social from "./Social";

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { createUser, updateUserProfile } = UseAuth();
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Step 1: Create Firebase user
      const result = await createUser(data.email, data.password);
      const createdUser = result.user;

      // Step 2: Update profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });

      // Step 3: Save to MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        role: data.role,
        designation: data.designation,
        bank_account_no: data.bank_account_no,
        salary: parseFloat(data.salary),
        photo: profilePic,
        isVerified: false,
        isFired: false,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

      alert("Registration successful!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message || "Something went wrong");
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", image);
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const res = await axios.post(imageUploadUrl, formData);

      if (res.data?.data?.url) {
        setProfilePic(res.data.data.url);
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload error");
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://i.ibb.co/xqj5qHTd/pexels-jplenio-1105391.jpg')] bg-cover bg-center flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className="input input-bordered w-full"
            placeholder="Your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Profile Photo</label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="input w-full"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Designation</label>
          <input
            type="text"
            {...register("designation", { required: "Designation is required" })}
            className="input input-bordered w-full"
            placeholder="e.g. Digital Marketer"
          />
          {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
        </div>

        {/* Bank Account */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Bank Account Number</label>
          <input
            type="text"
            {...register("bank_account_no", { required: "Bank account number is required" })}
            className="input input-bordered w-full"
            placeholder="e.g. 1234567890"
          />
          {errors.bank_account_no && <p className="text-red-500 text-sm">{errors.bank_account_no.message}</p>}
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Salary</label>
          <input
            type="number"
            {...register("salary", { required: "Salary is required" })}
            className="input input-bordered w-full"
            placeholder="e.g. 25000"
          />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              validate: {
                minLength: (v) =>
                  v.length >= 6 || "Minimum 6 characters",
                hasUpperCase: (v) =>
                  /[A-Z]/.test(v) || "Must contain uppercase letter",
                hasSpecialChar: (v) =>
                  /[^A-Za-z0-9]/.test(v) || "Must contain special character",
              },
            })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("confirm", {
              required: "Confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            className="input input-bordered w-full"
            placeholder="Confirm Password"
          />
          {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full bg-amber-400"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login here
          </a>
        </p>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500">Or continue with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <Social />
      </form>
    </div>
  );
};

export default Register;
