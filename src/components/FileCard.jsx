import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFile } from '../features/files/filesSlice';
import FilePreview from './FilePreview';

export default function FileCard({ file }) {
  const dispatch = useDispatch();
  return (
    <article className="card">
      <FilePreview file={file} />
      <div className="card-body">
        <h3 title={file.originalName}>{file.originalName}</h3>
        <div className="tags">
          {file.tags.map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </div>
        <p>
          {file.mimeType} · {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
        <small>
          {file.viewCount} views · {new Date(file.createdAt).toLocaleDateString()}
        </small>
        <button className="danger ghost" onClick={() => dispatch(deleteFile(file._id))}>
          Delete
        </button>
      </div>
    </article>
  );
}

