import React from 'react';
const arrows = <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 18 18"
  aria-labelledby="title"
  stroke="currentColor"
  width="1em"
  height="1em"
  fill="none"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <title id="title">Arrows</title>
    <g fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9,1 L9,17"></path>
      <path d="M1,9 L17,9"></path>
      <polyline points="7 3 9 1 11 3"></polyline>
      <polyline points="15 11 17 9 15 7"></polyline>
      <polyline points="11 15 9 17 7 15"></polyline>
      <polyline points="3 7 1 9 3 11"></polyline>
    </g>
</svg>
export default arrows;