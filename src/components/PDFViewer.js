import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import NoteClipper from './NoteClipper';

import './PDFViewer.less';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

export default function PDFViewer() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [virtualReference, setVirtualReference] = useState(null);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function putTooltipAtSelectedText() {
    {
      let selection = document.getSelection();
      if (!selection.isCollapsed) {
        setVirtualReference(selection.getRangeAt(0));
        setShowTooltip(true);
      }
    }
  }

  function hideTooltip() {
    if (showTooltip) {
      setShowTooltip(false);
    }
  }

  return (
    <div className="main" onMouseDown={() => hideTooltip()}>
      <NoteClipper virtualReference={virtualReference} toShow={showTooltip} />
      <header>
        <h1>PDF Sample</h1>
      </header>
      <div className="main__container">
        <div className="main__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="main__container__document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                onMouseUp={() => putTooltipAtSelectedText()}
              ></Page>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
