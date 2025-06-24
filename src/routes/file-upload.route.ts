import { Router } from 'express';
import { FileUploadController } from '@/controllers/file-upload.controller';
import { FileUploadService } from '@/services/file-upload.service';
import { uploadToDisk } from '@/middlewares/file-upload.middleware';

const fileUploadRouter = Router();

const fileUploadService = new FileUploadService();

const fileUploadController = new FileUploadController(fileUploadService);

/* Routes start here */

fileUploadRouter.post('/single', uploadToDisk.single('img'), fileUploadController.uploadSingle);
fileUploadRouter.post('/multiple', uploadToDisk.array('imgs'), fileUploadController.uploadMultiple);

/* Routes end here */

export { fileUploadRouter };
