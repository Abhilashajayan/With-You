"use client"
import React from 'react';
import TabLayouts from '@/components/TabLayout';


const Page:React.FC = () => {
  return (
        <TabLayouts>
            <div>
                <input placeholder='hello' type="text" />
            </div>
        </TabLayouts>
  )
}

export default Page;