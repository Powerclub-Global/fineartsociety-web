"use client"; // Enable client-side rendering

const Newsletter = () => {
  return (
    <section className="py-16 px-8 sm:px-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-cinzel font-bold text-black mb-8 uppercase">
          Stay Updated on Events & Expositions
        </h2>
        <form className="max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 text-black font-gotham"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-gold border border-gold py-3 rounded-md font-bold hover:bg-opacity-80 transition"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
