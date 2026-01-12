import React, { useState } from 'react';
import { Camera, Upload, Sprout } from 'lucide-react';
import { analyzePlantImage } from './geminiService';

export default function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      try {
        const response = await analyzePlantImage(base64);
        setResult(response);
      } catch (err) {
        setResult("هەڵەیەک ڕوویدا لە کاتی پشکنین");
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1><Sprout color="green" /> گوڵەکەم</h1>
      <p>وێنەی گەڵای ڕووەکەکە دابنێ بۆ زانینی نەخۆشییەکەی</p>
      
      <input type="file" accept="image/*" onChange={handleImage} id="upload" hidden />
      <label htmlFor="upload" style={{ cursor: 'pointer', background: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
        {loading ? "خەریکی پشکنینە..." : "وێنە هەڵبژێرە"}
      </label>

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '10px' }}>
          <h3>ئەنجامی پشکنین:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
