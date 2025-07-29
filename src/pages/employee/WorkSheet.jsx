import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";

const tasksOptions = ["Sales", "Support", "Content", "Paper-work"];

const WorkSheet = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();

  const [entries, setEntries] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { date: new Date() } });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setValueEdit,
    watch: watchEdit,
    formState: { errors: errorsEdit },
  } = useForm({ defaultValues: { editDate: new Date() } });

  useEffect(() => {
    if (!user?.email) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/work-entries?email=${user.email}`);
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error("Error fetching work entries:", err);
      }
    };
    fetchData();
  }, [user?.email]);

  const onSubmit = async (data) => {
    const newEntry = {
      task: data.task,
      hoursWorked: parseFloat(data.hoursWorked),
      date: data.date.toISOString(),
      email: user?.email,
    };

    try {
      const res = await axiosSecure.post("/work-entries", newEntry);
      if (res.data.insertedId || res.data.acknowledged) {
        setEntries([...entries, { ...newEntry, _id: res.data.insertedId }]);
        reset();
      } else {
        console.error("Failed to save entry");
      }
    } catch (err) {
      console.error("Error submitting entry:", err);
    }
  };

  const openEditModal = (index) => {
    const entry = entries[index];
    setEditingIndex(index);
    setValueEdit("editTask", entry.task);
    setValueEdit("editHoursWorked", entry.hoursWorked);
    setValueEdit("editDate", new Date(entry.date));
    setModalIsOpen(true);
  };

  const onUpdate = async (data) => {
    const updatedEntry = {
      task: data.editTask,
      hoursWorked: data.editHoursWorked,
      date: data.editDate.toISOString(),
    };

    try {
      const id = entries[editingIndex]._id;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/work-entries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEntry),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updated = [...entries];
      updated[editingIndex] = { ...updatedEntry, _id: id };
      setEntries(updated);
      setModalIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error updating entry");
    }
  };

  const deleteEntry = async idx => {
    const entry = entries[idx];
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This entry will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/work-entries/${entry._id}`);
      if (res.status === 200) {
        const updated = entries.filter((_, i) => i !== idx);
        setEntries(updated);
        await Swal.fire("Deleted!", "Work entry has been deleted.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not delete entry.", "error");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Work Sheet</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-4 items-end bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <div className="flex flex-col w-40">
          <label className="mb-1 font-semibold text-gray-700">Task</label>
          <select
            {...register("task", { required: "Task is required" })}
            className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              errors.task ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select Task
            </option>
            {tasksOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.task && <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>}
        </div>

        <div className="flex flex-col w-28">
          <label className="mb-1 font-semibold text-gray-700">Hours Worked</label>
          <input
            type="number"
            {...register("hoursWorked", {
              required: "Hours worked is required",
              min: { value: 0.1, message: "Must be positive" },
              max: { value: 24, message: "Max 24 hours" },
            })}
            placeholder="Hours"
            step="0.1"
            className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              errors.hoursWorked ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.hoursWorked && <p className="text-red-500 text-sm mt-1">{errors.hoursWorked.message}</p>}
        </div>

        <div className="flex flex-col w-44">
          <label className="mb-1 font-semibold text-gray-700">Date</label>
          <Controller
            control={control}
            name="date"
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                className={`rounded-md border px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                placeholderText="Select date"
              />
            )}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-md px-6 py-2 transition shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Add
        </button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 font-semibold">Task</th>
              <th className="px-4 py-2 font-semibold">Hours</th>
              <th className="px-4 py-2 font-semibold">Date</th>
              <th className="px-4 py-2 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-600">
                  No work entries yet
                </td>
              </tr>
            ) : (
              [...entries]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((entry, idx) => (
                  <tr
                    key={entry._id || idx}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{entry.task}</td>
                    <td className="px-4 py-3">{entry.hoursWorked}</td>
                    <td className="px-4 py-3">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-md px-3 py-1 transition shadow"
                        onClick={() => openEditModal(idx)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-1 transition shadow"
                        onClick={() => deleteEntry(idx)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Work Entry"
        className="bg-white rounded-lg max-w-md mx-auto p-6 mt-20 shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start z-50"
      >
        <h3 className="text-2xl mb-6 font-bold text-gray-800">Edit Work Entry</h3>
        <form onSubmit={handleSubmitEdit(onUpdate)} className="flex flex-col gap-5">
          <select
            {...registerEdit("editTask", { required: "Task is required" })}
            className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              errorsEdit.editTask ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select Task
            </option>
            {tasksOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errorsEdit.editTask && <p className="text-red-500 text-sm">{errorsEdit.editTask.message}</p>}

          <input
            type="number"
            {...registerEdit("editHoursWorked", {
              required: "Hours worked is required",
              min: { value: 0.1, message: "Must be positive" },
              max: { value: 24, message: "Max 24 hours" },
            })}
            placeholder="Hours Worked"
            step="0.1"
            className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              errorsEdit.editHoursWorked ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorsEdit.editHoursWorked && <p className="text-red-500 text-sm">{errorsEdit.editHoursWorked.message}</p>}

          <DatePicker
            selected={watchEdit("editDate")}
            onChange={(date) => setValueEdit("editDate", date, { shouldValidate: true })}
            className={`rounded-md border px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              errorsEdit.editDate ? "border-red-500" : "border-gray-300"
            }`}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
          />
          {errorsEdit.editDate && <p className="text-red-500 text-sm">{errorsEdit.editDate.message}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-5 py-2 transition"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-md px-5 py-2 transition shadow-md"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WorkSheet;
