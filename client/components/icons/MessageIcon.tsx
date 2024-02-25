import React from 'react';

const MessageIcon: React.FC = () => {
  return (
    <svg width="60" height="48" viewBox="0 0 60 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 24C40 29.5229 35.5229 34 30 34C27.0133 34 20 34 20 34C20 34 20 26.5361 20 24C20 18.4771 24.4771 14 30 14C35.5229 14 40 18.4771 40 24Z" 
        fill="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="hover:fill-current"
      />
      <path d="M25 21H34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:fill-current" />
      <path d="M25 25H34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:fill-current" />
      <path d="M25 29H30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:fill-current" />
    </svg>
  );
};

export default MessageIcon;
