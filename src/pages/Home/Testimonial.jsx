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
    <Carousel
      responsive={responsive}
      showDots
      infinite
      autoPlay={false}
      keyBoardControl
      containerClass="px-4 py-28"
      dotListClass="custom-dot-list"
    >
      {testimonials.map((t, i) => (
        <div key={i} className=" bg-white p-6 py-15 rounded-lg shadow-md mx-2">
          <p className="text-gray-800 italic text-center">“{t.text}”</p>
          <p className="mt-4 text-right font-semibold">— {t.author}</p>
        </div>
      ))}
    </Carousel>
  );
}
