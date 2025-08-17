import { Link } from "react-router-dom";

const blogData = [
  {
    title: "Mountain Escape",
    author: "Emma Lawson",
    date: "2025-08-01",
     image: "https://i.ibb.co.com/Y7vtjhtN/pexels-isa-nurrosid-216198809-11854678.jpg",
    excerpt: "Experience the serenity of the mountains and reconnect with nature..."
  },
  {
    title: "Culinary Delights",
    author: "James Turner",
    date: "2025-08-03",
     image: "https://i.ibb.co.com/PvWHYczs/pexels-panditwiguna-2788492.jpg",
    excerpt: "Taste the exquisite flavors crafted by our chefs in a luxurious setting..."
  }
];

export default function HomeBlog() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Latest Blogs
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {blogData.map((blog, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{blog.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">By {blog.author} | {blog.date}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{blog.excerpt}</p>
                <Link 
                  to="/blogs"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
