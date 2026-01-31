import logo from "../assets/logo.png";
import "./header.css";

function Header() {
  const closeMenu = () => {
    const nav = document.getElementById("taxiNav");
    if (nav.classList.contains("show")) {
      nav.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top taxi-navbar" data-aos="fade-down">
      <div className="container-fluid px-4">

        {/* LOGO */}
        <a className="navbar-brand d-flex align-items-center taxi-logo" href="#home" onClick={closeMenu}>
          <img src={logo} alt="Madurai Taxi" className="logo-img" />
          <span>Madurai Solo Drop Taxi</span>
        </a>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#taxiNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="taxiNav">
          <ul className="navbar-nav ms-auto">
            {["home", "services", "tariff","packages", "contact", "book"].map((item) => (
              <li className="nav-item" key={item}>
                <a
                  className={`nav-link ${item === "book" ? "book-btn" : ""}`}
                  href={`#${item}`}
                  onClick={closeMenu}
                >
                  {item === "book" ? "Book Now" : item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Header;