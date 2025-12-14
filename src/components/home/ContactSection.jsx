export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Contact Us
        </h2>

        <p className="text-gray-600 mb-10">
          Have questions? We'd love to hear from you.
        </p>

        <form className="space-y-6 max-w-xl mx-auto">
          <Input placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border px-4 py-3 focus:outline-none focus:border-purple-600"
          />

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white
            font-semibold rounded-none hover:bg-purple-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

function Input({ type = "text", placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border px-4 py-3 focus:outline-none focus:border-purple-600"
    />
  );
}
