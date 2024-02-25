import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface Tab {
  icon: React.ReactNode;
  route: string;
}

interface TabBarProps {
  tabs: Tab[];
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const activeMenu = useMemo(() => {
    return tabs.find((tab, index) => tab.route === pathname) || null;
  }, [tabs, pathname]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex">
      {tabs.map((tab, index) => (
        <Link key={index} href={tab.route}
         
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 text-sm font-medium  ${
              activeMenu && activeMenu.route === tab.route ? 'text-red-500 border-t-2 border-red-500 ' : 'text-gray-700'
            } focus:outline-none focus:ring focus:border-blue-300 transition`}
          >
            {tab.icon}
         
        </Link>
      ))}
    </div>
  );
};

export default TabBar;
