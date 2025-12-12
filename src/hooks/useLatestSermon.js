/**
 * TODO: Implement this hook
 *
 * Steps:
 * 1. Generate a Google Cloud API key with YouTube Data API v3 enabled
 * 2. Use import.meta.env to load the key
 * 3. Build a YouTube search URL to fetch videos for the church channel
 * 4. Filter to find the latest sermon
 * 5. Add caching (optional)
 * 6. Extra credit: Add Sunday detection logic
 */

import { useState, useEffect } from 'react';

const API_KEY = "AIzaSyDGqaQK4gtlWTyk9uI6ItwuZ1Vf6T327HE"
const CHANNEL_ID = "UCFN3i5-SUCJctC_h5hMiBBw"



export default function useLatestSermon() {
  const [sermon, setSermon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getVideo() {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=1&order=date&key=${API_KEY}`


      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        
        //console.log('this should be returning the youtube items')
        //console.log(data.items[0].id.videoId);
        setSermon(data.items[0]) //THIS IS THE CORRECT ONE
        //setSermon("X6n6CIJ2vsc");
        /**
        setSermon({
          "kind": "youtube#searchResult",
          "etag": "CgZQtGmFqs1V0im878zs54T6jWY",
          "id": {
            "kind": "youtube#video",
            "videoId": "X6n6CIJ2vsc"
          },
          "snippet": {
            "publishedAt": "2025-12-07T19:45:54Z",
            "channelId": "UCFN3i5-SUCJctC_h5hMiBBw",
            "title": "God is at Work",
            "description": "Matthew 11:1-11 Pastor Amy Triebwasser.",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/X6n6CIJ2vsc/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/X6n6CIJ2vsc/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/X6n6CIJ2vsc/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Living Grace Ministry",
            "liveBroadcastContent": "none",
            "publishTime": "2025-12-07T19:45:54Z"
          }
        })
          */
      }
      catch (err) {
        console.error("ERROR", err);
        setError("Failed to load video");
      }
      finally {
        setLoading(false);
      }
    }
      

    getVideo();
  }, []);

  console.log("📤 Hook RETURNING:", { sermon, loading, error });
  
  
  return {
    sermon,
    loading,
    error,
  };
  
}
