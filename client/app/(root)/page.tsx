"use client"
import React from 'react';
import TabLayouts from '@/components/TabLayout';
import AddDetails from '@/components/AddDetails';

const Page:React.FC = () => {
  return (
        <TabLayouts>
            <div>
                <AddDetails />
            </div>
        </TabLayouts>
  )
}

export default Page;