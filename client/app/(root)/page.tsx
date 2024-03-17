"use client"
import React from 'react';
import TabLayouts from '@/components/TabLayout';
import MatchingPage from '@/components/Matching';

const Page:React.FC = () => {
  return (
        <TabLayouts>
            <div>
                <MatchingPage />
            </div>
        </TabLayouts>
  )
}

export default Page;