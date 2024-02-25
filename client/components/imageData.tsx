// pages/index.tsx
import MatchingField from './MatchingField';

interface User {
  image: string;
}

const ImageCarosal: React.FC = () => {
  const users: User[] = [
    { image: 'https://source.unsplash.com/200x300/?portrait' },
    { image: 'https://source.unsplash.com/200x300/?face' },
    { image: 'https://source.unsplash.com/200x300/?people' },
    // Add more placeholder images as needed
  ];

  return (
    <div >
      <MatchingField  users={users} />
    </div>
  );
};

export default ImageCarosal;
