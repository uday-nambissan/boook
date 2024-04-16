"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

/////////react-pdf worker///////////////
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

function page({params}) {
    /////////////////React pdf numbering/////////////////////////
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom]=useState(1)
  const [toggle,setToggle]=useState(false)
  const handle = useFullScreenHandle();

  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  return (
    <FullScreen handle={handle}>
        <div className="w-screen min-h-screen flex flex-col items-center bg-yellow-500">
          
          <div>
          <button onClick={handle.enter} style={{display: handle.active ? 'none' : 'inline'}}>
       fullscreen
      </button>
      <button onClick={handle.exit} style={{display: handle.active ? 'inline': 'none'  }}>
       Exit
      </button>
        <button
          type="button"
          
          onClick={()=>{setZoom(zoom-0.2)}}
        >
          -
        </button>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
        <button
          type="button"
          
          onClick={()=>{setZoom(zoom+0.2)}}
        >
          +
        </button>
      </div>
          <Document
        file={`books/${params.pdf}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} 
  renderTextLayer={false} width={window.innerWidth * 0.92} scale={zoom}/>
      </Document>
      <div className='flex'>
      <p onClick={()=>{numPages>1 && setToggle(true)}}>
  Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
</p>
<button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
<input
  type="number"
  style={{ display: numPages > 1 & toggle ? 'inline-block' : 'none' }}
  min="1"
  max={numPages || ''}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      const page = parseInt(e.target.value);
      setToggle(false)
      if (!isNaN(page) && page >= 1 && page <= numPages) {
        setPageNumber(page);
      }
    }
  }}
/>
</div> 
     
      </div>
      </FullScreen>
  )
}

export default page