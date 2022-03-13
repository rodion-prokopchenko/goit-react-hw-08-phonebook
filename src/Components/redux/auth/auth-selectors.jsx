const getIsLoggedIn = (state) => state.auth.isLoggedIn;

const getUsername = (state) => state.auth.user.name;

const getEmail = (state) => state.auth.user.email;

const getToken = (state) => state.auth.token;

const getIsLoadingCurrentUser = (state) => state.auth.isLoadingCurrentUser;

const getLoginningUser = (state) => state.auth.isLoginningUser;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getEmail,
  getToken,
  getIsLoadingCurrentUser,
  getLoginningUser,
};
export default authSelectors;
