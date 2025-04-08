// FloatingButtons.jsx
import React from 'react';
import { ArrowUpIcon, ChatBubbleLeftIcon, BoltIcon, BellIcon } from '@heroicons/react/24/outline';
import './FloatingButton.css';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-between">
      {/* Bên trái: Messenger và Thông báo */}
      <div className="flex flex-col space-y-3">
        {/* Messenger */}
        <a
          href="https://m.me/your-messenger-link"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition animate-shake-delay flex items-center justify-center"
        >
          <BoltIcon className="w-5 h-5" />
        </a>

        {/* Thông báo */}
        <button className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition animate-shake-delay flex items-center justify-center">
          <BellIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Bên phải: Back to Top và Liên hệ */}
      <div className="flex flex-col space-y-3">
        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700 transition animate-shake-delay flex items-center justify-center"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>

        {/* Liên hệ */}
        <a
          href="#contact"
          className="bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700 transition animate-shake-delay flex items-center justify-center"
        >
          <ChatBubbleLeftIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default FloatingButtons;