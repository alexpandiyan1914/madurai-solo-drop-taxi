import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import "./BookingForm.css";

const RATES = {
  sedan: 14,
  suv: 18,
  innova: 20,
};

function BookingForm() {
  const navigate = useNavigate();
  const [loading,Setloading] = useState(false);

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

  const [errors, setErrors] = useState({});

  /* ---------- HELPERS ---------- */

  const isPastTime = (date, time) => {
    const now = new Date();
    const selected = new Date(`${date}T${time}`);
    return selected < now;
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!form.pickup.trim()) {
      newErrors.pickup = "Enter pickup location";
    }

    if (!form.drop.trim()) {
      newErrors.drop = "Enter drop location";
    }

    if (!form.date) {
      newErrors.date = "Select pickup date";
    }

    if (!form.time) {
      newErrors.time = "Select pickup time";
    }

    if (form.date && form.time && isPastTime(form.date, form.time)) {
      newErrors.time = "Pickup time cannot be in the past";
    }

    if (form.distance && Number(form.distance) < 0) {
      newErrors.distance = "Distance cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- INPUT CONTROL ---------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name → only letters & spaces
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;

    // Phone → only numbers
    if (name === "phone" && !/^\d*$/.test(value)) return;

    // Distance → no minus
    if (name === "distance" && value.startsWith("-")) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- SUBMIT ---------- */

  const handleEnquiry = () => {
    if (!validate()) return;

    const fare =
      form.distance
        ? Number(form.distance) * RATES[form.car]
        : null;

    localStorage.setItem(
      "bookingData",
      JSON.stringify({ ...form, fare })
    );

    Setloading(true);

    setTimeout(() => {
      navigate("/confirm-booking");   
    }, 2000);
  };

  return (
    <section className="booking-section" id="book">
      <div className="container">
        <div className="row g-5 align-items-center">

          {/* LEFT */}
          <div className="col-lg-5" data-aos="fade-right">
            <h2 className="fw-bold mb-4">
              Why Choose <span className="text-warning">Madurai Solo Drop Taxi?</span>
            </h2>

            <ul className="why-list">
              <li className="mb-3" data-aos="fade-up" data-aos-delay="100">One-way & Outstation Trips</li>
              <li className="mb-3" data-aos="fade-up" data-aos-delay="200">No Hidden Charges</li>
              <li className="mb-3" data-aos="fade-up" data-aos-delay="300">Experienced Drivers</li>
              <li className="mb-3" data-aos="fade-up" data-aos-delay="400">On-time Pickup</li>
              <li className="mb-3" data-aos="fade-up" data-aos-delay="500">24×7 Support</li>
            </ul>
          </div>

          {/* FORM */}
          <div className="col-lg-6" data-aos="fade-left">
            <div className="card booking-card">
              <h3 className="text-center mb-4">Book Your Taxi</h3>
              <div className="row g-3">
                <Input label="Name" name="name" value={form.name} error={errors.name} onChange={handleChange} />
                <Input label="Phone" name="phone" value={form.phone} error={errors.phone} onChange={handleChange} />
                <Input label="Pickup Location" name="pickup" value={form.pickup} error={errors.pickup} onChange={handleChange} />
                <Input label="Drop Location" name="drop" value={form.drop} error={errors.drop} onChange={handleChange} />

                <Input type="date" label="Pickup Date" name="date" value={form.date} error={errors.date} onChange={handleChange} />
                <Input type="time" label="Pickup Time" name="time" value={form.time} error={errors.time} onChange={handleChange} />
                
                <div className="col-md-6">
                  <label className="form-label">Vehicle</label>
                  <select className="form-select" name="car" value={form.car} onChange={handleChange}>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="innova">Innova</option>
                  </select>

                </div>
                <Input label="Distance (optional)" name="distance" value={form.distance} error={errors.distance} onChange={handleChange} />
              </div>

              <button className="btn btn-primary w-100 mt-4" onClick={handleEnquiry} disabled={loading}>
                {loading ?(
                  <ThreeDot color="#fff" size="medium" text="" textColor="" />
                 ) :(
                      "Get free Enguiry"
                  )
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- REUSABLE INPUT ---------- */
function Input({ label, name, value, error, onChange, type = "text" }) {
  return (
    <div className="col-md-6">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
}

