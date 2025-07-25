const Footer = () => {
  return (
    <footer
      className="grayscale-50 relative bg-cover bg-center bg-no-repeat text-neutral-content"
      style={{
        backgroundImage: "url('https://i.ibb.co/mCssWHPn/pexels-ahmetyuksek-32017414.jpg')",
      }}
    >
      <div className="absolute">
       
      </div>
      <div className="text-center text-white text-4xl font-bold pt-25"><h1> Here's to a carefree way of life</h1>
       <h1>Just as it was thousands of years ago</h1></div>

      {/* Content */}
      <div className="text-white relative z-10 max-w-6xl mx-auto py-10 pt-5 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 font-bold">
          <div className=" mt-20">
            <h6 className="footer-title mb-2">Services</h6>
            <ul className="space-y-1">
              <li><a className="link link-hover">Branding</a></li>
              <li><a className="link link-hover">Design</a></li>
              <li><a className="link link-hover">Marketing</a></li>
              <li><a className="link link-hover">Advertisement</a></li>
            </ul>
          </div>

          <div className="mt-20">
            <h6 className="footer-title mb-2">Company</h6>
            <ul className="space-y-1">
              <li><a className="link link-hover">About us</a></li>
              <li><a className="link link-hover">Contact</a></li>
              <li><a className="link link-hover">Jobs</a></li>
              <li><a className="link link-hover">Press kit</a></li>
            </ul>
          </div>

          <div className="mt-20">
            <h6 className="footer-title mb-2">Legal</h6>
            <ul className="space-y-1">
              <li><a className="link link-hover">Terms of use</a></li>
              <li><a className="link link-hover">Privacy policy</a></li>
              <li><a className="link link-hover">Cookie policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
