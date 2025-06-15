# 🔐 Generate a Secure JWT Secret Using Node.js

To generate a strong secret key for signing JWTs, you can use Node.js's built-in `crypto` module:

---

### 📌 Explanation

- `crypto.randomBytes(64)` generates 64 bytes (512 bits) of cryptographically strong random data.
- `.toString('hex')` converts it into a hexadecimal string (128 characters).
- This secret is suitable for use with JWT HMAC algorithms like `HS256`, `HS384`, or `HS512`.

---

### ✅ Usage

1. Run the command `npm run generate-jwt-secret` to generate JWT secret.
2. Use the generated secret as your `JWT_SECRET` environment variable in `.env`:

```env
JWT_SECRET=your-generated-secret-here
```

> ⚠️ **Important:** Never commit your JWT secret to version control. Always load it from a secure environment variable or secret manager.
