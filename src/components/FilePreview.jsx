import React from 'react';

export default function FilePreview({ file }) {
  if (file.resourceType === 'image') return <img className="preview" src={file.url} alt={file.originalName} loading="lazy" />;
  if (file.resourceType === 'video') return <video className="preview" src={file.url} controls preload="metadata" />;
  if (file.resourceType === 'audio') return <div className="audio"><span>🎵</span><audio src={file.url} controls /></div>;
  return <div className="pdf"><span>PDF</span><a href={file.url} target="_blank" rel="noreferrer">Open PDF</a></div>;
}

