// import { useContext } from 'react';
import {
  FaFacebook,
  FaGripLinesVertical,
  FaInstagram,
  FaLocationArrow,
  FaPhoneAlt,
  FaSkype,
  FaTwitter,
  FaWhatsapp,
  FaRegEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  // const {user} = useContext(AuthContext);
  return (
    <div className="bg-orange-500 w-full h-12 hidden md:inline-block">
      <div className="max-w-[1440px] w-[95%] mx-auto flex justify-between">
        {/* Contact section */}
        <div className="flex space-x-5 py-4">
          <div className="flex space-x-2">
            <div className="text-white text-xs">
              {" "}
              <FaLocationArrow></FaLocationArrow>
            </div>
            <p className="text-white text-xs">1216/2, Dhaka City</p>
          </div>
          <div className="flex space-x-2">
            <div className="text-white text-xs">
              <FaPhoneAlt></FaPhoneAlt>
            </div>
            <p className="text-white text-xs">+(88) 017 800 628</p>
          </div>
          <div className="flex space-x-2">
            <div className="text-white text-xs">
              <FaRegEnvelope></FaRegEnvelope>{" "}
            </div>
            <p className="text-white text-xs">info.contact@gmail.com</p>
          </div>
        </div>

        {/* Signin/signup & social media section */}
        <div className="flex space-x-4 py-4">
          {/* { !user && <><div className="text-white text-xs"><Link to={'/register'}>Register</Link></div>
               <div className="text-white text-xs"><Link to={'/login'}>Login</Link></div>
               <div className="text-white text-xs"><FaGripLinesVertical /> </div></>} */}
          <div className="text-white text-sm">
            <Link to={"https://www.facebook.com/"}>
              <FaFacebook />
            </Link>
          </div>
          <div className="text-white text-sm">
            <Link to={"https://twitter.com/"}>
              <FaTwitter />
            </Link>
          </div>
          <div className="text-white text-sm">
            <Link to={"https://www.instagram.com/?hl=en"}>
              <FaInstagram />
            </Link>
          </div>
          <div className="text-white text-sm">
            <Link to={"https://www.skype.com/en/"}>
              <FaSkype />
            </Link>
          </div>
          <div className="text-white text-sm">
            <Link to={"/"}>
              <FaWhatsapp />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
