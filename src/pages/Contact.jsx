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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">📫 Contact Us</h2>

      <div className="mb-8">
        <p><strong>📍 Address:</strong> 123 Corporate Street, Dhaka, Bangladesh</p>
        <p><strong>📞 Phone:</strong> +880 1234 567890</p>
        <p><strong>✉ Email:</strong> support@company.com</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium">Your Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>

        <div>
          <label className="font-medium">Message</label>
          <textarea
            className="textarea textarea-bordered w-full h-32"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">Message is required</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
