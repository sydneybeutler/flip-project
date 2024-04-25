import UserPool, { CognitoDomain, yourAppDomain } from "./cognitoConfig";
import { setToken, setId } from "../reducers/authSlice";


export const saveTokenToState = (token) => (dispatch) => {
  dispatch(setToken(token)); // Assuming setToken is an action in your Redux slice that saves the token
};

export const saveIdToState = (id) => (dispatch) => {
  dispatch(setId(id));
};

// Function to parse the hash from the URL and extract the ID token
export const parseTokenFromUrl = () => {
  const hash = window.location.hash.substr(1);
  const result = hash.split('&').reduce(function (res, item) {
    const parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
  }, {});
  return result.id_token;
};

// Function to redirect to Cognito Hosted UI
export const redirectToLogin = () => {
  const domain = CognitoDomain;
  const clientId = UserPool.getClientId();
  const responseType = "token";
  const redirectUri = encodeURIComponent(yourAppDomain); // Make sure to URL-encode this
  
  console.log("RedirectToLogin called")

  const loginUrl = `${domain}/login?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`;

  window.location.assign(loginUrl);
};

export const logout = () => {
  const domain = CognitoDomain;
  const clientId = UserPool.getClientId();
  const logoutUri = encodeURIComponent(yourAppDomain);

  const logoutUrl = `${domain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;

  window.location.assign(logoutUrl);
};

export const redirectToSignUp = () => {
    const responseType = "token";
    const redirectUri = encodeURIComponent(yourAppDomain);
    const signUpUrl = `https://${UserPool.getClientId()}.auth.${UserPool.getUserPoolId().split('_')[0]}.amazoncognito.com/signup?response_type=${responseType}&client_id=${UserPool.getClientId()}&redirect_uri=${redirectUri}`;

    window.location.assign(signUpUrl);
};