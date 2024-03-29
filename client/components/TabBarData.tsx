import TabBar from './TabBar';
import FieldIcon from './icons/fieldIcon'; 
import HeartIcon from './icons/HeartIcon';
import MessageIcon from './icons/MessageIcon';
import ProfileIcon from './icons/ProfileIcon';

interface Tab {
  label: string;
  route: string;
  icon: React.ReactElement; 
}

const Home: React.FC = () => {
  const tabs: Tab[] = [
    { label: '', route: '/Match', icon: <FieldIcon /> },
    { label: 'Tab 2', route: '/', icon: <HeartIcon /> },
    { label: 'Tab 3', route: '/Message', icon: <MessageIcon /> },
    { label: 'Tab 1', route: '/Profile', icon: <ProfileIcon /> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} />
    </div>
  );
};

export default Home;
