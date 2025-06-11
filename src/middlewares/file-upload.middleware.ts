import multer, { diskStorage, memoryStorage } from "multer";
import path from "path";

const filePath = path.resolve(__dirname, `@/@/public/uploads/`);

export const uploadToBuffer = multer({ storage: memoryStorage() });
export const uploadToDisk = multer({ storage: diskStorage({ destination: filePath }) });
