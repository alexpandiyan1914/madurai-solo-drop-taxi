import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

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
      <div className="container">
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-md-4">
            <h3 className="contact-brand">Madurai Solo Drop Taxi</h3>
            <p className="contact-text">
              Trusted one-way taxi service from Madurai to anywhere in India.
              Clean cars, professional drivers, and transparent pricing.
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h5 className="contact-title">Contact</h5>
            <ul className="contact-list">
              <li>📞 +91 81227 46320</li>
              <li>💬 WhatsApp available</li>
              <li>📧 support@maduraisolodroptaxi.com</li>
              <li>🕒 24 / 7 Service</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="contact-title">Quick Links</h5>
            <ul className="contact-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#tariff">Tariff</a></li>
              <li><a href="#book">Book Taxi</a></li>
            </ul>
          </div>
        </div>

        <hr className="contact-divider" />

        <div className="text-center contact-footer">
          © {new Date().getFullYear()} Madurai Solo Drop Taxi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Contact;
