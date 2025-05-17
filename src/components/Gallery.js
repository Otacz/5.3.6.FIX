
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import DesignExport from "./DesignExport";

function Gallery({ userId }) {
  const [designs, setDesigns] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      const db = getFirestore();
      const snapshot = await getDocs(collection(db, "geriapp-history"));
      const userDesigns = snapshot.docs
        .map(doc => doc.data())
        .filter(d => d.userId === userId && d.image);
      setDesigns(userDesigns);
    };
    fetchDesigns();
  }, [userId]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Galerie návrhů</h3>
      {designs.length === 0 && <p>Nemáš žádné uložené návrhy s obrázkem.</p>}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {designs.map((item, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            backgroundColor: "#fff"
          }}>
            <p><strong>{item.question}</strong></p>
            <img src={item.image} alt="návrh" style={{ width: "100%" }} />
            <button onClick={() => setSelected(item)} style={{ marginTop: "10px" }}>Zobrazit detail</button>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: "40px" }}>
          <DesignExport chat={selected} />
        </div>
      )}
    </div>
  );
}

export default Gallery;
