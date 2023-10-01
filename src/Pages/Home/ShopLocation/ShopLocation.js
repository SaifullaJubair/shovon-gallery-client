import React from "react";

const ShopLocation = () => {
  return (
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
  );
};

export default ShopLocation;
