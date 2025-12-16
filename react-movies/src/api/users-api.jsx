const API = "http://localhost:8080/api/users";

const parse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.msg || "Username or password is wrong");
  }
  return data;
};

export const login = async (username, password) => {
  const response = await fetch(API, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  return parse(response);
};

export const signup = async (username, password) => {
  const response = await fetch(`${API}?action=register`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  return parse(response);
};