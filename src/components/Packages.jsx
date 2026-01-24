import "./Packages.css";

const packages = [
  {
    title: "Madurai → Kodaikanal",
    days: "3 Days / 2 Nights",
    distance: "≈ 240 km",
    places: "Coaker’s Walk, Pillar Rocks, Kodai Lake",
    price: "Starts from ₹7,999",
  },
  {
    title: "Madurai → Rameswaram",
    days: "1–2 Days",
    distance: "≈ 340 km",
    places: "Pamban Bridge, Ramanathaswamy Temple",
    price: "Starts from ₹6,499",
  },
  {
    title: "Madurai → Ooty",
    days: "3 Days",
    distance: "≈ 520 km",
    places: "Botanical Garden, Ooty Lake",
    price: "Starts from ₹10,999",
  },
  {
    title: "Madurai → Kanyakumari",
    days: "2 Days",
    distance: "≈ 500 km",
    places: "Vivekananda Rock, Sunset Point",
    price: "Starts from ₹8,999",
  },
  {
    title: "Madurai → Munnar",
    days: "3 Days",
    distance: "≈ 280 km",
    places: "Tea Gardens, Eravikulam Park",
    price: "Starts from ₹9,499",
  },
  {
    title: "Madurai → Palani",
    days: "1 Day",
    distance: "≈ 120 km",
    places: "Palani Murugan Temple",
    price: "Starts from ₹3,499",
  },
];

function Packages() {
  return (
    <section className="packages-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Tour Packages</h2>
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
                  <strong>Places:</strong> {pkg.places}
                </p>

                <div className="package-footer">
                  <span className="package-price">{pkg.price}</span>
                  <a href="#book" className="btn btn-warning btn-sm">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Packages;
