"use client";
import React from 'react';
import TabLayouts from '@/components/TabLayout';
import ImageCarosal from '@/components/imageData';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Page: React.FC = () => {
  return (
    <TabLayouts>
     
        <ImageCarosal />
        <div className="flex items-center justify-center mt-4">
          <button className="rounded-full border-2 p-2 m-2">
            <CloseIcon style={{ color: '#FF5733' }} />
          </button>
          <button className="rounded-full border-2 p-2 m-2">
            <FavoriteIcon style={{ color: '#FF3333' }} />
          </button>
          <button className="rounded-full border-2 p-2 m-2">
            <StarBorderIcon style={{ color: '#FFD700' }} />
          </button>
        </div>
     
    </TabLayouts>
  );
}

export default Page;
