import { useEffect, useState } from "react";
import './FileManagementApp.css';
import axios from "axios";
import PdfComp from "./PdfComp";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


function App() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [allImage, setAllImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    
    useEffect(() => {
        getPdf();
      }, []);

    const getPdf = async () => {
        const result = await axios.get("http://localhost:8080/get-files");
        console.log(result.data.data);
        setAllImage(result.data.data);
      };

    const submitImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        console.log(title, file);
        const result = await axios.post("http://localhost:8080/upload-files",formData,{headers: { "Content-Type": "multipart/form-data" },});
        console.log(result);
        if (result.data.status === "ok") {
            alert("Uploaded Successfully!!!");
            getPdf();
          } 
      };

    const showPdf = (pdf) => {
        //window.open(`http://localhost:8080/files/${pdf}`, "_blank", "noreferrer");
        setPdfFile(`http://localhost:8080/files/${pdf}`) 
      };      
  

    return(
        <div className="App">
            <form className="formStyle" onSubmit={submitImage}>
                <h4>Upload Pdf to USDA System</h4>
                <br />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    required
                    onChange={(e) => setTitle(e.target.value)}   
                />
                <br />
                <input
                    type="file"
                    className="form-control"
                    accept="application/pdf"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <br />
                <button className="btn btn-primary" type="submit">
                Submit
                </button>
            </form>
            <br />
            <div className="uploaded">
            <h4>Uploaded PDF:</h4>
            <div className="output-div">
              {allImage == null
                    ? ""
                    : allImage.map((data, index) => (
                  <div className="inner-div" key={index}>
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
              ))}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile}/>
    </div>
    );
}

export default App;
