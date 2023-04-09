const storeToken = (value) => {
  if (value) {
    console.log("in store token", value);
    const { access, refresh, user_id } = value;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user_id", user_id);
  }
};

const getToken = () => {
  const access = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");
  const user_id = localStorage.getItem("user_id");
  return { access, refresh, user_id };
};

const deleteToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_id");
};

export { storeToken, getToken, deleteToken };
