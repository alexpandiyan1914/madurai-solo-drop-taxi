import Header from "./components/header";
import BookingForm from "./components/BookingForm";
import Services from "./components/Services";
import Tariff from "./components/Tarrif";
import Contact from "./components/Contact";
import Packages from "./components/Packages"

import { useEffect } from "react";
import AOS from "aos";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Header />
      <section id="home">
        <h1>Madurai Solo Drop Taxi</h1>
        <p>Reliable One-Way Taxi Services from Madurai</p>
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="tariff">
        <Tariff />
      </section>

      <section id="book">
        <BookingForm />
      </section>

      <section id="packages">
        <Packages />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
