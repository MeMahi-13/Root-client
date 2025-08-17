import { useState } from "react";

const menuData = [
  { name: "Bruschetta", category: "Starters", price: 10, image: "https://i.ibb.co.com/vvqfjS0N/pexels-roman-odintsov-4869428.jpg" },
  { name: "Garlic Bread", category: "Starters", price: 7, image: "https://i.ibb.co.com/fd5FxC2C/pexels-mariana-kurnyk-844465-1775043.jpg" },

  // Main Course
  { name: "Grilled Salmon", category: "Main Course", price: 25, image: "https://i.ibb.co.com/xq6PSxPd/pexels-rachel-claire-5531039.jpg" },
  { name: "Margherita Pizza", category: "Main Course", price: 18, image: "https://i.ibb.co.com/4g231YCk/pexels-pedrofurtadoo-33458044.jpg" },
  { name: "Spaghetti Carbonara", category: "Main Course", price: 20, image: "https://i.ibb.co.com/QFVJCN9B/pexels-polina-tankilevitch-4518833.jpg" },
  { name: "Grilled Chicken", category: "Main Course", price: 22, image: "https://i.ibb.co.com/0pwWbnCG/pexels-owpictures-106343.jpg" },

  // Desserts
  { name: "Chocolate Lava Cake", category: "Dessert", price: 8, image: "https://i.ibb.co.com/F94s9kY/pexels-valeriya-7646655.jpg" },
  { name: "Pancake", category: "Dessert", price: 9, image: "https://i.ibb.co.com/pjwT7pfg/pexels-chokniti-khongchum-1197604-2280545.jpg" },
  { name: "Ice Cream Sundae", category: "Dessert", price: 7, image: "https://i.ibb.co.com/0RXNz29n/pexels-valeriya-27819685.jpg" },

  // Beverages
  { name: "Fresh Orange Juice", category: "Beverages", price: 5, image: "https://i.ibb.co.com/QF4PTcHN/pexels-pixabay-158053.jpg" },
  { name: "Cappuccino", category: "Beverages", price: 4, image: "https://i.ibb.co.com/35XVyGtb/pexels-raymond-petrik-1448389535-28642477.jpg" },
  { name: "Herbal Tea", category: "Beverages", price: 3, image: "https://i.ibb.co.com/YFHPhDjF/pexels-sveta-moisseyeva-28176816-33459000.jpg" },

  // Sides
  { name: "French Fries", category: "Sides", price: 7, image: "https://i.ibb.co.com/zTcsgyPM/pexels-valeriya-30270643.jpg" },
  { name: "Mashed Potatoes", category: "Sides", price: 6, image: "https://i.ibb.co.com/tw0QtT4C/pexels-nano-erdozain-120534369-30766466.jpg" },
  { name: "Steamed Vegetables", category: "Sides", price: 6, image: "https://i.ibb.co.com/cKC6wfBs/pexels-hamzaoui-fatma-2153886935-33433987.jpg" }
];


const FullMenu = () => {
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(menuData.map(item => item.category))];

  const filteredItems = category === "All"
    ? menuData
    : menuData.filter(item => item.category === category);

  return (
    <section className="py-25 bg-gray-50 dark:bg-gray-900">
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
