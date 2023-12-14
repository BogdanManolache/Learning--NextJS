import { useEffect, useState } from 'react';

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(function () {
    setIsClient(true);
  }, []);
  return isClient;
}
