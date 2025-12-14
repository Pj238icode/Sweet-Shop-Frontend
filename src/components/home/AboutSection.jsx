export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          About SweetShop
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          SweetShop is a modern web-based management system built to
          simplify daily operations of sweet shops.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard title="📦 Inventory" text="Track stock levels and restock easily." />
          <FeatureCard title="🛒 Sales" text="Manage orders and purchases in real time." />
          <FeatureCard title="🔐 Secure" text="Role-based access with authentication." />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="p-6 border shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
