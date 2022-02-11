const getIsLoggedIn = (state) => state.auth.isLoggedIn;

const getUsername = (state) => state.auth.user.name;

const getEmail = (state) => state.auth.user.email;

const getToken = (state) => state.auth.token;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getEmail,
  getToken,
};
export default authSelectors;
