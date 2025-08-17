import { motion } from 'framer-motion';
import { Link } from 'react-router';

const services = [
  {
    title: 'Accommodation Features',
    description:
      'Cozy wooden cottages with king-size beds, en-suite bathrooms, private balconies, Wi‑Fi, flat-screen TV, mini-fridge, tea/coffee maker, and work desk.',
    img: 'https://i.ibb.co/MyVVzqmp/pexels-amelia-hallsworth-5461586.jpg',
  },
];

const Services = () => (
  <div>
   
    <section className="py-16 bg-[#f5f3ee] dark:bg-gray-800">
       <h1 className='text-5xl p-10 pb-25'>Included services</h1>
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        className="flex flex-col md:flex-row items-center md:items-start gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 2 }}
      >
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
          <img
            src={services[0].img}
            alt={services[0].title}
            className="object-cover w-full h-64 md:h-full"
          />
        </div>

        {/* Text */}
        <div className="space-y-4 px-4 md:px-0">
          <h3 className="text-3xl md:text-4xl font-semibold">{services[0].title}</h3>
          <p className="text-gray-700 dark:text-white leading-relaxed">{services[0].description}</p>
         <Link to="all-services">
          <button className="mt-4 inline-block px-6 py-2 dark:bg-base-200 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
            Learn More
          </button></Link>
        </div>
      </motion.div>
    </div>
  </section>
  </div>
);

export default Services;
