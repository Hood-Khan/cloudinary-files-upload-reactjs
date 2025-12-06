import React, { useState } from "react";

function App() {
  const [image, setImage] = useState("");
  const [getimage, setGetImage] = useState("");

  const handleSubmitImage = () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "hooddemoapp");
    data.append("cloud_name", "diovnyjb2");

    fetch("https://api.cloudinary.com/v1_1/diovnyjb2/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGetImage(data.secure_url);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Upload Image to Cloudinary
        </h2>

        <div className="space-y-4">
          {/* File Input */}
          <input
            type="file"
            className="block w-full text-sm text-gray-700 
                     file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 
                     file:text-sm file:font-semibold 
                     file:bg-indigo-600 file:text-white 
                     hover:file:bg-indigo-700 cursor-pointer"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* Upload Button */}
          <button
            onClick={handleSubmitImage}
            className="w-full py-2 bg-indigo-600 text-white font-semibold 
                     rounded-lg shadow hover:bg-indigo-700 
                     transition duration-300 ease-in-out"
          >
            Upload
          </button>
        </div>

        {/* Display Uploaded Image */}
        {getimage && (
          <div className="mt-6">
            <img
              src={getimage}
              alt="Uploaded"
              className="w-full rounded-lg shadow border"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
