import crypto from 'crypto';

// Key and IV should be 32 bytes and 16 bytes respectively for AES-256-CBC
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16);  // 128-bit IV

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted
  };
}

export const decrypt = (encrypted: { iv: string, encryptedData: string }) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(encrypted.iv, 'hex')
  );

  let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}

/**
 * Example
 */
// const text = 'Hello, Node.js encryption!';
//
// const encrypted = encrypt(text);
// console.log('Encrypted:', encrypted);
//
// const decrypted = decrypt(encrypted);
// console.log('Decrypted:', decrypted);
