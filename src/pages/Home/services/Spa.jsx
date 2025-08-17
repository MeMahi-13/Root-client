import { motion } from 'framer-motion';
import { Link } from 'react-router';

const services = [
  {
    title: 'Outdoor Adventure',
    description:
      'Guided nature walks, wildlife watching, birding, kayaking, canoeing, fishing, hiking, horseback riding. Fire pits and bonfire evenings under string lights.',
    img: 'https://i.ibb.co/PZMKqNDQ/pexels-faizanmeer-33021518.jpg',
  },
];

const Spa = () => (
  <section className="py-16 bg-[#f5f3ee] dark:bg-gray-800">
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
          <Link to="/all-services">
          <button className="mt-4 inline-block px-6 py-2 bg-gray-800 dark:bg-base-200 text-white rounded hover:bg-gray-700 transition">
            Learn More
          </button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Spa;
