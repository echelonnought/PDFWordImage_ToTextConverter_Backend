const { createWorker } = require('tesseract.js');
const pdfPoppler = require('pdf-poppler');
const mammoth = require('mammoth');
const fs = require('fs').promises;
const path = require('path');
const catchAsync = require("../utils/catchAsync");
const logger = require('../config/logger');


const convertDocs = catchAsync( async (req, res) => {

        // Initialize Tesseract worker
        const worker = await createWorker('eng');
        const filePath = req.file.path;
        const fileExt = path.extname(req.file.originalname).toLowerCase();
        let extractedText = '';
    
        if (fileExt === '.pdf') {
          const outputDir = path.join(__dirname, 'temp_images');
          await fs.mkdir(outputDir, { recursive: true });
    
          const options = {
            format: 'png',
            out_dir: outputDir,
            out_prefix: 'page',
            page: null, // Convert all pages
          };
    
          await pdfPoppler.convert(filePath, options);
    
          // Read and sort image files numerically
          const imageFiles = await fs.readdir(outputDir);
          const sortedImageFiles = imageFiles
            .filter(file => file.endsWith('.png'))
            .sort((a, b) => {
              const numA = parseInt(a.match(/page-(\d+)\.png/)[1], 10);
              const numB = parseInt(b.match(/page-(\d+)\.png/)[1], 10);
              return numA - numB;
            });
    
          // Process each image in order
          for (const imageFile of sortedImageFiles) {
            const imagePath = path.join(outputDir, imageFile);
            const { data: { text } } = await worker.recognize(imagePath);
            extractedText += text + '\n'; // Add newline between pages
            await fs.unlink(imagePath); // Clean up
          }
          await fs.rmdir(outputDir);
        } else if (fileExt === '.docx') {
          const result = await mammoth.extractRawText({ path: filePath });
          extractedText = result.value; // Naturally coherent order
        } else if (['.jpg', '.jpeg', '.png'].includes(fileExt)) {
          const { data: { text } } = await worker.recognize(filePath);
          extractedText = text || 'No text extracted from image';
          if (!text) console.log('Warning: No text detected in image:', filePath);
        } else {
          throw new Error(`Unsupported file extension: ${fileExt}`);
        }
    
        await fs.unlink(filePath);
        await worker.terminate();
    
        logger.info('Extracted text:', extractedText);
        res.json({ text: extractedText });
   
});

module.exports = convertDocs;