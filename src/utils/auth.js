// src/utils/auth.js

// Ambil user dari localStorage
export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Cek apakah user sudah login
export function isLoggedIn() {
  return !!getCurrentUser();
}

// Ambil role dari user (admin / user)
export function getUserRole() {
  const user = getCurrentUser();
  return user?.role || null;
}

// Logout user
export function logout() {
  localStorage.removeItem("user");
}
