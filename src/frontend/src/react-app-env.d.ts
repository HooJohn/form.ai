/// <reference types="react-scripts" />

// You can add your own global type definitions here if needed.
// For example, to make CSS modules work with TypeScript:
// declare module '*.module.css' {
//   const classes: { readonly [key: string]: string };
//   export default classes;
// }

// declare module '*.module.scss' {
//   const classes: { readonly [key: string]: string };
//   export default classes;
// }

// For images
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
