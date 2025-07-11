import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CONSTANTS } from '@/constants/http-status.constant';
import { FileUploadService } from '@/services/file-upload.service';

export class FileUploadController {

  constructor(private fileUploadService: FileUploadService) { }

  /**
   * Controller to handle file upload
   */
  uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.fileUploadService.uploadSingle(req.file);

      res.status(HTTP_STATUS_CONSTANTS.OK).json({
        message: "File uploaded successfully!",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Controller to handle multiple file upload
   */
  uploadMultiple = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.fileUploadService.uploadMultiple(req.files);

      res.status(HTTP_STATUS_CONSTANTS.OK).json({
        message: "Files uploaded successfully!",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}
