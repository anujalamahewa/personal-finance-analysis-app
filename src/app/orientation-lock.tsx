'use client';

import { useEffect } from 'react';

type ScreenOrientationLock =
  | 'any'
  | 'natural'
  | 'landscape'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary';

export default function OrientationLock() {
  useEffect(() => {
    const tryLockLandscape = async () => {
      const orientationApi = screen.orientation as ScreenOrientation & {
        lock?: (orientation: ScreenOrientationLock) => Promise<void>;
      };

      if (typeof orientationApi?.lock !== 'function') {
        return;
      }

      try {
        await orientationApi.lock('landscape');
      } catch {
        // Most browsers require fullscreen or block locking; CSS fallback handles portrait blocking.
      }
    };

    void tryLockLandscape();
  }, []);

  return null;
}
