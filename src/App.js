import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

function App() {
  const [url, setUrl] = useState('');
  const [scrapData, setScrapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Initialize dark mode based on user system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      applyDarkMode(true);
    }
  }, []);

  // Apply dark mode styling to document body
  const applyDarkMode = (isDark) => {
    document.body.style.backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
    document.body.style.color = isDark ? '#ffffff' : '#000000';
    document.body.style.transition = 'all 0.3s ease';
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    applyDarkMode(newDarkMode);
  };

  // Handle URL input change
  const handleChange = (e) => {
    setUrl(e.target.value);
    setShowDownloadBtn(false);
    setIsError(false);
    setErrorMsg('');
  };

  // Validate URL format
  const isValidUrl = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Handle form submission to scrape URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setErrorMsg('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setErrorMsg('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setIsError(false);

    try {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = `https://app.zenscrape.com/api/v1/get?url=${encodeURIComponent(url)}&apikey=15a8d570-2735-11ea-bad3-cd0e72860b8f`;
      
      const response = await axios.get(proxyUrl + apiUrl);
      
      if (response.status === 200 && response.data) {
        setScrapData(response.data);
        setShowDownloadBtn(true);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Scraping error:', error);
      setIsError(true);
      setErrorMsg('Failed to scrape URL. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Download scraped data as text file
  const downloadFile = () => {
    if (scrapData) {
      const blob = new Blob([scrapData], { type: 'text/plain;charset=utf-8' });
      const filename = `${url.replace(/[^a-z0-9]/gi, '_')}_scraped.txt`;
      saveAs(blob, filename);
      setShowDownloadBtn(false);
    }
  };

  // Reset error message when user focuses on input
  const resetErrorMsg = () => {
    setIsError(false);
    setErrorMsg('');
  };

  return (
    <div className="App">
      <div className="modes container" onClick={toggleDarkMode}>
        <button className="theme-toggle" aria-label="Toggle theme">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      
      <div className="formblock">
        <h1 className="title">Web Scraper</h1>
        <p className="subtitle">Enter a URL to scrape its HTML content</p>
        
        <form onSubmit={handleSubmit} className="form">
          <input 
            type="text" 
            onFocus={resetErrorMsg} 
            className="form-control" 
            onChange={handleChange} 
            value={url}
            id="url" 
            aria-describedby="url" 
            placeholder="https://example.com"
            disabled={loading}
          />
          
          {showDownloadBtn ? (
            <button 
              type="button"
              className="btn btn-success" 
              onClick={downloadFile}
            >
              Download
            </button>
          ) : (
            <button 
              type="submit"
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Scraping...' : 'Scrape'}
            </button>
          )}
        </form>
        
        {errorMsg && (
          <div className={`error-msg ${isError ? 'error' : 'warning'}`}>
            {errorMsg}
          </div>
        )}
        
        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Fetching content...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
