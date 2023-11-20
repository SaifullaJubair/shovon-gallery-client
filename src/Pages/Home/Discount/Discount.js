import React from "react";
import { Link } from "react-router-dom";

const Discount = () => {
  return (
    <div className="my-12">
      <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3">
        <img
          alt="Trainer"
          src="https://i.ibb.co/Yytmp5c/Artificial-Flower-Tikli-7.png"
          className="h-32 w-full object-cover md:h-full"
        />

        <div className="p-4 m-auto text-center sm:p-6 md:col-span-2 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Run with the pack
          </p>

          <h2 className="mt-6 font-black uppercase">
            <span className="text-4xl font-black sm:text-5xl lg:text-6xl">
              Get 20% off
            </span>

            <span className="mt-2 block text-sm">
              On your next order over $50
            </span>
          </h2>

          <Link
            to="/category/all"
            className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
          >
            Get Discount
          </Link>

          <p className="mt-8 text-xs font-medium uppercase text-gray-400">
            Offer valid until 24th March, 2021 *
          </p>
        </div>
      </section>
    </div>
  );
};

export default Discount;
