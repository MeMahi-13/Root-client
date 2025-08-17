import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const testimonials = [
  {
    author: "Emma & David Lawson",
    text: "Staying at Root’s Woodland Suites was a transformative experience... We can’t wait to return."
  },
  {
    author: "James Turner",
    text: "A peaceful hideaway, with thoughtful touches like herbal tea and forest views. Highly recommended!"
  },
  {
    author: "Sophia Rodriguez",
    text: "From the rustic charm to the relaxing ambience, everything exceeded our expectations."
  },
];

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet:  { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile:  { breakpoint: { max: 464, min: 0 }, items: 1 }
};

export default function TestimonialCarousel() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          What Our Guests Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
          Real stories from people who stayed with us
        </p>
      </div>

      <Carousel
        responsive={responsive}
        showDots
        infinite
        autoPlay={false}
        keyBoardControl
        containerClass="max-w-4xl mx-auto"
        itemClass="px-2"
        partialVisible
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="relative p-4 rounded-2xl transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/Z6xGwjYK/flower-9173953.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border py-12 border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200 italic text-base leading-relaxed text-center">
                “{t.text}”
              </p>
              <p className="mt-4 text-right font-semibold text-gray-900 dark:text-gray-100 text-sm">
                — {t.author}
              </p>
            </div>
          </div>
        ))}
      </Carousel>

      <style>{`
        .react-multi-carousel-dot button {
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: #cbd5e1;
        }
        .react-multi-carousel-dot--active button {
          background: #3b82f6;
        }
      `}</style>
    </section>
  );
}
