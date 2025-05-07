import React from 'react';

const Mn = () => {
    return (
      <div className="banner">
        <div className="title">
          <svg
            width="600"
            height="200"
            viewBox="0 0 600 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="50%"
              fontFamily="Cirqua"
              fontSize="100"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="500"
              strokeDashoffset="500"
              className="text-animation"
               textAnchor="middle"  // Horizontally center the text
              dominantBaseline="middle"
            >
              Cosmos
            </text>
          </svg>
        </div>
      </div>
    );
  };
export default Mn;