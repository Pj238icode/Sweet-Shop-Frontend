export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Pricing Plans
        </h2>

        <p className="text-gray-600 mb-12">
          Choose a plan that fits your business needs.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            title="Basic"
            price="₹0"
            features={[
              "Inventory tracking",
              "Sweet catalog",
              "Basic reports",
            ]}
            buttonText="Free Plan"
          />

          <PricingCard
            title="Pro"
            price="₹499"
            highlight
            features={[
              "All Basic features",
              "Sales analytics",
              "Admin dashboard",
            ]}
            buttonText="Most Popular"
          />

          <PricingCard
            title="Enterprise"
            price="₹999"
            features={[
              "Unlimited users",
              "Priority support",
              "Custom features",
            ]}
            buttonText="Contact Sales"
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({ title, price, features, buttonText, highlight }) {
  return (
    <div
      className={`bg-white p-8 shadow-sm hover:shadow-lg transition
      ${highlight ? "border-2 border-purple-600" : "border"}`}
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-4xl font-bold mb-6">{price}</p>

      <ul className="space-y-3 text-gray-600 mb-6">
        {features.map((f) => (
          <li key={f}>✔ {f}</li>
        ))}
      </ul>

      <button className="w-full py-3 bg-purple-600 text-white
      font-semibold rounded-none hover:bg-purple-700 transition">
        {buttonText}
      </button>
    </div>
  );
}
