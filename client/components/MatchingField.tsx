import React, { useState, useEffect } from "react";

interface User {
  _id: string;
  profilePicture: string;
  username: string;
  location: string;
  dob: string;
  job: string;
}

interface MatchingFieldProps {
  users: User[];
}

const calculateAge = (dob: string): number => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const MatchingField: React.FC<MatchingFieldProps> = ({ users }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const Dob: any = users.map((user, index) => user.dob);
  const age = calculateAge(Dob);

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
    const nextSlide = users.length > 0 ? (currentSlide + 1) % users.length : 0;
    goToSlide(nextSlide);
  };

  const goToPrevSlide = () => {
    const prevSlide =
      users.length > 0 ? (currentSlide - 1 + users.length) % users.length : 0;
    goToSlide(prevSlide);
  };

  const onSubmit = () => {
    console.log("onSubmit");
  };

  return (
    <div
      className="relative w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {users.length > 0 && (
        <div className="relative h-96 md:h-120 lg:h-160 md:w-[600px]  sm:h-112 md:h-136 lg:h-176 overflow-hidden rounded-lg">
          {users.map((user, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={user?.profilePicture}
                alt={`User ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {user?.location && (
                <div className="absolute z-30 top-2 left-2 backdrop-blur-md p-2 rounded text-white text-sm font-bold">
                  {user.location}
                </div>
              )}
              {user?.username && (
                <div className="absolute z-30 bottom-2 left-2  w-full p-2 text-lg  backdrop-blur-md">
                  <a href={`/Profile/UserProfile/${user._id}`} className="text-white font-bold" >
                    {user.username},{" "}{" "}
                    <span className="text-gray-300">{age}</span>
                  </a>
                  <p className="text-gray-200">{user.job}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {users.length > 0 &&
          users.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-gray-300"
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
