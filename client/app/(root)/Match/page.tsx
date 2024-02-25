"use client"
import React from 'react';
import TabLayouts from '@/components/TabLayout';
import ImageCarosal from '@/components/imageData';

const Page:React.FC = () => {
  return (
        <TabLayouts>
           <div className='mt-12'> 
             <ImageCarosal />
      </div>
        </TabLayouts>
  )
}

export default Page;