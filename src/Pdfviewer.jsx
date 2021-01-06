import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf from './react.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const initialList = [];

const PDFView=()=>{
	
	const [totalPages,setTotalPages]=useState(0);
	const [pageNo,setPageNo]=useState(1);
	const [pdfFile,setPdfFile]=useState(pdf);
	
	
	function fileLoadSuccess({numPages})
	{
		setPageNo(1);
		setTotalPages(0);
		setTotalPages(numPages);
	}
	
	function setFile(event)
	{
		const file = event.target.files[0];
		const reader=new FileReader();
		reader.addEventListener('load',()=>{
			const result=reader.result;
			setPdfFile(result);
		});
		
		reader.readAsDataURL(file);
		
	}

	function showPrev()
	{
		if(pageNo>1)
		{
			setPageNo(pageNo-1);
		}
		else
		{
			setPageNo(pageNo)
		}
	}
	
	function showNext()
	{
		if(pageNo<totalPages)
		{
			setPageNo(pageNo+1);
		}
		else
		{
			setPageNo(pageNo)
		}
	}
	
	return(
		<>
	   <nav className='navbar'>
			<h3>PDF Viewer</h3>
			<button className="btn" onClick={showPrev}>
				<i className="fas fa-arrow-left"></i>Prev
			</button>
			<button className="btn" onClick={showNext}>
				Next<i className="fas fa-arrow-right"></i>
			</button>
			<div className="pdf-info">
				Page <span id="page-no">{pageNo}</span>
				Of <span id="total-pages">{totalPages}</span>
			</div>
			<input type="file" id="file" accept="application/pdf" onChange={setFile} style={{'display':'none'}}/>
			<label htmlFor='file' className='fas fa-file file-selector'></label>
		</nav>
		
		
		<Document file={pdfFile} onLoadSuccess={fileLoadSuccess} className='pdf-viewer'>
			<Page pageNumber={pageNo} scale={2}></Page>
		</Document>
		</>
	);
}

export default PDFView;	