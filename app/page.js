"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'



/////////////app start//////////////////
export default function Home() {

/////////////getting files from api/////////////
  const [files, setFiles] = useState([]);
  
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/api/books');
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);
  

  ////////////////frontend///////////////////////////

  return (
    <div>
      <h1>Files List:</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}><Link href={`/${file}`}>{file}</Link></li>
        ))}
      </ul>
      
    </div>
  );
}
