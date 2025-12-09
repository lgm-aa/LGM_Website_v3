// src/hooks/useLatestBulletin.js
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const FOLDER_ID = import.meta.env.VITE_DRIVE_FOLDER_ID;

const CACHE_KEY_DATA = "latestPdfData"; // Renamed from 'URL' since we store more now
const CACHE_KEY_TIMESTAMP = "latestPdfTimestamp";
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

const useLatestBulletin = () => {
  // Store the full object (name, date, url) instead of just a string
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPdf = async () => {
      try {
        // 1. Check Cache
        const cachedData = localStorage.getItem(CACHE_KEY_DATA);
        const cachedTime = localStorage.getItem(CACHE_KEY_TIMESTAMP);
        const isFresh =
          cachedData &&
          cachedTime &&
          Date.now() - parseInt(cachedTime) < CACHE_DURATION_MS;

        if (isFresh) {
          console.log("⚡ Using cached PDF Data");
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        console.log("📥 Fetching latest PDF from Google Drive...");

        // 2. Prepare the Query
        // We added: createdTime, webViewLink, size, thumbnailLink
        const fields = "files(id, name, createdTime, webViewLink, size, thumbnailLink)";
        const listUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/pdf'&orderBy=createdTime+desc&fields=${fields}&key=${API_KEY}`;

        const res = await fetch(listUrl);
        const result = await res.json();

        if (!result.files || result.files.length === 0) {
          console.warn("⚠️ No PDF files found in folder");
          setError("No PDF files found");
          setLoading(false);
          return;
        }

        // 3. Process the Result
        const latestFile = result.files[0];
        
        const bulletinData = {
          id: latestFile.id,
          name: latestFile.name,
          // Use Google's official link or build your own
          url: latestFile.webViewLink, 
          date: latestFile.createdTime, // e.g. "2025-11-03T14:00:00.000Z"
          size: latestFile.size,
          thumbnail: latestFile.thumbnailLink
        };

        // 4. Update State & Cache
        setData(bulletinData);
        localStorage.setItem(CACHE_KEY_DATA, JSON.stringify(bulletinData));
        localStorage.setItem(CACHE_KEY_TIMESTAMP, Date.now().toString());
        setLoading(false);

        console.log("✅ Fetched Bulletin:", bulletinData);

      } catch (err) {
        console.error("❌ Failed to fetch PDF:", err);
        setError("Failed to fetch PDF");
        setLoading(false);
      }
    };

    fetchLatestPdf();
  }, []);

  return { data, loading, error };
};

export default useLatestBulletin;