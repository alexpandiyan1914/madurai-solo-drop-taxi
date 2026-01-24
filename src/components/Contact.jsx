import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

import logo from "../assets/logo.png";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className={`contact-section ${visible ? "entered" : ""}`}
    >
      <div className="container" >
        <div className="footer-grid">

          {/* BRAND */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="100">
            <div className="footer-brand">
              <img src={logo} alt="Madurai Solo Drop Taxi" />
              <h4>Madurai Solo Drop Taxi</h4>
            </div>
            <p className="footer-desc">
              Trusted one-way taxi service from Madurai to anywhere in India.
              Clean cars, professional drivers, transparent pricing.
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
            <h5 className="footer-title">Contact</h5>
            <ul className="footer-list">
              <li><FaPhoneAlt /> +91 81227 46320</li>
              <li><FaWhatsapp /> WhatsApp Available</li>
              <li><FaEnvelope /> maduraisolodroptaxi@gmail.com</li>
              <li><FaClock /> 24 / 7 Service</li>
              <li><FaMapMarkerAlt /> Madurai, Tamil Nadu</li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="300">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#tariff">Tariff</a></li>
              <li><a href="#packages">Packages</a></li>
              <li><a href="#book">Book Taxi</a></li>
            </ul>
          </div>

          {/* MAP */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="400">
            <h5 className="footer-title">Our Location</h5>
            <div className="map-wrapper">
              <iframe
                title="Madurai Solo Drop Taxi Location"
                src="https://www.google.com/maps?q=Madurai,Tamil%20Nadu&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>


        <hr />

        <div className="footer-bottom">
          © {new Date().getFullYear()} Madurai Solo Drop Taxi · All rights reserved · Powered by Valyrian Coders
        </div>
      </div>
    </footer>
  );
}

export default Contact;
