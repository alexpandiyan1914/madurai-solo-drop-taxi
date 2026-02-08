import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

import logo from "../assets/logo.png";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaClock, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";

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

              <li>
                <a href="tel:+919655518489" className="footer-link">
                  <FaPhoneAlt /> +91 9655518489
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/919655518403?text=Hi%20I%20would%20like%20to%20book%20a%20taxi%20from%20Madurai."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <FaWhatsapp /> WhatsApp Available
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/madurai_solo_drop_taxi?igsh=MXBneGR0YnlzdTFkZg=="
                  target="_blank"
                  className="footer-link"
                >
                  <FaInstagram /> Instagram
                </a>
              </li>

              <li>
                <a
                  href="mailto:maduraisolodroptaxi@gmail.com"
                  className="footer-link"
                >
                  <FaEnvelope /> maduraisolodroptaxi@gmail.com
                </a>
              </li>

              <li>
                <FaClock /> 24 / 7 Service
              </li>

              <li>
                <FaMapMarkerAlt /> Madurai, Tamil Nadu
              </li>

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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.5599070332596!2d78.09269407479198!3d9.887239990212516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cfaa81328677%3A0x896829f9e682d3b0!2sMadurai%20Solo%20Drop%20Taxi!5e0!3m2!1sen!2sin!4v1770565215813!5m2!1sen!2sin"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Madurai Solo Drop Taxi · All rights reserved · Powered by Valyrian Coders
        </div>
      </div>
    </footer>
  );
}

export default Contact;
