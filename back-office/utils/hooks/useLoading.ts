import React from 'react';

export default function useLoading() {
  const [onLoad, setOnLoad] = React.useState(false);
  React.useEffect(() => {
    setOnLoad(true);
  }, []);
  return { onLoad };
}
