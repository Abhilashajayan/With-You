"use client"
import React from 'react';
import TabLayouts from '@/components/TabLayout';
import DummyImagesPage from '@/components/MatchPage';


const Page:React.FC = () => {
  return (
        <TabLayouts>
            <div>
                <DummyImagesPage />
            </div>
        </TabLayouts>
  )
}

export default Page;