import "./AboutSection.scss";

const AboutSection = ({ title, children }) => {
  return (
    <div className="about-section-container">
      <h1 className="about-section-title">{title}</h1>
      {children}
    </div>
  );
};

export default AboutSection;
