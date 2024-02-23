// components/TabBar.tsx
import Link from 'next/link';
import { useState } from 'react';


interface Tab {
  label: string;
  route: string;
}

interface TabBarProps {
  tabs: Tab[];
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);


  const handleTabClick = (index: number, route: string) => {
    setActiveTab(index);
  
  };

  return (
    <div className="flex justify-center items-center">
      {tabs.map((tab, index) => (
        <Link key={index} href={tab.route}
            onClick={() => handleTabClick(index, tab.route)}
            className={`px-4 py-2 mx-2 text-sm font-medium ${
              index === activeTab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } rounded-md focus:outline-none focus:ring focus:border-blue-300 transition`}
          >
            {tab.label}
          
        </Link>
      ))}
    </div>
  );
};

export default TabBar;
