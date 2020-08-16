/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.html' {
  const content: string;
  export default content;
}

declare module 'ramda' {
  const content: any;
  export default content;
}
