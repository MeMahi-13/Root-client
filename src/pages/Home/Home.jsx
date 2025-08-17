import Banner from "./Banner";
import BookingSearch from "./BookingSearch";
import HomeBlog from "./HomeBlog";
import HomeMenu from "./HomeMenu";
import Restaurant from "./services/Restaurant";
import Services from "./services/Services";
import Spa from "./services/Spa";
import Suite from "./Suite";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div className=" font-roboto bg-[#f5f3ee] dark:bg-base-100 text-black dark:text-white">
    
      <Banner/>
      <Services/>
      <Restaurant/>
      <Spa/>
      <div className="bg-white dark:bg-base-100 text-black dark:text-white">
        <BookingSearch/>
      </div>
      <Suite/>
      <HomeMenu/>
      <Testimonial/>
      <HomeBlog/>
    </div>
  );
};

export default Home;
