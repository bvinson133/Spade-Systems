import { useState, useEffect } from 'react';

export function useHash() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  // Simple parser: e.g. "#/preview?id=codescrape-v12" -> { path: "#/preview", id: "codescrape-v12" }
  const getRouteInfo = () => {
    const cleanHash = hash.replace(/^#/, ''); // e.g. "/preview?id=codescrape-v12"
    const [path, search] = cleanHash.split('?');
    const params = new URLSearchParams(search || '');
    const id = params.get('id') || '';
    
    return {
      path: path || '/',
      id,
      navigate,
    };
  };

  return getRouteInfo();
}
