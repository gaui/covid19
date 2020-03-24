import { Suspense } from 'react';
import React from 'react';

export const LazyComponent = ({ component, ...props }: any) => {
  const Component = React.lazy(() =>
    import(/* webpackChunkName: "[request]" */ `./${component}`)
  );
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Component {...props} />
    </Suspense>
  );
};
