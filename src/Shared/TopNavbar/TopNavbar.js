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
    <div className="bg-orange-500 w-full h-12 hidden md:inline-block print:hidden">
      <div className="max-w-[1440px] w-[95%] mx-auto flex justify-between">
        {/* Contact section */}
        <div className="flex space-x-5 py-4">
          <div className="flex items-center justify-center ">
            <div className="text-white text-xs px-1">
              {" "}
              <FaLocationArrow></FaLocationArrow>
            </div>
            <p className="text-white text-xs">
              2No Shonadanga Khulna, Bangladesh
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-white text-xs">
              <FaPhoneAlt></FaPhoneAlt>
            </div>
            <p className="text-white text-xs">+(88) 01923 868 397</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="text-white text-xs">
              <FaRegEnvelope></FaRegEnvelope>{" "}
            </div>
            <p className="text-white text-xs">saifullajubair6@gmail.com</p>
          </div>
        </div>

        {/* Signin/signup & social media section */}
        <div className="flex items-center justify-center space-x-4 py-4">
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
