import crypto from 'crypto';

const secret = crypto.randomBytes(64).toString('hex');

console.log('Generated JWT Secret:', secret);
