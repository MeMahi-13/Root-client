const Suite = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-6 space-y-12">

      {/* Title & Intro */}
      <h2 className="text-5xl text-center">Structure and Shelter</h2>
      <p className="text-center px-4 sm:px-16">
        Be at one with yourself, be present in the here and now. Root has 4 suites to provide guests
        with an all‑inclusive luxury stay with a personalised touch at a private retreat. Restrained
        in design and furnished with colours and materials that exude warmth, the suites provide
        structure and shelter: a protective place of comfort and refuge that brings nature directly
        into the room through its large windows.
      </p>

      {/* Sky View Suite */}
      <div className="space-y-8">
        <div className="flex flex-col space-y-2 px-4 md:px-0">
          <h3 className="text-4xl font-semibold">The Sky View</h3>
          <p className="text-xl text-gray-600">So close to the sky</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Image */}
          <div className="md:col-span-2 relative">
            <img
              src="https://i.ibb.co/n8YtVg2Q/pexels-rachel-claire-4825701-1.jpg"
              alt="Sky View Suite"
              className="w-full h-auto rounded-md"
            />
            <h4 className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              Suite View
            </h4>
          </div>

          {/* Side Content */}
          <div className="space-y-6">
            <img
              src="https://i.ibb.co/yn7VW6Pq/pexels-luis-zambrano-3782493-16436968.jpg"
              alt="Sky View detail"
              className="w-full h-60 object-cover rounded-md shadow"
            />
            <div className="bg-gray-100 rounded-lg p-6 shadow">

              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                <li>A plush king-size bed</li>
                <li>Sauna and open fireplace</li>
                <li>Bathroom with double rain shower</li>
                <li>Freestanding bathtub</li>
                <li>Cozy reading nook and daybed</li>
                <li>Tea & coffee bar, minibar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col space-y-2 px-4 md:px-0 pt-12 items-end ">
          <h3 className="text-4xl font-semibold">Back to
            beginnings</h3>
          <p className="text-xl text-gray-600">embark on a journey into yourself, to your origins, to the essentials</p>
        </div>

        {/* Forest View Suite */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Side Content */}
          <div className="space-y-6">
            <img
              src="https://i.ibb.co/M5n0WxFh/pexels-luis-zambrano-3782493-16436911.jpg"
              alt="Forest Suite detail"
              className="w-full h-60 object-cover rounded-md shadow"
            />
            <div className="bg-gray-100 rounded-lg p-6 shadow">

              <p className="text-gray-700 leading-relaxed">
               <ul className="list-disc ml-5 text-gray-700 space-y-1">
    <li>Floor-to-ceiling windows</li>
    <li>Plush king bed</li>
    <li>Cozy reading nook</li>
    <li>Complimentary herbal tea on your private deck</li>
    <li>Surrounded by the sounds of nature</li>
  </ul>
              </p>
            </div>
          </div>

          {/* Main Image */}
          <div className="md:col-span-2 relative">
            <img
              src="https://i.ibb.co/HLdzdzVj/pexels-luis-zambrano-3782493-16436921.jpg"
              alt="Forest Sanctuary Suite"
              className="w-full h-auto rounded-md"
            />
            <h4 className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              Suite View
            </h4>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Suite;
