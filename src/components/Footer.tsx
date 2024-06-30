import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface text-text-secondary p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} OpenBook Frontend. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;