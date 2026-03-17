import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const productLinks = ["Features", "How It Works", "Pricing", "Integrations"];
  const supportLinks = ["Help Center", "Contact Us", "Community"];
  const companyLinks = ["About Us", "Careers", "Blog", "Press Kit"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"];

  const socialLinks = [
    { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/_yadav_vikas" },
    { label: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/vikasyadav1307" },
    { label: "X", icon: FaTwitter, href: "#" },
  ];

  return (
    <footer
      style={{
        padding: "40px 18px 24px",
        background:
          "radial-gradient(circle at 15% 0%, rgba(45, 212, 191, 0.16), transparent 42%), radial-gradient(circle at 80% 120%, rgba(20, 184, 166, 0.12), transparent 45%), linear-gradient(135deg, #0f766e 0%, #134e4a 100%)",
      }}
    >
      <style>{`
        .tp-footer-shell {
          width: min(1180px, 94vw);
          margin: 0 auto;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: clamp(20px, 3vw, 34px);
          font-family: Inter, Poppins, "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .tp-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1.3fr;
          gap: clamp(14px, 2.2vw, 28px);
        }

        .tp-brand-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .tp-logo-dot {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #178f89, #22b8a5);
          color: #fff;
          font-size: 0.82rem;
          font-weight: 700;
          display: grid;
          place-items: center;
          box-shadow: 0 10px 22px rgba(23, 143, 137, 0.32);
        }

        .tp-brand-name {
          margin: 0;
          color: #ffffff;
          font-size: 1.2rem;
          letter-spacing: 0.2px;
          font-weight: 800;
        }

        .tp-tagline {
          margin: 0 0 16px;
          color: #cbd5f5;
          font-size: 0.93rem;
          line-height: 1.65;
          max-width: 44ch;
        }

        .tp-contact {
          display: grid;
          gap: 7px;
          margin: 0;
          color: #cbd5f5;
          font-size: 0.86rem;
          line-height: 1.5;
        }

        .tp-section-title {
          margin: 4px 0 12px;
          color: #ffffff;
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 0.3px;
        }

        .tp-link-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 8px;
        }

        .tp-link {
          color: #cbd5f5;
          text-decoration: none;
          font-size: 0.86rem;
          font-weight: 600;
          transition: color 220ms ease, transform 220ms ease;
          display: inline-block;
        }

        .tp-link:hover {
          color: #2dd4bf;
          transform: translateX(3px);
        }

        .tp-social-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .tp-social-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(16, 123, 122, 0.2);
          background: #1e293b;
          color: #ffffff;
          display: grid;
          place-items: center;
          text-decoration: none;
          font-size: 1rem;
          transition: transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease;
        }

        .tp-social-icon:hover {
          transform: translateY(-2px) scale(1.1);
          background: #0f172a;
          color: #1e8e8e;
          box-shadow: 0 0 0 1px rgba(30, 142, 142, 0.45), 0 10px 22px rgba(30, 142, 142, 0.38);
        }

        .tp-news-text {
          margin: 0 0 12px;
          color: #cbd5f5;
          font-size: 0.85rem;
          line-height: 1.55;
        }

        .tp-news-form {
          display: grid;
          grid-template-columns: 1fr;
          gap: 9px;
        }

        .tp-input {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #1e293b;
          border-radius: 12px;
          padding: 10px 12px;
          color: #ffffff;
          font-size: 0.86rem;
          outline: none;
        }

        .tp-input::placeholder {
          color: #9ca3af;
        }

        .tp-input:focus {
          border-color: rgba(45, 212, 191, 0.65);
          box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.2);
        }

        .tp-subscribe-btn {
          border: 0;
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 0.84rem;
          font-weight: 800;
          color: #fff;
          cursor: pointer;
          background: linear-gradient(120deg, #14b8a6, #2dd4bf);
          box-shadow: 0 10px 22px rgba(20, 184, 166, 0.35);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .tp-subscribe-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 30px rgba(45, 212, 191, 0.45);
        }

        .tp-footer-bottom {
          margin-top: 24px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(15, 23, 42, 0.28);
          border-radius: 12px;
          padding: 12px 14px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          color: #cbd5f5;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .tp-bottom-links {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .tp-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .tp-footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="tp-footer-shell">
        <div className="tp-footer-grid">
          <section>
            <div className="tp-brand-row">
              <span className="tp-logo-dot">TP</span>
              <h3 className="tp-brand-name">TripPilot</h3>
            </div>
            <p className="tp-tagline">
              We Sync, AI Plans. You Explore. Your intelligent travel companion for seamless adventures around the world.
            </p>
            <div className="tp-contact">
              <span>Knowledge Park 2, Greater Noida, Uttar Pradesh, India</span>
              <span>+91 9278464742</span>
              <span>yadavvikas1307@gmail.com</span>
            </div>
            <div className="tp-social-row">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  className="tp-social-icon"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon />
                </a>
              ))}
            </div>
          </section>

          <section>
            <h4 className="tp-section-title">Product</h4>
            <ul className="tp-link-list">
              {productLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="tp-link">{item}</a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="tp-section-title">Support</h4>
            <ul className="tp-link-list">
              {supportLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="tp-link">{item}</a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="tp-section-title">Company</h4>
            <ul className="tp-link-list">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="tp-link">{item}</a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="tp-section-title">Legal</h4>
            <ul className="tp-link-list" style={{ marginBottom: "14px" }}>
              {legalLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="tp-link">{item}</a>
                </li>
              ))}
            </ul>

            <h4 className="tp-section-title" style={{ marginTop: "2px" }}>Stay Updated</h4>
            <p className="tp-news-text">Get travel tips powered by AI</p>
            <form className="tp-news-form" onSubmit={(e) => e.preventDefault()}>
              <input className="tp-input" type="email" placeholder="Enter your email" aria-label="Email address" />
              <button className="tp-subscribe-btn" type="submit">Subscribe</button>
            </form>
          </section>
        </div>

        <div className="tp-footer-bottom">
          <span>© 2026 TripPilot</span>
          <span className="tp-bottom-links">
            <a href="#" className="tp-link">Sitemap</a>
            <span>|</span>
            <a href="#" className="tp-link">Accessibility</a>
            <span>|</span>
            <a href="#" className="tp-link">Cookie Settings</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;