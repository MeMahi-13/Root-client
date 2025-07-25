import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

export default function BookingSearch() {
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState(2);
  const [promo, setPromo] = useState('');

  return (
    <section className=" my-5 p-20 bg-purple-200 ">
      <h1 className='text-4xl mx-40 px-40 pb-15'>"Root invites you to leave everything that is familiar to you behind and experience the mountain in its archaic natural state ..."
<br></br>
<span className='text-xl'>
  Your hosts at Root
</span>
</h1>
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Arrival */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-gray-700">Arrival</label>
          <input
            type="date"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Departure */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-gray-700">Departure</label>
          <input
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <FaUser /> Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            {[1,2,3,4,5].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>

        {/* Promo Code */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-gray-700">Promo Code</label>
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
            className="mt-4 md:mt-6 w-full md:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
            onClick={() => alert(`Searching stays: ${arrival} → ${departure}, ${guests} guests, promo: ${promo}`)}
          >
            Reserve &raquo;
          </button>
        </div>
      </div>
    </section>
  );
}
