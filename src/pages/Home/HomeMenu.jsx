const menuData = [
  { name: "Grilled Salmon", category: "Main Course", price: 25, image: "https://i.ibb.co/..." },
  { name: "Caesar Salad", category: "Starters", price: 12, image: "https://i.ibb.co/..." },
  { name: "Chocolate Lava Cake", category: "Dessert", price: 8, image: "https://i.ibb.co/..." },
  { name: "Margherita Pizza", category: "Main Course", price: 18, image: "https://i.ibb.co/..." },
  { name: "French Fries", category: "Starters", price: 7, image: "https://i.ibb.co/..." },
];

const HomeMenu = () => {
  const featuredItems = menuData.slice(0, 4); // first 4 items

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Featured Menu
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredItems.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:scale-105 transition">
              <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded-lg mb-3"/>
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

export default HomeMenu;
