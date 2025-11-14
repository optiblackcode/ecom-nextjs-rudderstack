'use client';

import { useEffect } from 'react';
import { initRudderStack } from '@/lib/rudderstack';

export default function RudderStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initRudderStack();
  }, []);

  return <>{children}</>;
}
