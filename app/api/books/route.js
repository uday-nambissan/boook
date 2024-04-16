import fs from 'fs';
import path from 'path';
import {NextResponse} from 'next/server'

export const GET = async (request, response) => {
    const publicFolderPath = path.join(process.cwd(), 'public/books');
    const allowedExtensions = ['.pdf', '.docx', '.txt']; // Example: PDF, Word, and Text files
        
    try {
        const files = await fs.promises.readdir(publicFolderPath);
        // var pdfFiles = files.filter(function(file){
        //     return file && path.extname(file).toLowerCase() === '.pdf';
        // });
        // console.log(pdfFiles.datatype)
        return NextResponse.json( {files} );
    } catch (err) {
        console.error('Error reading directory:', err);
        return NextResponse.error("Failed to read directory.");
    }
  };