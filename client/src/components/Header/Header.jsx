import './Header.scss';
import { Link } from 'react-router-dom';
import bbLogo from '../../assets/images/bb_logo.png';

function Header () {
    return (
      <div className="main-page">
        <header className="main-page__header">
          <img src={bbLogo} alt="Beauty Buddy Logo" className="main-page__logo" />
          <nav className="main-page__nav">
            <Link to="/home" className="main-page__link">Home</Link>
            <Link to="/routines" className="main-page__link">Routines</Link>
            <Link to="/product-tracking" className="main-page__link">Product Tracking</Link>
          </nav>
        </header>
        </div>
    );
}

export default Header;
