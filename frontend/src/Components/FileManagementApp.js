import { useEffect, useState } from "react";
import './FileManagementApp.css';
import axios from "axios";
import PdfComp from "./PdfComp";
import { pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


function App() {
    const navigate = useNavigate(); // Initialize useNavigate  
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
      
    const handleHomeButtonClick = () => {
        navigate('/Home'); // Navigate to the home page
    };  
  

    return(
        <div className="App">
          {/* Home Button */}
                <button
                    className='home-button'
                    onClick={handleHomeButtonClick}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: '#ed7428',
                        border: 'none',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    ⬅️ Back
                </button>
            <form className="formStyle" onSubmit={submitImage}>
                <h4>Upload Pdf to USDA System</h4>
                <br />
                <input
                    type="text"
                    className="form-control inputField"
                    placeholder="Enter Title"
                    required
                    onChange={(e) => setTitle(e.target.value)}   
                />
                <input
                    type="file"
                    className="form-control inputField"
                    accept="application/pdf"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button className="btn btn-submit" type="submit">Submit</button>
            </form>
            <br />
            <div className="uploaded">
              <h3>Uploaded PDF:</h3>
            <div className="output-div">
              {allImage == null
                    ? <p>No PDFs uploaded yet.</p>
                    : allImage.map((data, index) => (
                  <div className="inner-div" key={index}>
                    <h4>Title: {data.title}</h4>
                    <button
                      className="btn btn-show"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
              ))}
        </div>
      </div>
      <div className="pdfdisplay"><PdfComp pdfFile={pdfFile}/></div>
    </div>
    );
}

export default App;
