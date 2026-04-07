import React, { useEffect, useMemo, useState } from 'react';

const normalizeSources = (primarySrc, fallbackSources) => {
  const sourceList = [primarySrc, ...(Array.isArray(fallbackSources) ? fallbackSources : [fallbackSources])];
  return sourceList.filter(Boolean);
};

const FallbackImage = ({
  src,
  alt,
  fallbackSources = [],
  className,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const sources = useMemo(() => normalizeSources(src, fallbackSources), [src, fallbackSources]);
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [sources]);

  const handleError = () => {
    setSourceIndex((currentIndex) => {
      if (currentIndex >= sources.length - 1) return currentIndex;
      return currentIndex + 1;
    });
  };

  return (
    <img
      src={sources[sourceIndex] || ''}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      {...props}
    />
  );
};

export default FallbackImage;