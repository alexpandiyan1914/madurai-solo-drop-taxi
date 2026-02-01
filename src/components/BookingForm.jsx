import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingForm.css";

const RATES = {
  sedan: 14,
  suv: 18,
  innova: 20,
};

function BookingForm() {
  const navigate = useNavigate();

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

    navigate("/confirm-booking");
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

              <button className="btn btn-primary w-100 mt-4" onClick={handleEnquiry}>
                Get Free Enquiry
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

export default BookingForm;


// import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./BookingForm.css";

// const RATES = {
//   sedan: 14,
//   suv: 18,
//   innova: 20,
// };

// function BookingForm() {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     pickup: "",
//     drop: "",
//     date: "",
//     time: "",
//     car: "sedan",
//     distance: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const fare =
//     form.distance && !isNaN(form.distance)
//       ? Number(form.distance) * RATES[form.car]
//       : 0;

//   const sendWhatsApp = () => {
//     if (
//       !form.name ||
//       !form.phone ||
//       !form.pickup ||
//       !form.drop ||
//       !form.date ||
//       !form.time ||
//       !form.distance
//     ) {
//       alert("Please fill all the details before booking.");
//       return;
//     }

//     const msg = `*Madurai Solo Drop Taxi Booking*

// Name: ${form.name}
// Phone: ${form.phone}
// Pickup: ${form.pickup}
// Drop: ${form.drop}
// Date: ${form.date}
// Time: ${form.time}
// Vehicle: ${form.car.toUpperCase()}
// Distance: ${form.distance} km
// Estimated Fare: ₹${fare}
// `;

//     window.open(
//       `https://wa.me/918122746320?text=${encodeURIComponent(msg)}`,
//       "_blank"
//     );
//   };

//   return (
//     <section className="booking-section mb-5 mb-lg-6" id="book">
//       <div className="container">
//         <div className="row align-items-center g-5">
          
//           {/* LEFT SIDE */}
//           <div className="col-lg-5" data-aos="fade-right">
//             <h2 className="fw-bold mb-3">
//               Why Choose <span className="text-warning">Madurai Solo Drop Taxi ?</span>
//             </h2>
//             <p className="text-muted mb-4">
//               We specialize in safe, affordable and reliable outstation taxi services
//               from Madurai with transparent pricing and professional drivers.
//             </p>

//             <ul className="list-unstyled">
//               <li className="mb-3" data-aos="fade-up" data-aos-delay="100">One-way & Outstation Trips</li>
//               <li className="mb-3" data-aos="fade-up" data-aos-delay="200">Verified & Experienced Drivers</li>
//               <li className="mb-3" data-aos="fade-up" data-aos-delay="200">No Hidden Charges</li>
//               <li className="mb-3" data-aos="fade-up" data-aos-delay="200">On-time Pickup Guarantee</li>
//               <li className="mb-3" data-aos="fade-up" data-aos-delay="200">Madurai Based Trusted Service</li>
//             </ul>
//           </div>

//           {/* RIGHT SIDE FORM */}
//           <div className="col-lg-6"  data-aos="fade-left">
//             <div className="card shadow-lg border-0 rounded-4">
//               <div className="card-body p-4 p-md-5">
//                 <h3 className="fw-bold text-center mb-4">
//                   Book Your Taxi
//                 </h3>

//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label">Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="name"
//                       value={form.name}
//                       onChange={handleChange}
//                       placeholder="Your name"
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Phone Number</label>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       name="phone"
//                       value={form.phone}
//                       onChange={handleChange}
//                       placeholder="10-digit mobile number"
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Pickup Location</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="pickup"
//                       value={form.pickup}
//                       onChange={handleChange}
//                       placeholder="Pickup location"
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Drop Location</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="drop"
//                       value={form.drop}
//                       onChange={handleChange}
//                       placeholder="Drop location"
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Pickup Date</label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="date"
//                       value={form.date}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Pickup Time</label>
//                     <input
//                       type="time"
//                       className="form-control"
//                       name="time"
//                       value={form.time}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Vehicle Type</label>
//                     <select
//                       className="form-select"
//                       name="car"
//                       value={form.car}
//                       onChange={handleChange}
//                     >
//                       <option value="sedan">Sedan (₹14/km)</option>
//                       <option value="suv">SUV (₹18/km)</option>
//                       <option value="innova">Innova (₹20/km)</option>
//                     </select>
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Distance (optional)</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="distance"
//                       value={form.distance}
//                       onChange={handleChange}
//                       placeholder="Approx distance (km)"
//                     />
//                   </div>
//                 </div>

//                 <div className="alert alert-warning text-center fw-semibold mt-4">
//                   Estimated Fare: ₹{fare}
//                 </div>

//                 <div className="d-grid mt-3">
//                   <button
//                     className="btn btn-success btn-lg rounded-pill"
//                     onClick={sendWhatsApp}
//                   >
//                     Confirm & WhatsApp
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// export default BookingForm;
