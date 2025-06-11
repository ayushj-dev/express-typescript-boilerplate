declare module 'express-serve-static-core' {
  interface Request {
    token?: string;
    user?: any;
    data?: any; // replace `any` with Zod.infer<typeof YourSchema>
  }
}

/* This empty export is required in order for the ts compiler to know that this is a module 
 * since we are declaring a module and we the file to behave like a ts module 
 *
 * NOTE: DO NOT REMOVE THIS! OR ENTIRE APP WILL BREAK!
 * */
export { }
