import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth"; // adjust path as needed

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = UseAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!data.email || !data.password) {
      return Swal.fire("Error", "Please enter both email and password", "error");
    }

    try {
      await signIn(data.email, data.password);
      Swal.fire("Login Successful", "Welcome back!", "success");
      navigate("/");
    } catch (error) {
      console.error("Firebase login error:", error);
      let message = "Login failed!";

      switch (error.code) {
        case "auth/user-not-found":
          message = "User not found!";
          break;
        case "auth/wrong-password":
          message = "Wrong password!";
          break;
        case "auth/invalid-email":
          message = "Invalid email format!";
          break;
        case "auth/too-many-requests":
          message = "Too many login attempts. Please try again later.";
          break;
        default:
          message = error.message || message;
      }

      Swal.fire("Error", message, "error");
    }
  };

  return (
    <div
      className="
        min-h-screen bg-[url('https://i.ibb.co/xqj5qHTd/pexels-jplenio-1105391.jpg')]
        bg-cover bg-center flex items-center justify-center
      "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login Now</h1>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "At least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot Password (optional) */}
        <div className="text-right mb-4">
          <a className="text-blue-600 hover:underline text-sm cursor-pointer">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-neutral w-full py-2">
          Login
        </button>
         {/* ✅ Register Link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
      </form>
    </div>
  );
};

export default Login;
