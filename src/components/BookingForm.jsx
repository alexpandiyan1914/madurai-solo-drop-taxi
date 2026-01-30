import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookingForm.css";

const RATES = {
  sedan: 14,
  suv: 18,
  innova: 20,
};

function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    car: "sedan",
    distance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const fare =
    form.distance && !isNaN(form.distance)
      ? Number(form.distance) * RATES[form.car]
      : 0;

  const sendWhatsApp = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.pickup ||
      !form.drop ||
      !form.date ||
      !form.time ||
      !form.distance
    ) {
      alert("Please fill all the details before booking.");
      return;
    }

    const msg = `*Madurai Solo Drop Taxi Booking*

Name: ${form.name}
Phone: ${form.phone}
Pickup: ${form.pickup}
Drop: ${form.drop}
Date: ${form.date}
Time: ${form.time}
Vehicle: ${form.car.toUpperCase()}
Distance: ${form.distance} km
Estimated Fare: ₹${fare}
`;

    window.open(
      `https://wa.me/918122746320?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <section className="booking-section mb-5 mb-lg-6" id="book">
      <div className="container">
        <div className="row align-items-center g-5">
          
          {/* LEFT SIDE */}
          <div className="col-lg-5" data-aos="fade-right">
            <h2 className="fw-bold mb-3">
              Why Choose <span className="text-warning">Madurai Solo Drop Taxi ?</span>
            </h2>
            <p className="text-muted mb-4">
              We specialize in safe, affordable and reliable outstation taxi services
              from Madurai with transparent pricing and professional drivers.
            </p>

            <ul className="list-unstyled">
              <li className="mb-3" data-aos="fade-up" data-aos-delay="100">One-way & Outstation Trips</li>
              <li className="mb-3" data-aos="fade-up" data-aos-delay="200">Verified & Experienced Drivers</li>
              <li className="mb-3" data-aos="fade-up" data-aos-delay="200">No Hidden Charges</li>
              <li className="mb-3" data-aos="fade-up" data-aos-delay="200">On-time Pickup Guarantee</li>
              <li className="mb-3" data-aos="fade-up" data-aos-delay="200">Madurai Based Trusted Service</li>
            </ul>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="col-lg-6"  data-aos="fade-left">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h3 className="fw-bold text-center mb-4">
                  Book Your Taxi
                </h3>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Pickup Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pickup"
                      value={form.pickup}
                      onChange={handleChange}
                      placeholder="Pickup location"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Drop Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="drop"
                      value={form.drop}
                      onChange={handleChange}
                      placeholder="Drop location"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Pickup Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Pickup Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Vehicle Type</label>
                    <select
                      className="form-select"
                      name="car"
                      value={form.car}
                      onChange={handleChange}
                    >
                      <option value="sedan">Sedan (₹14/km)</option>
                      <option value="suv">SUV (₹18/km)</option>
                      <option value="innova">Innova (₹20/km)</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Distance (optional)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="distance"
                      value={form.distance}
                      onChange={handleChange}
                      placeholder="Approx distance (km)"
                    />
                  </div>
                </div>

                <div className="alert alert-warning text-center fw-semibold mt-4">
                  Estimated Fare: ₹{fare}
                </div>

                <div className="d-grid mt-3">
                  <button
                    className="btn btn-success btn-lg rounded-pill"
                    onClick={sendWhatsApp}
                  >
                    Confirm & WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BookingForm;
