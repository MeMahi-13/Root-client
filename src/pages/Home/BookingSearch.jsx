import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function BookingSearch() {
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState(2);
  const [promo, setPromo] = useState('');

  const handleReserve = () => {
    Swal.fire({
      title: 'Reservation Confirmed 🎉',
      html: `
        <p><b>Arrival:</b> ${arrival || '–'}</p>
        <p><b>Departure:</b> ${departure || '–'}</p>
        <p><b>Guests:</b> ${guests}</p>
        <p><b>Promo Code:</b> ${promo || '–'}</p>
      `,
      icon: 'success',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#16a34a'
    });
  };

  return (
    <div className='bg-white dark:bg-base-100'>
      <section className="my-8 bg-purple-200 text-black dark:text-white dark:bg-cyan-950 px-4 sm:px-8 md:px-20 py-8 max-w-screen-xl mx-auto rounded-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center md:text-left max-w-screen-md mx-auto mb-6">
          "Root invites you to leave everything that is familiar to you behind and experience the mountain in its archaic natural state …"
          <br />
          <span className="text-xl block mt-2">Your hosts at Root</span>
        </h1>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {/* Arrival */}
          <div className="flex flex-col flex-1">
            <label className="text-sm dark:text-white font-medium text-gray-700">Arrival</label>
            <input
              type="date"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Departure */}
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium dark:text-white text-gray-700">Departure</label>
            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center gap-1">
              <FaUser /> Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Promo Code */}
          <div className="flex flex-col flex-1">
            <label className="text-sm dark:text-white font-medium text-gray-700">Promo Code</label>
            <input
              type="text"
              placeholder="Enter code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Reserve Button */}
          <div className="flex-1 md:flex-none">
            <button
              type="button"
              onClick={handleReserve}
              className="mt-4 md:mt-6 w-full md:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
            >
              Reserve &raquo;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
