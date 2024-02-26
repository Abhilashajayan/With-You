// pages/index.tsx
import MatchingField from './MatchingField';

interface User {
  image: string;
  name: string;
}

const ImageCarousel: React.FC = () => {
  const users: User[] = [
    { image: 'https://source.unsplash.com/200x300/?portrait&1', name: 'hello' },
    { image: 'https://source.unsplash.com/200x300/?portrait&3', name: 'hello' },
    { image: 'https://source.unsplash.com/200x300/?portrait&2', name: 'hello' },
  ];

  return (
    <div>
      <MatchingField users={users} />
    </div>
  );
};

export default ImageCarousel;
