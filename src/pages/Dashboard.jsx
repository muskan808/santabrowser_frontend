import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, uploadFile } from '../features/files/filesSlice';
import { logout } from '../features/auth/authSlice';
import FileCard from '../components/FileCard';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { items, loading, error } = useSelector((s) => s.files);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');
  const [selected, setSelected] = useState(null);

  const search = () => dispatch(fetchFiles({ query: q, type, tag: tags }));

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const onUpload = async (e) => {
    e.preventDefault();
    if (!selected) return;
    const r = await dispatch(uploadFile({ file: selected, tags }));
    if (!r.error) {
      setSelected(null);
      e.target.reset();
      dispatch(fetchFiles({ query: q, type, tag: tags }));
    }
  };

  return (
    <main className="shell">
      <header>
        <div>
          <h1>MediaVault</h1>
          <span>Welcome, {user?.name}</span>
        </div>
        <button className="ghost" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </header>

      <section className="toolbar">
        <form onSubmit={onUpload} className="upload">
          <input
            type="file"
            accept="image/*,video/*,audio/*,application/pdf"
            required
            onChange={(e) => setSelected(e.target.files[0])}
          />
          <input
            placeholder="Tags: travel, work"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button>Upload</button>
        </form>

        <div className="search">
          <input
            placeholder="Search file names or tags…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
          />
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              dispatch(fetchFiles({ query: q, type: e.target.value, tag: tags }));
            }}
          >
            <option value="">All types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="raw">PDFs</option>
          </select>
          <button onClick={search}>Search</button>
        </div>
      </section>

      {error && <div className="error">{error}</div>}

      <section className="results">
        <div className="results-head">
          <h2>{q ? 'Search results' : 'Your files'}</h2>
          <span>{loading ? 'Loading…' : `${items.length} shown`}</span>
        </div>
        {items.length ? (
          <div className="grid">
            {items.map((f) => (
              <FileCard key={f._id} file={f} />
            ))}
          </div>
        ) : (
          <div className="empty">No files found. Upload your first image, video, audio file, or PDF.</div>
        )}
      </section>
    </main>
  );
}

