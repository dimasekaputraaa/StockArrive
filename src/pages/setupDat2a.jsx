import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

const Setup = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);

  const handleChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
    console.log(image);
  };

  const handleImagetoText = async () => {
    Tesseract.recognize(image, "eng")
      .then((res) => {
        setText(res.data.text);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <div className="container">
        <Input type="file" onChange={handleChange} />
      </div>
      <Button onClick={handleImagetoText}>convert</Button>
      {text && <p>{text}</p>}
    </>
  );
};
export default Setup;
