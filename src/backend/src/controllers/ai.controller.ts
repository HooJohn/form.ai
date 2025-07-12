import { Request, Response, NextFunction } from 'express';
import * as aiService from '../services/ai.service';

/**
 * @description Extract structured information from natural language text
 * @route POST /api/ai/extract-info
 */
export const extractInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ message: 'Text for extraction is required.' });
    }

    const extractedData = await aiService.extractInfoFromText(text);
    res.status(200).json(extractedData);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Upload a file, perform OCR, and analyze the form structure
 * @route POST /api/ai/ocr-upload
 */
export const ocrUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const formStructure = await aiService.analyzeFormDocument(req.file.path);
    
    // Optional: Clean up the uploaded file after processing
    // fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: 'Form analyzed successfully.',
      data: formStructure,
    });
  } catch (error) {
    // Optional: Clean up the file on error as well
    if (req.file) {
      // fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};
