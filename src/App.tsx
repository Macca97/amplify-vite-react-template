import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    if (!prompt) return alert('Please enter a prompt');
    setLoading(true);
    try {
      const response = await axios.post(
        'http://k8s-stabledi-stabledi-60974d5595-1390935052.ap-southeast-2.elb.amazonaws.com/imagine',
        { prompt },
        { responseType: 'arraybuffer' } // Expect binary data
      );
      // Convert binary data to base64
      const base64Image = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
      setImage(base64Image);
    } catch (error) {
      console.error('Error details:', error.response || error.message);
      alert('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stable Diffusion App</h1>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleGenerateImage} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
        {image && (
          <div>
            <h2>Generated Image</h2>
            <img src={image} alt="Generated" />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;