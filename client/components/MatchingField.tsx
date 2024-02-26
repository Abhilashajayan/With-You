// components/MatchingField.tsx
import React, { useState } from 'react';

interface User {
  image: string;
  name?: string;
}

interface MatchingFieldProps {
  users: User[];
}

const MatchingField: React.FC<MatchingFieldProps> = ({ users }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchThreshold = 50;

    if (touchStartX - touchEndX > touchThreshold) {
      goToNextSlide();
    } else if (touchEndX - touchStartX > touchThreshold) {
      goToPrevSlide();
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % users.length;
    goToSlide(nextSlide);
  };

  const goToPrevSlide = () => {
    const prevSlide = (currentSlide - 1 + users.length) % users.length;
    goToSlide(prevSlide);
  };

  return (
    <div
    className="relative w-full"
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    <div className="relative h-96 md:h-120 lg:h-160 sm:h-112 md:h-136 lg:h-176 overflow-hidden rounded-lg">
      {users.map((user, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={user.image}
            alt={`User ${index + 1}`}
            className="w-full h-full object-cover"
          />
           {user.name && (
              <div className="absolute z-30 top-2 left-2 bg-gray-600 p-2 rounded text-white text-sm font-bold">
                {user.name}
              </div>
            )}
            {user.name && (
              <div className="absolute z-30 bottom-2 right-2 text-white text-lg font-bold">
                {user.name}
              </div>
            )}
        </div>
      ))}
    </div>
    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      {users.map((_, index) => (
        <button
          key={index}
          type="button"
          className={`w-3 h-3 rounded-full ${
            index === currentSlide ? 'bg-white' : 'bg-gray-300'
          }`}
          onClick={() => goToSlide(index)}
          aria-current={index === currentSlide}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>
  </div>
  );
};

export default MatchingField;
