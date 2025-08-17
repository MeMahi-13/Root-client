
const blogData = [
  {
    title: "Exploring the Mountain Retreat",
    author: "John Doe",
    date: "August 10, 2025",
    content: "Discover the tranquility and beauty of Root's mountain retreat. Enjoy breathtaking views, peaceful surroundings, and luxurious accommodations. Immerse yourself in nature while staying in comfortable suites that blend seamlessly with the environment.",
    image: "https://i.ibb.co.com/HLdzdzVj/pexels-luis-zambrano-3782493-16436921.jpg"
  },
  {
    title: "Gourmet Dining Experiences",
    author: "Jane Smith",
    date: "August 12, 2025",
    content: "Enjoy exquisite meals crafted with locally sourced ingredients. Our chefs prepare each dish with care, combining flavors and presentation for an unforgettable dining experience.",
    image: "https://i.ibb.co.com/PvWHYczs/pexels-panditwiguna-2788492.jpg"
  },
  {
    title: "Relaxing Spa and Wellness",
    author: "Emily White",
    date: "August 15, 2025",
    content: "Indulge in rejuvenating spa therapies and wellness treatments designed to relax your mind, body, and soul. Our spa facilities offer a sanctuary of calm with professional staff to guide you through your wellness journey.",
    image: "https://i.ibb.co.com/MyVVzqmp/pexels-amelia-hallsworth-5461586.jpg"
  },
];

const BlogPage = () => {
  return (
    <section className="py-25 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        

        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Blogs
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{blog.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">By {blog.author} | {blog.date}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{blog.content.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
