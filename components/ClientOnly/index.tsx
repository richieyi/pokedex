import { useEffect, useState } from 'react';

export default function ClientOnly({
  children,
  ...delegated
}: {
  children: JSX.Element;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
