import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
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
        reset(); // clear form
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

  const deleteEntry = async (index) => {
    const entry = entries[index];

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/work-entries/${entry._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      const updated = [...entries];
      updated.splice(index, 1);
      setEntries(updated);
    } catch (err) {
      console.error(err);
      alert("Error deleting entry");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Work Sheet</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center mb-6 flex-wrap">
        <select
          {...register("task", { required: "Task is required" })}
          className="input input-bordered"
          defaultValue=""
        >
          <option value="" disabled>Select Task</option>
          {tasksOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.task && <p className="text-red-500 text-sm">{errors.task.message}</p>}

        <input
          type="number"
          {...register("hoursWorked", {
            required: "Hours worked is required",
            min: { value: 0.1, message: "Must be positive" },
            max: { value: 24, message: "Max 24 hours" },
          })}
          placeholder="Hours Worked"
          step="0.1"
          className="input input-bordered w-24"
        />
        {errors.hoursWorked && <p className="text-red-500 text-sm">{errors.hoursWorked.message}</p>}

        <Controller
          control={control}
          name="date"
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className="input input-bordered w-40"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              placeholderText="Select date"
            />
          )}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-3 py-1">Task</th>
            <th className="border px-3 py-1">Hours</th>
            <th className="border px-3 py-1">Date</th>
            <th className="border px-3 py-1">Actions</th>
          </tr>
        </thead>
       <tbody>
  {entries.length === 0 ? (
    <tr>
      <td colSpan={4} className="text-center py-4">No work entries yet</td>
    </tr>
  ) : (
    [...entries]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((entry, idx) => (
        <tr key={entry._id || idx}>
          <td className="border px-3 py-1">{entry.task}</td>
          <td className="border px-3 py-1">{entry.hoursWorked}</td>
          <td className="border px-3 py-1">{new Date(entry.date).toLocaleDateString()}</td>
          <td className="border px-3 py-1 flex gap-2 justify-center">
            <button className="btn btn-sm btn-warning" onClick={() => openEditModal(idx)}>Edit</button>
            <button className="btn btn-sm btn-error" onClick={() => deleteEntry(idx)}>Delete</button>
          </td>
        </tr>
      ))
  )}
</tbody>

      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Work Entry"
        className="bg-white rounded-lg max-w-md mx-auto p-6 mt-20 shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start z-50"
      >
        <h3 className="text-xl mb-4 font-semibold">Edit Work Entry</h3>
        <form onSubmit={handleSubmitEdit(onUpdate)} className="flex flex-col gap-4">
          <select {...registerEdit("editTask", { required: "Task is required" })} className="input input-bordered">
            <option value="" disabled>Select Task</option>
            {tasksOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
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
            className="input input-bordered w-full"
          />
          {errorsEdit.editHoursWorked && <p className="text-red-500 text-sm">{errorsEdit.editHoursWorked.message}</p>}

          <DatePicker
            selected={watchEdit("editDate")}
            onChange={(date) => setValueEdit("editDate", date, { shouldValidate: true })}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
          />
          {errorsEdit.editDate && <p className="text-red-500 text-sm">{errorsEdit.editDate.message}</p>}

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={() => setModalIsOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default WorkSheet;