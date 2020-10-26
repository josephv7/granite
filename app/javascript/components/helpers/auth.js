const authenticated = () => {
  // console.log(localStorage.getItem("authToken"));
  return !(localStorage.getItem("authToken") === null);
};

export default authenticated;
