import React, { useRef } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3h4hqit",
        "template_vl7prxj",
        form.current,
        "F5eN-EoZxqJ61DDG_"
      )
      .then(
        (result) => {
          // console.log(result.text);
          toast.success("Your message sent successfully");
        },
        (error) => {
          toast.error("Unfortunately Your message not sent.");
          // console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div>
      <section className="py-6 dark:bg-gray-800 dark:text-gray-50 my-6">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6 my-6">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">
              Fill in the form to start a conversation
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>2No Sonadanga Main Road, Khulna.</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>+880 1923868397</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>saifullajubair6@gmail.com</span>
              </p>
              <div className="flex gap-3 text-3xl md:place-self-center md:justify-self-end">
                <a
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/saifulla-jubair/"
                  title="LinkedIn"
                  className="flex items-center"
                >
                  <FaLinkedin></FaLinkedin>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://github.com/SaifullaJubair"
                  title="GitHum"
                  className="flex items-center p-1"
                >
                  <FaGithub className=""></FaGithub>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/saifullajubair.saiful"
                  title="Facebook"
                  className="flex items-center p-1"
                >
                  <FaFacebook></FaFacebook>
                </a>
              </div>
            </div>
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6 ng-untouched ng-pristine ng-valid"
          >
            <label className="block">
              <span className="mb-1">Full name</span>
              <input
                type="text"
                name="name"
                className="block w-full rounded-md shadow-sm  focus:ring-violet-400 dark:bg-gray-800 border border-white px-3 py-2 mt-2"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1">Email address</span>
              <input
                type="email"
                name="email"
                className="block w-full rounded-md shadow-sm  px-3 py-2 focus:ring-violet-400 dark:bg-gray-800 border border-white mt-2"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1">Subject</span>
              <input
                type="text"
                name="subject"
                className="block w-full rounded-md shadow-sm  px-3 py-2 focus:ring-violet-400 dark:bg-gray-800 border border-white mt-2"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2">Message</span>
              <textarea
                rows="3"
                name="message"
                className="block w-full rounded-md  focus:ring-violet-400 dark:bg-gray-800 border-white border my-2 p-3"
                required
              ></textarea>
            </label>
            <button
              type="submit"
              className="text-white bg-secondary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md lg:text-md md:text-sm w-full sm:w-auto lg:px-5 md:px-3 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
      <div className="my-16">
        <h2 className="text-2xl font-bold mb-4">Our Shop Location</h2>
        <div>
          <iframe
            className="w-full h-[500px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.83927743870896!2d89.55152580859749!3d22.823633248780347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff91fa74ac7725%3A0x2fdd70cfd496b19!2sShovon%20Gallery!5e0!3m2!1sen!2sbd!4v1696181374278!5m2!1sen!2sbd"
            title="Shop Location"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
