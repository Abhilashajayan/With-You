"use client"
// pages/index.tsx
import TabBar from '@/components/TabBar';

const Home: React.FC = () => {
  const tabs = [
    { label: 'Tab 1', route: '/tab1' },
    { label: 'Tab 2', route: '/tab2' },
    { label: 'Tab 3', route: '/tab3' },
    // Add more tabs as needed
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Responsive Tab Bar Example</h1>
      <TabBar tabs={tabs} />
      {/* Your page content goes here */}
    </div>
  );
};

export default Home;
