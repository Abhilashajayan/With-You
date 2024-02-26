"use client";
import React from 'react';
import TabLayouts from '@/components/TabLayout';
import ImageCarosal from '@/components/imageData';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MatchIcon from '@/components/icons/MatchIcon';

const Page: React.FC = () => {
  return (
    <TabLayouts>
     
        <ImageCarosal />
        <div className="flex items-center justify-center mt-4">
          <button className="rounded-full border-2 p-2 m-2">
            <CloseIcon style={{ color: '#FF5733' }} />
          </button>
          <button className="rounded-full p-2 m-2">
            <MatchIcon  />
          </button>
          <button className="rounded-full border-2 p-2 m-2">
            <StarBorderIcon style={{ color: '#8A2387' }}  />
          </button>
        </div>
     
    </TabLayouts>
  );
}

export default Page;
