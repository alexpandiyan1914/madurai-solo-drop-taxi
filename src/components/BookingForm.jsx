import { useState } from "react";

function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    car: "sedan",
    distance: "",
  });

  const rates = { sedan: 14, suv: 18, innova: 20 };
  const fare = form.distance ? form.distance * rates[form.car] : 0;

  const sendWhatsApp = () => {
    const msg = `🚖 Madurai Solo Drop Taxi
Name: ${form.name}
Phone: ${form.phone}
Pickup: ${form.pickup}
Drop: ${form.drop}
Car: ${form.car}
Distance: ${form.distance} km
Fare: ₹${fare}`;

    window.open(
      `https://wa.me/918122746320?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <>
      <h2>Book Your Taxi</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} />
      <input placeholder="Phone" onChange={e => setForm({...form, phone:e.target.value})} />
      <input placeholder="Pickup Location" onChange={e => setForm({...form, pickup:e.target.value})} />
      <input placeholder="Drop Location" onChange={e => setForm({...form, drop:e.target.value})} />
      <input placeholder="Distance (km)" type="number" onChange={e => setForm({...form, distance:e.target.value})} />

      <select onChange={e => setForm({...form, car:e.target.value})}>
        <option value="sedan">Sedan</option>
        <option value="suv">SUV</option>
        <option value="innova">Innova</option>
      </select>

      <p><strong>Total Fare: ₹{fare}</strong></p>

      <button onClick={sendWhatsApp}>Confirm & WhatsApp</button>
    </>
  );
}

export default BookingForm;
