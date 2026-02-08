import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import "./PackagebookingModal.css";

function PackageBookingModal({ pkg, onClose }) {
  const navigate = useNavigate();
  const [loading,Setloading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    cost: "",
    car: "sedan",
  });

  const [errors, setErrors] = useState({});

  /* Prevent background scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isPastTime = (date, time) => {
    const now = new Date();
    const selected = new Date(`${date}T${time}`);
    return selected < now;
  };

  /* Validation */
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!form.phone) {
      newErrors.phone = "Please enter phone number";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10-digit number";
    }

    if (!form.date) {
      newErrors.date = "Please select pickup date";
    }

    if (!form.time) {
      newErrors.time = "Please select pickup time";
    }

    if (form.date && form.time && isPastTime(form.date, form.time)) {
      newErrors.time = "Pickup time cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) return;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const [pickup, drop] = pkg.title.split(" → ");

    localStorage.setItem(
      "bookingData",
      JSON.stringify({
        ...form,
        pickup,
        drop,
        price: pkg.cost,
      })
    );

    Setloading(true);

    setTimeout(() => {
      navigate("/confirm-booking");   
    }, 2000);
  };

  return (
    <div className="modal-overlay" data-aos="fade-in">
      <div className="modal-box" data-aos="zoom-in">
        <h3>{pkg.title}</h3>
        <p><strong>Distance:</strong> {pkg.distance}</p>
        <p><strong>Starting Price:</strong> {pkg.price}</p>

        <div className="modal-form">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={errors.date ? "input-error" : ""}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}

          {/* TIME */}
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className={errors.time ? "input-error" : ""}
          />
          {errors.time && <span className="error-text">{errors.time}</span>}

          {/* CAR */}
          <select
            name="car"
            value={form.car}
            onChange={handleChange}
          >
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="innova">Innova</option>
          </select>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ?(
                  <ThreeDot color="#fff" size="medium" text="" textColor="" />
                 ) :(
                      "Get free Enquiry"
                  )
                }
          </button>

          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackageBookingModal;
