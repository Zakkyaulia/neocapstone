# API Documentation - Sistem Aspirasi

## Base URL
```
http://localhost:5000/api
```

## Authentication Routes

### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "nama": "John Doe",
    "email": "user@example.com",
    "role": "user"
  }
}
```

## Aspirasi Routes

### 1. Membuat Aspirasi Baru (User)
- **URL**: `/aspirasi/create`
- **Method**: `POST`
- **Body**:
```json
{
  "user_id": "1",
  "laporan": "Saya ingin mengusulkan perbaikan jalan di desa kami"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Aspirasi berhasil dibuat",
  "data": {
    "id": 1,
    "user_id": "1",
    "laporan": "Saya ingin mengusulkan perbaikan jalan di desa kami",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Mendapatkan Semua Aspirasi (Admin)
- **URL**: `/aspirasi/all`
- **Method**: `GET`
- **Response**:
```json
{
  "success": true,
  "message": "Data aspirasi berhasil diambil",
  "data": [
    {
      "id": 1,
      "user_id": "1",
      "laporan": "Saya ingin mengusulkan perbaikan jalan di desa kami",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": 1,
        "nama": "John Doe",
        "email": "user@example.com"
      }
    }
  ]
}
```

### 3. Mendapatkan Aspirasi Berdasarkan User ID
- **URL**: `/aspirasi/user/:user_id`
- **Method**: `GET`
- **Example**: `/aspirasi/user/1`
- **Response**:
```json
{
  "success": true,
  "message": "Data aspirasi user berhasil diambil",
  "data": [
    {
      "id": 1,
      "user_id": "1",
      "laporan": "Saya ingin mengusulkan perbaikan jalan di desa kami",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 4. Mendapatkan Aspirasi Berdasarkan ID
- **URL**: `/aspirasi/:id`
- **Method**: `GET`
- **Example**: `/aspirasi/1`
- **Response**:
```json
{
  "success": true,
  "message": "Data aspirasi berhasil diambil",
  "data": {
    "id": 1,
    "user_id": "1",
    "laporan": "Saya ingin mengusulkan perbaikan jalan di desa kami",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": 1,
      "nama": "John Doe",
      "email": "user@example.com"
    }
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "user_id dan laporan harus diisi"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User tidak ditemukan"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Terjadi kesalahan server",
  "error": "Error details"
}
```

## Cara Penggunaan

### Untuk User:
1. Login menggunakan endpoint `/auth/login`
2. Buat aspirasi menggunakan endpoint `/aspirasi/create` dengan user_id yang didapat dari login
3. Lihat aspirasi sendiri menggunakan endpoint `/aspirasi/user/:user_id`

### Untuk Admin:
1. Login menggunakan endpoint `/auth/login` dengan akun admin
2. Lihat semua aspirasi menggunakan endpoint `/aspirasi/all`
3. Lihat detail aspirasi tertentu menggunakan endpoint `/aspirasi/:id` 