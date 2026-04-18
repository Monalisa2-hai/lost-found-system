import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="services">
      <h2>Our Services</h2>

      <div className="serviceslist">

        {/* Report Lost */}
        <Link to="/report-lost" className="servicescard">
          <div className="servicesicon">📦</div>
          <h3>Report Lost Item</h3>
          <p>Report items you have lost so others can help find them.</p>
        </Link>

        {/* Report Found */}
        <Link to="/report-found" className="servicescard">
          <div className="servicesicon">🎒</div>
          <h3>Report Found Item</h3>
          <p>Submit items you found to help others recover them.</p>
        </Link>

        {/* Search */}
        <Link to="/search" className="servicescard">
          <div className="servicesicon">🔍</div>
          <h3>Search Items</h3>
          <p>Browse and search for lost or found items.</p>
        </Link>

      </div>
    </div>
  );
}