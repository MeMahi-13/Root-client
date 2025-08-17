const Banner = () => (
  <div className="bg-[#f5f3ee] dark:bg-base-100 text-black dark:text-white flex w-screen h-screen overflow-hidden">
    {/* Hero Text */}
    <div className="px-38 flex flex-col justify-center">
      <h1 className="font-light text-6xl leading-tight mb-6  text-black dark:text-white">
        Rooted <br /> in its <br /> origins
      </h1>
      <button className="w-max bg-gray-800 text-white px-6 py-3 rounded-md">
        Learn More
      </button>
    </div>

    {/* Vertical caption (top-to-bottom) */}
    <div className="px-4 hidden lg:flex items-center">
      <p
        className={`
          [writing-mode:vertical-rl]
          text-gray-700 dark:text-white uppercase tracking-widest
        `}
      >
        Reconnect with Nature, Reconnect with Yourself
      </p>
    </div>

    {/* Image */}
    <div className="flex-1 pr-10 pb-8 pt-17">
      <img
        src="https://i.ibb.co/Kp7pGqgd/pexels-cottonbro-5601756.jpg"
        alt="Wooden house resort"
        className="object-cover w-full h-full"
      />
    </div>
  </div>
);

export default Banner;
