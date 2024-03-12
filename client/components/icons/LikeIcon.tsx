import React from "react";

const LikeICon: React.FC = () => {
  return (
    <svg
      width="167"
      height="173"
      viewBox="0 0 67 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1_6898)">
        <path
          d="M28.9158 10.7322C23.8775 9.38224 18.6987 12.3722 17.3487 17.4105C14.9043 26.5331 23.4635 37.7152 28.7518 41.2C35.0741 40.8263 48.0776 35.4218 50.522 26.2992C51.872 21.2609 48.882 16.0822 43.8437 14.7322C40.7584 13.9055 37.6203 14.7063 35.3412 16.6083C34.3184 13.8215 32.0011 11.559 28.9158 10.7322Z"
          fill="#E94057"
          stroke="#E94057"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1_6898"
          x="-7.4129"
          y="0.764404"
          width="80.4744"
          height="80.4744"
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
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_6898"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_6898"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LikeICon;
