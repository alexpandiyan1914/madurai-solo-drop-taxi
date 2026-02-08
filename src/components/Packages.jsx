import "./Packages.css";
import { useState } from "react";
import PackageBookingModal from "./PackageBookingModal";

const packages = [
  {
    title: "Madurai → Rameswaram",
    days: "Oneway Drop",
    distance: "≈ 173 km",
    places: "Pamban Bridge, Ramanathaswamy Temple",
    note: "For further details please contact us.",
    price: "Starts from ₹3,000",
  },
  {
    title: "Madurai → Trichy",
    days: "Oneway Drop",
    distance: "≈ 126",
    places: "Trichy",
    note: "For further details please contact us.",
    price: "Starts from ₹2,400",
    cost:"2400",
  },
  {
    title: "Madurai → Kodaikanal",
    days: "Oneway Drop",
    distance: "≈ 118 km",
    places: "For further details please contact us.",
    note: "For further details please contact us.",
    price: "Starts from ₹2520",
  },
  {
    title: "Madurai → Ooty",
    days: "Oneway Drop",
    distance: "≈ 286 km",
    places: "Botanical Garden, Ooty Lake",
    note: "For further details please contact us.",
    price: "Starts from ₹4,500",
  },
  {
    title: "Madurai → Munnar",
    days: "Oneway Drop",
    distance: "≈ 160 km",
    places: "Tea Gardens, Eravikulam Park",
    note: "For further details please contact us.",
    price: "Starts from ₹3,500",
  },
  {
    title: "Madurai → Palani",
    days: "Oneway Drop",
    distance: "≈ 123 km",
    places: "Palani Murugan Temple",
    note: "For further details please contact us.",
    price: "Starts from ₹2,400",
  },
];

function Packages() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  return (
    <section className="packages-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Packages</h2>
          <p className="section-subtitle">
            Easy booking • Pickup from Madurai • Comfortable rides
          </p>
        </div>

        <div className="row g-4">
          {packages.map((pkg, index) => (
            <div
              className="col-md-6 col-lg-4"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="package-card">
                <h4>{pkg.title}</h4>
                <span className="package-days">{pkg.days}</span>

                <p className="package-info">
                  <strong>Distance:</strong> {pkg.distance}
                </p>
                <p className="package-info">
                  <strong>Note:</strong> {pkg.note}
                </p>

                <div className="package-footer">
                  <span className="package-price">{pkg.price}</span>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPackage && (
        <PackageBookingModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}

    </section>
  );
}

export default Packages;
