import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className='flex h-full w-full justify-center items-center'>
      <iframe
        title="Lottie Animation"
        src="https://lottie.host/embed/51e5f6eb-1053-47fa-8b01-04d4d0e6f9c9/kDKDjNCYjY.json"
        width="300"
        height="300"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default Loading;


