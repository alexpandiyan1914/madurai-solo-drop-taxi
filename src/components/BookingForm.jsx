import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    // basic validation
    if (
      !form.name ||
      !form.phone ||
      !form.pickup ||
      !form.drop ||
      !form.distance
    ) {
      alert("Please fill all the details before booking.");
      return;
    }

    const msg = `🚖 *Madurai Solo Drop Taxi Booking*
    
Name: ${form.name}
Phone: ${form.phone}
Pickup: ${form.pickup}
Drop: ${form.drop}
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
    <section className="container my-5" id="book">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h2 className="mb-4 text-center fw-bold">
                Book Your Taxi
              </h2>

              {/* Name */}
              <div className="mb-3">
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

              {/* Phone */}
              <div className="mb-3">
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

              {/* Pickup */}
              <div className="mb-3">
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

              {/* Drop */}
              <div className="mb-3">
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

              {/* Vehicle */}
              <div className="mb-3">
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

              {/* Distance */}
              <div className="mb-3">
                <label className="form-label">Distance (km)</label>
                <input
                  type="number"
                  className="form-control"
                  name="distance"
                  value={form.distance}
                  onChange={handleChange}
                  placeholder="Approx distance in km"
                />
              </div>

              {/* Fare */}
              <div className="alert alert-warning text-center fw-semibold">
                Estimated Fare: ₹{fare}
              </div>

              {/* CTA */}
              <div className="d-grid">
                <button
                  className="btn btn-success btn-lg"
                  onClick={sendWhatsApp}
                >
                  Confirm & WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingForm;
