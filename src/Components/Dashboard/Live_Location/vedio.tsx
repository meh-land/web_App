import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface VideoComponentProps {
  targetUrl: string;
  width?: string;
  height?: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ targetUrl, width = "800", height = "450" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await axios.get(targetUrl, { responseType: 'document' });
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, 'text/html');
        const imgElement = doc.querySelector('#streamimage') as HTMLImageElement;
        if (imgElement) {
          setImageUrl(imgElement.src);
        }
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    fetchHtmlContent();
  }, [targetUrl]);

  return (
    <div className="video-container" style={{ maxWidth: "100%", maxHeight: "100%" }}>
      {imageUrl ? (
        <img src={imageUrl} alt="Streaming Content" width={width} height={height} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VideoComponent;
