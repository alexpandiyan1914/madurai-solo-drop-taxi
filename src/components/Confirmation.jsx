import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Confirmation.css";
import logo from "../assets/logo.png";
import emailjs from "@emailjs/browser";

function Confirmation() {
  const data = JSON.parse(localStorage.getItem("bookingData"));
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="confirm-empty">
        No booking data found.
      </div>
    );
  }

  const sendWhatsApp = () => {
    const msg = `*Madurai Solo Drop Taxi Booking*

Name: ${data.name}
Phone: ${data.phone}
From: ${data.pickup}
To: ${data.drop}
Date: ${data.date}
Time: ${data.time}
Vehicle: ${data.car.toUpperCase()}
Distance: ${data.distance || "To be discussed"}
Estimated Fare: ₹${data.fare || "To be discussed"}
`;

    const templateParams = {
      name: data.name,
      phone: data.phone,
      pickup: data.pickup,
      drop: data.drop,
      date: data.date,
      time: data.time,
      car: data.car.toUpperCase(),
      distance: data.distance || "To be discussed",
      fare: data.fare || "To be discussed",
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });


    window.open(
      `https://wa.me/918122746320?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    localStorage.removeItem("bookingData");
  };

  const handleBack = () => {
    navigate("/");
  }
  return (
    <section className="confirm-section">
      <div className="container h-100">
        <button className="back-btn" onClick={handleBack}>Go Back</button>
        <div className="row h-100 align-items-center">
          {/* LEFT – BRAND & TERMS */}
          <div className="col-lg-5 confirm-left">
            <div className="brand-box">
              <img src={logo} alt="Madurai Solo Drop Taxi" />
              <h2>Welcome to<br />Madurai Solo Drop Taxi</h2>
              <p className="subtitle">
                Please review your booking details and confirm to proceed.
              </p>
            </div>

            <div className="terms-box">
              <h5>Terms & Conditions</h5>
              <ul>
                <li>Toll, parking & permits are extra</li>
                <li>Minimum 130 km per drop trip</li>
                <li>Waiting charges ₹120/hour</li>
                <li>Fare may change for hill stations</li>
                <li>Booking subject to availability</li>
              </ul>
            </div>
          </div>

          {/* RIGHT – SUMMARY */}
          <div className="col-lg-7">
            <div className="confirm-card">
              <h3>Booking Confirmation</h3>

              <div className="summary-grid">
                <div><span>Name</span><strong>{data.name}</strong></div>
                <div><span>Phone</span><strong>{data.phone}</strong></div>
                <div><span>Pickup</span><strong>{data.pickup}</strong></div>
                <div><span>Drop</span><strong>{data.drop}</strong></div>
                <div><span>Date</span><strong>{data.date}</strong></div>
                <div><span>Time</span><strong>{data.time}</strong></div>
                <div><span>Vehicle</span><strong>{data.car.toUpperCase()}</strong></div>
                <div className="fare">
                  <span>Estimated Fare</span>
                  <strong>
                    {data.fare ? `₹${data.fare}` : "To be discussed"}
                  </strong>
                </div>
              </div>

              <label className="terms-check">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span>
                  By checking this box, I confirm that I have read and agree to the Terms and Conditions.
                </span>
              </label>

              {!accepted && (
                <p className="note">
                  Please accept the terms to continue booking!
                </p>
              )}

              <button
                className="confirm-btn"
                disabled={!accepted}
                onClick={sendWhatsApp}
              >
                Confirm Booking via WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Confirmation;
