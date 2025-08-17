import { useState } from "react";

const menuData = [
  // Starters
  { name: "Caesar Salad", category: "Starters", price: 12, image: "https://i.ibb.co/8mF5R5M/caesar-salad.jpg" },
  { name: "Bruschetta", category: "Starters", price: 10, image: "https://i.ibb.co/JdSxSg3/bruschetta.jpg" },
  { name: "Garlic Bread", category: "Starters", price: 7, image: "https://i.ibb.co/YX7S6Zj/garlic-bread.jpg" },

  // Main Course
  { name: "Grilled Salmon", category: "Main Course", price: 25, image: "https://i.ibb.co/2n6xMxZ/grilled-salmon.jpg" },
  { name: "Margherita Pizza", category: "Main Course", price: 18, image: "https://i.ibb.co/X7C7pKk/margherita-pizza.jpg" },
  { name: "Spaghetti Carbonara", category: "Main Course", price: 20, image: "https://i.ibb.co/Nrm1qYb/spaghetti.jpg" },
  { name: "Grilled Chicken", category: "Main Course", price: 22, image: "https://i.ibb.co/0BG3GxB/grilled-chicken.jpg" },

  // Desserts
  { name: "Chocolate Lava Cake", category: "Dessert", price: 8, image: "https://i.ibb.co/p1s1H3X/chocolate-lava-cake.jpg" },
  { name: "Cheesecake", category: "Dessert", price: 9, image: "https://i.ibb.co/tc1q4hG/cheesecake.jpg" },
  { name: "Ice Cream Sundae", category: "Dessert", price: 7, image: "https://i.ibb.co/Tg6k4VX/ice-cream.jpg" },

  // Beverages
  { name: "Fresh Orange Juice", category: "Beverages", price: 5, image: "https://i.ibb.co/ZV7pJQp/orange-juice.jpg" },
  { name: "Cappuccino", category: "Beverages", price: 4, image: "https://i.ibb.co/HNKpx5L/cappuccino.jpg" },
  { name: "Herbal Tea", category: "Beverages", price: 3, image: "https://i.ibb.co/LxZ7VwR/herbal-tea.jpg" },

  // Sides
  { name: "French Fries", category: "Sides", price: 7, image: "https://i.ibb.co/2tPtWyt/french-fries.jpg" },
  { name: "Mashed Potatoes", category: "Sides", price: 6, image: "https://i.ibb.co/svztN2X/mashed-potatoes.jpg" },
  { name: "Steamed Vegetables", category: "Sides", price: 6, image: "https://i.ibb.co/9ZG8rH9/steamed-vegetables.jpg" }
];


const FullMenu = () => {
  const [category, setCategory] = useState("all");

  const categories = ["all", ...new Set(menuData.map(item => item.category))];

  const filteredItems = category === "all"
    ? menuData
    : menuData.filter(item => item.category === category);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Full Menu
        </h2>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                category === cat 
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:scale-105 transition">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-3"/>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.category}</p>
              <p className="mt-1 font-bold text-blue-600 dark:text-blue-400">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullMenu;
