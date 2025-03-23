const isMobile =
  /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone|Opera Mini|IEMobile/i.test(
    navigator.userAgent
  );

export default isMobile;
