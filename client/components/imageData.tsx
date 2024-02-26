// pages/index.tsx
import MatchingField from './MatchingField';

interface User {
  image: string;
  name: string;
  km: string; // Added "km" attribute
}

const ImageCarousel: React.FC = () => {
  const users: User[] = [
    { image: 'https://source.unsplash.com/200x300/?portrait&1', name: 'John', km: '5km' },
    { image: 'https://source.unsplash.com/200x300/?portrait&3', name: 'Alice', km: '10km' },
    { image: 'https://source.unsplash.com/200x300/?portrait&2', name: 'Bob', km: '8km' },
  ];

  return (
    <div>
      <MatchingField users={users} />
    </div>
  );
};

export default ImageCarousel;
