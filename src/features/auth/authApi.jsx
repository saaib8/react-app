// authAPI.js

const USERS_KEY = 'users';
const AUTH_USER_KEY = 'authUser';

// Utility to get all users from localStorage
const getStoredUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Utility to save users list to localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Create new user
export const signup = ({ name, email, password }) => {
  const users = getStoredUsers();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
  return newUser;
};

// Login existing user
export const login = ({ email, password }) => {
  const users = getStoredUsers();

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    throw new Error('Invalid email or password');
  }

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(foundUser));
  return foundUser;
};

// Logout user
export const logout = () => {
  localStorage.removeItem(AUTH_USER_KEY);
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_USER_KEY);
  return user ? JSON.parse(user) : null;
};
