import { Request, Response } from 'express';

class FileController {
  public async uploadFile(req: Request, res: Response): Promise<Response> {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // The file is uploaded by multer middleware.
    // We construct the file path to be returned to the client.
    const filePath = `/${req.file.path}`;

    return res.status(201).json({
      message: 'File uploaded successfully.',
      filePath: filePath
    });
  }
}

export default new FileController();
