import React, { useRef, useState } from "react";
import { Potrace } from "potrace";
import html2canvas from "html2canvas";

const VectorizeImage = () => {
  const [svgData, setSvgData] = useState(null);
  const imageRef = useRef();

  const handleVectorize = async () => {
    const canvas = await html2canvas(imageRef.current);
    const imageDataUrl = canvas.toDataURL("image/png");

    const potrace = new Potrace();
    potrace.loadImageFromUrl(imageDataUrl, () => {
      potrace.setParameter({ color: "black", background: "white" });
      potrace.process((err, svg) => {
        if (err) return console.error("Vectorization error:", err);
        setSvgData(svg);
      });
    });
  };

  return (
    <div>
      <div ref={imageRef} style={{ padding: "1em", background: "#fff" }}>
        <h2>Ukázkový obsah pro převod</h2>
        <p>Tento obsah bude převeden do SVG.</p>
      </div>
      <button onClick={handleVectorize}>Převést na SVG</button>
      {svgData && (
        <div>
          <h3>Výstup SVG:</h3>
          <div dangerouslySetInnerHTML={{ __html: svgData }} />
          <a
            href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              svgData
            )}`}
            download="vectorized_output.svg"
          >
            Stáhnout SVG
          </a>
        </div>
      )}
    </div>
  );
};

export default VectorizeImage;
