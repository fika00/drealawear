import "./About.scss";
import AboutSection from "./AboutSection/AboutSection";

// All products are subject to availability.

// Prices and descriptions are subject to change without notice.

// Unauthorized use of any content from our website is prohibited.

// Returns and exchanges are only accepted within [X] days of purchase, following our return policy.
const About = () => {
  return (
    <div className="about-container">
      <div className="about-container-inner">
        <AboutSection title="Our Brand">
          <p className="about-section-description">
            At DrealWear, we're more than just a clothing brand – we're a
            lifestyle movement. Founded by a group of passionate creators and
            dreamers, we believe in the power of self-expression through
            fashion, design, and digital innovation.
          </p>
          <p className="about-section-description">
            Our mission is to inspire people to live their lives to the fullest,
            embracing both style and adventure. Through our carefully crafted
            clothing collections, innovative designs, and cutting-edge web
            presence, we create more than just products – we create experiences
            that empower our community to express their unique identity.
          </p>
          <p className="about-section-description">
            We're driven by the belief that fashion should be both functional
            and expressive, perfect for those who chase their dreams while
            looking effortlessly cool. Whether you're hitting the streets,
            pursuing your passions, or pushing your boundaries, DrealWear is
            here to accompany you on your journey.
          </p>
        </AboutSection>
        <AboutSection title="Terms of Use">
          <p className="about-section-description">
            Welcome to our online store. By using our website and purchasing our
            products, you agree to the following terms and conditions:
          </p>
          <ul className="about-section-list">
            <li className="about-section-list-item">
              All products are subject to availability.
            </li>
            <li className="about-section-list-item">
              Prices and descriptions are subject to change without notice.
            </li>
            <li className="about-section-list-item">
              Unauthorized use of any content from our website is prohibited.
            </li>
            <li className="about-section-list-item">
              All sales are final. No refunds or returns will be provided.
            </li>
          </ul>
        </AboutSection>

        <AboutSection title="Data Protection">
          <h3 className="about-section-subtitle">How We Protect Your Data</h3>
          <p className="about-section-description">
            We implement industry-standard security measures, including:
          </p>
          <ul className="about-section-list">
            <li className="about-section-list-item">
              <strong>JWT Authentication:</strong> Secure token-based login
              system
            </li>
            <li className="about-section-list-item">
              <strong>SSL Encryption:</strong> Protects data transmission
            </li>
            <li className="about-section-list-item">
              <strong>Access Controls:</strong> Limits access to sensitive data
            </li>
          </ul>
        </AboutSection>

        <AboutSection title="Information Sharing">
          <h3 className="about-section-subtitle">Sharing of Information</h3>
          <p className="about-section-description">
            We do not sell your data. However, we may share information with:
          </p>
          <ul className="about-section-list">
            <li className="about-section-list-item">
              <strong>Service Providers:</strong> Payment processors, shipping
              carriers, and email marketing services
            </li>
            <li className="about-section-list-item">
              <strong>Legal Compliance:</strong> If required by law to disclose
              information
            </li>
          </ul>
        </AboutSection>

        <AboutSection title="Privacy Policy">
          <p className="about-section-description">
            Welcome to our online store. Protecting your privacy is our
            priority. This Privacy Policy outlines how we collect, use, and
            protect your personal information when you visit our website and use
            our services.
          </p>

          <h3 className="about-section-subtitle">1. Information We Collect</h3>
          <p className="about-section-description">
            We collect the following types of personal information:
          </p>
          <ul className="about-section-list">
            <li className="about-section-list-item">
              Account Information: Name, email, phone number, billing/shipping
              address.
            </li>
            <li className="about-section-list-item">
              Payment Information: Securely processed via third-party payment
              providers.
            </li>
            <li className="about-section-list-item">
              Order History: Items purchased, order dates, and transaction
              details.
            </li>
            <li className="about-section-list-item">
              JWT-Based Authentication Data: For secure session management.
            </li>
            <li className="about-section-list-item">
              Cookies & Tracking Data: IP address, browser type, and browsing
              behavior.
            </li>
          </ul>

          <h3 className="about-section-subtitle">
            2. How We Use Your Information
          </h3>
          <ul className="about-section-list">
            <li className="about-section-list-item">
              Process orders and manage your account.
            </li>
            <li className="about-section-list-item">
              Authenticate users securely using JWT tokens.
            </li>
            <li className="about-section-list-item">
              Improve website functionality and user experience.
            </li>
            <li className="about-section-list-item">
              Send marketing emails (only if you opt-in).
            </li>
            <li className="about-section-list-item">
              Prevent fraud and enhance security.
            </li>
          </ul>

          <h3 className="about-section-subtitle">3. Your Rights</h3>
          <p className="about-section-description">You have the right to:</p>
          <ul className="about-section-list">
            <li className="about-section-list-item">
              Access & Update Your Information
            </li>
            <li className="about-section-list-item">Request Data Deletion</li>
            <li className="about-section-list-item">
              Opt-out of Marketing Emails
            </li>
          </ul>

          <p className="about-section-description">
            By using our website, you agree to this Privacy Policy. For any
            questions, please contact us at info@drealwear.com
          </p>
        </AboutSection>
      </div>
    </div>
  );
};

export default About;
