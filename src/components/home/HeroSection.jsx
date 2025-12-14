export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700
      text-white px-6"
    >
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold mb-6">
          Sweet Shop Management Made Easy 🍬
        </h1>

        <p className="text-lg mb-8 text-white/90">
          Manage sweets, inventory, sales, and customers with a modern,
          easy-to-use system designed for sweet shop owners.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 bg-white text-purple-700
          font-semibold rounded-none shadow-lg hover:bg-gray-100 transition">
            Get Started
          </button>

          <button className="px-8 py-3 border-2 border-white
          text-white font-semibold rounded-none
          hover:bg-white hover:text-purple-700 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
