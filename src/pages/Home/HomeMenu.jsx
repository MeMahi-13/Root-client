import { Link } from "react-router-dom";

const menuData = [
  { name: "Grilled Salmon", category: "Main Course", price: 25, image: "https://i.ibb.co.com/xq6PSxPd/pexels-rachel-claire-5531039.jpg" },
  { name: "Margherita Pizza", category: "Main Course", price: 18, image: "https://i.ibb.co.com/4g231YCk/pexels-pedrofurtadoo-33458044.jpg" },
  { name: "Spaghetti Carbonara", category: "Main Course", price: 20, image: "https://i.ibb.co.com/QFVJCN9B/pexels-polina-tankilevitch-4518833.jpg" },
  { name: "Pancake", category: "Dessert", price: 9, image: "https://i.ibb.co.com/pjwT7pfg/pexels-chokniti-khongchum-1197604-2280545.jpg" },
  { name: "Ice Cream Sundae", category: "Dessert", price: 7, image: "https://i.ibb.co.com/0RXNz29n/pexels-valeriya-27819685.jpg" },
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
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 hover:scale-105 transform transition duration-300"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-36 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.category}</p>
              <p className="mt-1 font-bold text-blue-600 dark:text-blue-400">${item.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/menu"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
