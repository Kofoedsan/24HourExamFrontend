import URL from "./URL";

function apiFacade() {

  const handleHttpErrors = async (res) => {
    if (!res.ok) {
      return Promise.reject({ status: res.status, redirected: res.json() });
    }
    return res.json();
  }

  const myFetchErrors = async (res, setRes) => {
    if (res.status === 500) {
      setRes("A generel error has occured. Please contact support")
    } else if (res.status === 200) {
      setRes("Success")
    } else if (res.status !== 500 && res.status !== 200) {
      let err = await res.json()
      setRes("Error code " + err.code + " " + err.message);
    }
  }

  const setToken = (token) => {
    localStorage.setItem("jwtTokenKofoedsystem", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtTokenKofoedsystem");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtTokenKofoedsystem");
  };

  const login = (user, password, setLoggedIn) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      })
  };

  const makeOptions = (method, addToken, body, body2) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return "";
  };

  const getUserName = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const userName = decodedClaims.username;
      return userName;
    } else return "";
  };

  const getUserId = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const id = decodedClaims.id;
      return id;
    } else return "";
  };

  const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(",");
    return loggedIn && roles.includes(neededRole);
  };

  const adminAccess = (setLoggedIn) => {
    let token = facade.getUserRoles()
    if (!token.includes('admin') && !token.includes("superuser")) {
      window.location.href = '/Unauthorized';
    } else {
      setLoggedIn(true)
    }
  }

  const userAccess = (setLoggedIn) => {
    let token = facade.getUserRoles()
    if (!token.includes('user') && !token.includes("superuser")) {
      window.location.href = '/Unauthorized';
    } else {
      setLoggedIn(true)
    }
  }

  const superUserAccess = (setLoggedIn) => {
    let token = facade.getUserRoles()
    if (!token.includes("superuser")) {
      window.location.href = '/Unauthorized';
    } else {
      setLoggedIn(true)
    }
  }

  const loginCheck = (loggedIn) => {
    if (loggedIn === true) {
      return false;
    }
    return true;
  };

  const tokenCheck = (setLoggedIn) => {
    let token = facade.getUserRoles()
    if (token.includes('user') || token.includes("superuser") || token.includes("admin")) {
      setLoggedIn(true)
    }
  }

  const tokenValid = (setLoggedIn) => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      let dateAsInt = new Date().getTime() / 1000

      let dateAsIntFixed = dateAsInt.toFixed(0)

      if (dateAsIntFixed - decodedClaims.iat > 1800) {
        setLoggedIn(false)
      }

    }
  };

  return {
    handleHttpErrors,
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    getUserRoles,
    hasUserAccess,
    loginCheck,
    tokenCheck,
    getUserName,
    getUserId,
    adminAccess,
    userAccess,
    superUserAccess,
    myFetchErrors,
    tokenValid,
  };
}
const facade = apiFacade();
export default facade;