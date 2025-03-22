# PDF, Word, and Image to Text Converter

A powerful backend service that extracts text from various document formats using OCR and text extraction techniques. This application provides a simple API endpoint for converting PDF documents, Word files, and images to plain text.

![Document Converter Banner](https://via.placeholder.com/800x200?text=Document+to+Text+Converter)

## Features

- **PDF Conversion**: Extract text from PDF documents using advanced OCR
- **Word Document Processing**: Convert .docx files to plain text
- **Image OCR**: Extract text from JPG and PNG images
- **Simple REST API**: Easy-to-use endpoint for file uploads and text extraction
- **Rate Limiting**: Prevents API abuse
- **Robust Error Handling**: Comprehensive error management
- **Containerized**: Docker support for easy deployment

## Tech Stack

- **Node.js** with Express.js
- **Tesseract.js** for OCR functionality
- **Mammoth** for Word document processing
- **PDF-Poppler** for PDF to image conversion
- **Multer** for file upload handling
- **Winston** for logging
- **Docker** for containerization

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Tesseract OCR engine with English language data

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pdf-word-image-to-text-converter.git
   cd pdf-word-image-to-text-converter/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an uploads directory:
   ```bash
   mkdir uploads
   ```

4. Create a .env file with the following content:
   ```
   PORT=4000
   ```

5. Start the application:
   ```bash
   npm start
   ```

The server will be running at `http://localhost:4000`.

## Docker Installation

To run the application using Docker:

1. Build the Docker image:
   ```bash
   docker build -t pdf-word-image-converter .
   ```

2. Run the container:
   ```bash
   docker run -p 4000:4000 pdf-word-image-converter
   ```

## API Usage

The application exposes a single endpoint for file conversion:

### POST /upload

Upload a file to extract text.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `file`: The document file (PDF, DOCX, JPG, PNG)

**Response:**
- Status: 200 OK
- Content-Type: application/json
- Body:
  ```json
  {
    "text": "Extracted text content from the document"
  }
  ```

**Example using cURL:**
```bash
curl -X POST \
  http://localhost:4000/upload \
  -F "file=@/path/to/your/document.pdf"
```

**Example using Fetch API:**
```javascript
const formData = new FormData();
formData.append('file', document);

fetch('http://localhost:4000/upload', {
  method: 'POST',
  body: formData,
})
  .then(response => response.json())
  .then(data => console.log(data.text))
  .catch(error => console.error('Error:', error));
```

## Limitations

- Maximum file size: 10MB
- Supported file formats: PDF, DOCX, JPG, PNG
- OCR accuracy may vary depending on the quality of the input document

## Deployment

The application can be deployed to any Node.js hosting platform. It's currently configured to work with a frontend hosted on Vercel.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 