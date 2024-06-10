import "./Header.scss";
import { NavLink } from "react-router-dom";
import bbLogo from "../../assets/images/bb_logo.png";

function Header() {
  return (
    <div className="main">
      <header className="main__header">
        <img className="main__logo" src={bbLogo} alt="Beauty Buddy Logo" />
        <nav className="main__nav">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "main__link main__link--active" : "main__link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/routine"
            className={({ isActive }) =>
              isActive ? "main__link main__link--active" : "main__link"
            }
          >
            Routines
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "main__link main__link--active" : "main__link"
            }
          >
            Products
          </NavLink>
        </nav>
      </header>
    </div>
  );
}

export default Header;
