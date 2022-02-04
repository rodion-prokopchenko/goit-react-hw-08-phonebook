const getIsLoggedIn = (state) => state.auth.isLoggedIn;

const getUsername = (state) => state.auth.user.name;

const getEmail = (state) => state.auth.user.email;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getEmail,
};
export default authSelectors;
