export class FileUploadService {
  constructor() { }

  /**
   * Function to perform some operation on file upload
   */
  async uploadSingle(file?: Express.Multer.File) {
    if (!file) {
      return {
        meta: {},
        result: `No file uploaded`
      };
    }

    console.log(file);

    console.log(`File ${file.originalname} uploaded successfully!`);

    return {
      meta: {},
      result: `File uploaded successfully!`
    };
  }

  /**
   * Function to perform some operation on multiple file upload
   */
  async uploadMultiple(files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[]; }) {
    if (!files) {
      return {
        meta: {},
        result: `No files uploaded`
      };
    }

    console.log(`Files:`);

    /* If type is Express.Multer.File[] */
    if (Array.isArray(files)) {
      for (const file of files) {
        console.log(file.originalname);
      }

      console.log(`uploaded successfully!`);

      return {
        meta: {},
        result: `Files uploaded successfully!`
      };
    }

    /* If type is { [fieldname: string]: Express.Multer.File[]; } */
    for (const field in files.entries) {
      for (const file of files[field]) {
        console.log(file.originalname);
      }
    }

    return {
      meta: {},
      result: `Files uploaded successfully!`
    };
  }
}
