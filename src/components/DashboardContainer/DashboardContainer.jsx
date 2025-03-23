import "./DashboardContainer.scss";

const DashboardContainer = ({ children, header, style }) => {
  return (
    <div className="dashboard-container" style={style}>
      {children}
      <span className="dashboard-container-header">{header}</span>
    </div>
  );
};

export default DashboardContainer;
