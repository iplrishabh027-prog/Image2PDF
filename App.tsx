import { useState } from "react";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Image to PDF Converter</h1>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            setFiles(Array.from(e.target.files));
          }
        }}
      />

      <p>{files.length} image(s) selected</p>

      <button
        style={{ padding: "10px", marginTop: "10px" }}
        disabled={files.length === 0}
      >
        Convert to PDF
      </button>
    </div>
  );
}

export default App;
