import { useState } from 'react';

type Props = { src: string; alt: string };

function PhotoLoadingStatus({ src, alt }: Props) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className={`photo-frame photo-frame--${status}`}>
      {status === 'loading' && <span className="spinner" role="status" aria-label="Loading photo" />}
      {status === 'error' && <p>Photo could not be loaded</p>}
      <img
        src={src}
        alt={alt}
        className="item-photo"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}

export default PhotoLoadingStatus;