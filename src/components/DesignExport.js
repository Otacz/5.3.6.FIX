
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import VectorizeImage from "./VectorizeImage";

function DesignExport({ chat }) {
  const exportRef = useRef();

  const handleExportPDF = async () => {
    const canvas = await html2canvas(exportRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = 190;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, width, height);
    pdf.save("navrh.pdf");
  };

  const handleExportJPG = async () => {
    const canvas = await html2canvas(exportRef.current);
    const link = document.createElement("a");
    link.download = "navrh.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  if (!chat) return null;

  return (
    <div style={{ marginTop: "30px" }}>
      <div ref={exportRef} style={{
        padding: "20px",
        backgroundColor: "#fff",
        color: "#000",
        maxWidth: "600px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h3>Vizuální návrh</h3>
        <p><strong>Otázka:</strong> {chat.question}</p>
        <p><strong>Odpověď:</strong> {chat.answer}</p>
        {chat.image && (
          <img src={chat.image} alt="vizuál" style={{ maxWidth: "100%", marginTop: "10px" }} />
        )}
      </div>
      {chat.image && <VectorizeImage imageUrl={chat.image} />}
      <button onClick={handleExportPDF} style={{ marginRight: "10px", marginTop: "10px" }}>Export do PDF</button>
      <button onClick={handleExportJPG} style={{ marginTop: "10px" }}>Uložit jako JPG</button>
    </div>
  );
}

export default DesignExport;
