import React from 'react';

const MatchIcon: React.FC = () => {
  return (
    <svg
      width="129"
      height="129"
      viewBox="0 0 129 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1_6530)">
        <circle cx="64.5" cy="49.5" r="49.5" fill="#E94057" />
      </g>
      <path
        d="M54.9375 32.5C48.4827 32.5 43.25 37.7327 43.25 44.1875C43.25 55.875 57.0625 66.5 64.5 68.9716C71.9375 66.5 85.75 55.875 85.75 44.1875C85.75 37.7327 80.5173 32.5 74.0625 32.5C70.1097 32.5 66.6151 34.4623 64.5 37.4659C62.3849 34.4623 58.8903 32.5 54.9375 32.5Z"
        fill="white"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_1_6530"
          x="0"
          y="0"
          width="129"
          height="129"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="15" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.913725 0 0 0 0 0.25098 0 0 0 0 0.341176 0 0 0 0.2 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_6530" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_6530"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default MatchIcon;
