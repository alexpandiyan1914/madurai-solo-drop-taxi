import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // you can move this to main.jsx if preferred
import "./Tariff.css";

import sedanImg from "../assets/sedan.jpg";
import suvImg from "../assets/suv.jpg";
import innovaImg from "../assets/innova.jpg";

const tariffData = [
  {
    id: "sedan",
    vehicle: "Sedan",
    price: "₹14 / km",
    image: sedanImg,
    highlights: ["Good for 1-3 passengers", "AC: Yes", "Luggage: 1 large + 1 small"],
    description:
      "Comfortable and fuel-efficient — perfect for solo travelers and small families. Ideal for city and short intercity routes.",
  },
  {
    id: "suv",
    vehicle: "SUV",
    price: "₹18 / km",
    image: suvImg,
    highlights: ["Good for 1-5 passengers", "AC: Yes", "Luggage: 2 large + 2 small"],
    description:
      "Spacious and comfortable for longer journeys. Best for family travel or when you need extra room for luggage.",
  },
  {
    id: "innova",
    vehicle: "Innova",
    price: "₹20 / km",
    image: innovaImg,
    highlights: ["Good for 1-7 passengers", "AC: Yes", "Luggage: 3 large + 2 small"],
    description:
      "Premium long-distance comfort with extra legroom. Recommended for pilgrimage trips and group travel.",
  },
];

const Tariff = () => {
  const [flipped, setFlipped] = useState({});
  const [visible, setVisible] = useState(false); // used to trigger one-time entrance animation
  const sectionRef = useRef(null);

  const toggleFlip = (id) => {
    setFlipped((s) => ({ ...s, [id]: !s[id] }));
  };

  const handleKey = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip(id);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // trigger only once
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={`tariff-section ${visible ? "entered" : ""}`}
      id="tariff"
      ref={sectionRef}
      aria-labelledby="tariff-heading"
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 id="tariff-heading" className="section-title">
            Tariff
          </h2>
          <p className="section-subtitle">
            Transparent pricing. Hover (desktop) or tap (mobile) a card to see details.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {tariffData.map((item, idx) => (
            <div
              className="col-md-6 col-lg-4"
              key={item.id}
              // tempo: pass delay via inline style variable so CSS can stagger
              style={{ "--card-delay": `${idx * 140}ms` }}
            >
              <div
                className={`tariff-card ${flipped[item.id] ? "is-flipped" : ""} ${
                  visible ? "will-animate" : ""
                }`}
                onClick={() => toggleFlip(item.id)}
                onKeyDown={(e) => handleKey(e, item.id)}
                role="button"
                tabIndex={0}
                aria-pressed={!!flipped[item.id]}
                aria-label={`${item.vehicle} card. Press Enter to flip.`}
              >
                <div className="card-inner">
                  {/* FRONT */}
                  <div className="card-front">
                    <img src={item.image} alt={`${item.vehicle}`} className="card-img" />
                    <div className="card-front-overlay">
                      <div className="vehicle-name">{item.vehicle}</div>
                      <div className="vehicle-price">{item.price}</div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="card-back">
                    <div className="card-back-content">
                      <h4 className="vehicle-name">{item.vehicle}</h4>
                      <p className="vehicle-desc">{item.description}</p>

                      <ul className="vehicle-highlights">
                        {item.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>

                      <div className="card-actions">
                        <a href="#book" className="btn btn-warning btn-sm">
                          Book Now
                        </a>
                        {/* 'Confirm & WhatsApp' removed intentionally */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tariff;
