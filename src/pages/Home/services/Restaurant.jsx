import { motion } from 'framer-motion';
import { Link } from 'react-router';

const services = [
  {
    title: 'The flavour of mountain origins',
    description:
      'On-site farm-to-table restaurant in a restored lodge. Room service, daily breakfast, and special dinner buffets.',
    img: 'https://i.ibb.co/NnKsNfCC/pexels-minan1398-1482803.jpg',
  },
];

const Restaurant = () => (
  <section className="py-16 bg-[#f5f3ee] dark:bg-base-200">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {/* Text Section */}
        <div className="space-y-4 text-center md:text-left md:w-2/3 px-4 md:px-0">
          <h3 className="text-3xl md:text-4xl font-semibold">
            {services[0].title}
          </h3>
          <p className="text-gray-700 dark:text-white leading-relaxed md:text-lg">
            {services[0].description}
          </p>
         <Link to="/all-services">
          <button className="mt-4 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
            Learn More
          </button></Link>
        </div>

        {/* Image Section with Smaller Width */}
        <div className="flex-shrink-0 w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
          <img
            src={services[0].img}
            alt={services[0].title}
            className="object-cover w-full h-48 md:h-64"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default Restaurant;
