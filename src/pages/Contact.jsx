import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/contact-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      Swal.fire("Message Sent", "Thank you for contacting us!", "success");
      reset();
    } else {
      Swal.fire("Error", "Failed to send message.", "error");
    }
  };

  return (
   <div className="bg-white dark:bg-base-200">
     <div className="max-w-4xl mx-auto p-6 py-25 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">📫 Contact Us</h2>

      <div className="mb-8 space-y-5">
        <p><strong>📍 Address:</strong> 123 Corporate Street, Dhaka, Bangladesh</p>
        <p><strong>📞 Phone:</strong> +880 1234 567890</p>
        <p><strong>✉ Email:</strong> support@company.com</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Your Email</label>
          <input
            type="email"
            className="w-full p-3 border-2 rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            className="w-full p-3 border-2 rounded-md h-32 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">Message is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-green-600 dark:bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
   </div>
  );
};

export default ContactUs;
