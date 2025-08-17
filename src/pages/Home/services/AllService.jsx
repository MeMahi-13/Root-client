import { useEffect, useState } from "react";

const AllService = () => {
  const [services, setServices] = useState([]);
  const [sortedServices, setSortedServices] = useState([]);
  const [sortType, setSortType] = useState("");
  const [category, setCategory] = useState("all");

  // ✅ Fetch data
  useEffect(() => {
    fetch("http://localhost:3000/all-services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setSortedServices(data);
      });
  }, []);

  // ✅ Handle sorting
  const handleSort = (type) => {
    setSortType(type);
    let sorted = [...services];

    if (type === "low-to-high") sorted.sort((a, b) => a.price - b.price);
    if (type === "high-to-low") sorted.sort((a, b) => b.price - a.price);

    if (category !== "all") {
      sorted = sorted.filter((s) => s.category === category);
    }

    setSortedServices(sorted);
  };

  // ✅ Handle category filter
  const handleCategory = (cat) => {
    setCategory(cat);
    let filtered = [...services];

    if (cat !== "all") filtered = filtered.filter((s) => s.category === cat);

    if (sortType === "low-to-high") filtered.sort((a, b) => a.price - b.price);
    if (sortType === "high-to-low") filtered.sort((a, b) => b.price - a.price);

    setSortedServices(filtered);
  };

  return (
   <div className="roboto py-17 bg-white dark:bg-base-200"> 
     <div className="p-6 max-w-7xl mx-auto bg-white dark:bg-base-200">
        <h1 className="text-black dark:text-white text-4xl font-semibold text-center py-10 mb-5">Explore Our Services </h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-3">
          <button
            onClick={() => handleSort("low-to-high")}
            className={`px-5 py-2 rounded-lg shadow-md transition ${
              sortType === "low-to-high"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Price: Low → High
          </button>
          <button
            onClick={() => handleSort("high-to-low")}
            className={`px-5 py-2 rounded-lg shadow-md transition ${
              sortType === "high-to-low"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Price: High → Low
          </button>
        </div>

        <select
          value={category}
          onChange={(e) => handleCategory(e.target.value)}
          className="px-4 py-2 rounded-lg shadow-md border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Categories</option>
          <option value="room">Rooms</option>
          <option value="restaurant">Restaurant</option>
        </select>
      </div>

      {/* --- Services Grid --- */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {sortedServices.map((service, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {service.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                {service.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-blue-600 text-lg">
                  ${service.price}
                </span>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full border border-orange-300">
                  {service.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default AllService;
