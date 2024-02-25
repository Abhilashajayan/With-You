import { useEffect } from 'react';
import  { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import SwiperCore from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface User {
  image: string;
}

interface MatchingFieldProps {
  users: User[];
}

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const MatchingField: React.FC<MatchingFieldProps> = ({ users }) => {
  useEffect(() => {

  }, []);

  return (
    <div className="flex flex-col items-center">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className="w-full md:w-2/3 lg:w- xl:w-1/3 mb-4"
      >
        {users.map((user, index) => (
     <SwiperSlide key={index} className="flex items-center justify-center mx-auto rounded">
     <div className="w-[400px] h-[500px] ">
       <img
         src={user.image}
         alt={`User ${index + 1}`}
         className="w-full h-full object-cover border rounded object-center"
       />
     </div>
   </SwiperSlide>
   
    
      
       
        ))}
      </Swiper>
    </div>
  );
};

export default MatchingField;
