export const users = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Admin"
  },
  {
    email: "user@example.com",
    password: "user123",
    role: "user",
    name: "Mahasiswa"
  }
];

export const authenticate = (email, password) => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};
