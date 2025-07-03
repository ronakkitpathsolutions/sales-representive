import { jwtDecode } from 'jwt-decode';

export const logError = error => {
  console.error('Error:', error);
};

// local storage utility functions
export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = key => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeLocalStorage = key => {
  localStorage.removeItem(key);
};

export const getRandomImage = (height = 720, width = 1280) => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/id/${randomNumber}/${width}/${height}?grayscale`;
};

// Utility function to generate a random password
export const generateRandomPassword = () => {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  const allChars = upperCase + lowerCase + numbers + specialChars;

  const getRandomChar = chars =>
    chars[Math.floor(Math.random() * chars.length)];

  // Ensure the password includes at least one of each required character type
  const password = [
    getRandomChar(upperCase),
    getRandomChar(lowerCase),
    getRandomChar(numbers),
    getRandomChar(specialChars),
  ];

  // Fill the rest of the password with random characters
  for (let i = password.length; i < 8; i++) {
    password.push(getRandomChar(allChars));
  }

  // Shuffle the password to randomize character order
  return password.sort(() => Math.random() - 0.5).join('');
};

export const apiAsyncHandler = async (
  handleTry,
  handleCatch,
  handleFinally
) => {
  try {
    const response = await handleTry();
    return response;
  } catch (error) {
    logError(error);
    if (handleCatch && typeof handleCatch === 'function') {
      return handleCatch(error);
    }
    return null;
  } finally {
    if (handleFinally && typeof handleFinally === 'function') {
      handleFinally();
    }
  }
};

export const errorHandler = (handleTry, handleCatch, handleFinally) => {
  try {
    const response = handleTry();
    return response;
  } catch (error) {
    logError(error);
    if (handleCatch && typeof handleCatch === 'function') {
      return handleCatch(error);
    }
    return null;
  } finally {
    if (handleFinally && typeof handleFinally === 'function') {
      handleFinally();
    }
  }
};

export const getTotalPages = (totalData, limit) => {
  if (limit <= 0) {
    return 1;
  }

  return Math.ceil(totalData / limit);
};

export const formatListWithAnd = arr => {
  if (!Array.isArray(arr)) {
    return '';
  }

  const len = arr.length;

  if (len === 0) {
    return '';
  }
  if (len === 1) {
    return arr[0];
  }
  if (len === 2) {
    return `${arr[0]} and ${arr[1]}`;
  }

  // For 3 or more items
  const allButLast = arr.slice(0, -1).join(', ');
  const last = arr[len - 1];
  return `${allButLast} and ${last}`;
};

// decode token
export const decodeToken = (token = null) => {
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token);
  return decoded;
};

export const isTokenActive = (token = null) => {
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode(token);
    return decoded?.exp && decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};
