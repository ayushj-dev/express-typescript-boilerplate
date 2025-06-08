import argon2 from '@node-rs/argon2';

export const getHashedPassword = async (password: string) => await argon2.hash(password);

export const verifyPassword = async (hashedPassword: string, password: string) => await argon2.verify(hashedPassword, password);
