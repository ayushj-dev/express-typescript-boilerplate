import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CONSTANTS } from '@/constants/http-status.constant';
import { FileUploadService } from '@/services/file-upload.service';

export class FileUploadController {

  constructor(private fileUploadService: FileUploadService) { }

  uploadSingle = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(HTTP_STATUS_CONSTANTS.OK).json({
        message: "Health fetched successfully!",
        data: {
          meta: {},
          result: "File uploaded successfully"
        }
      });
    } catch (error) {
      next(error);
    }
  }

  uploadMultiple = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(HTTP_STATUS_CONSTANTS.OK).json({
        message: "Health fetched successfully!",
        data: {
          meta: {},
          result: "Files uploaded successfully"
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
