import { Link } from "react-router-dom";
import React from "react";

export default function Header() {
    return (
        <header className="header">
            <div className="logo-section">
                <img src="/logo.jpg" alt="Logo" className="logo-img" />
                <h2 className="logo-text">USIU Lost & Found</h2>
            </div>

            <nav className="nav-links">
                <Link to="/" className="nav-item">Home</Link>
                <Link to="/services" className="nav-item">Services</Link>
                <Link to="/signup" className="nav-item">Sign up</Link>
                <Link to="/login" className="nav-item">Login</Link>
            </nav>
        </header>
    );
}