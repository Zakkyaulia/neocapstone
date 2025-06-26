// src/createAdmin.js

export function createAdminAccount() {
  const adminAccount = {
    name: "Admin UNAND",
    email: "admin@unand.ac.id",
    password: "admin123",
    role: "admin"
  };

  localStorage.setItem("user", JSON.stringify(adminAccount));
  console.log("✅ Admin account created! Use admin@unand.ac.id / admin123 to login.");
}
