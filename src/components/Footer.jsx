import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-black-100 w-full py-8 mt-20 border-t border-secondary/20'>
      <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4'>
        <div className='text-secondary text-sm'>
          © 2026 Yash Tripathi. All rights reserved.
        </div>
        
        <div className='flex gap-6'>
          <a 
            href="https://github.com/YashTripathi-19" 
            target="_blank" 
            rel="noopener noreferrer"
            className='text-secondary hover:text-white transition duration-300'
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/yash-tripathi-194211295/" 
            target="_blank" 
            rel="noopener noreferrer"
            className='text-secondary hover:text-white transition duration-300'
          >
            LinkedIn
          </a>
          <a 
            href="mailto:2k23.cs2311568@gmail.com"
            className='text-secondary hover:text-white transition duration-300'
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
