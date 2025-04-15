import React from 'react';
import { ArrowUpIcon, ChatBubbleLeftIcon, BoltIcon, StarIcon } from '@heroicons/react/24/outline';
import './FloatingButton.css';

const FloatingButtons = () => {
  return (
    <div className="floating-buttons-wrapper">
      <div className="left-buttons">
        {/* Bolt (Messenger) */}
        <a
          href="https://m.me/your-messenger-link"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-button animate-shake-delay"
        >
          <BoltIcon className="w-5 h-5" />
        </a>

        {/* Star (Placeholder) */}
        <button className="floating-button animate-shake-delay">
          <StarIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="right-buttons">
        {/* ArrowUp (Back to Top) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="floating-button animate-shake-delay"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>

        {/* ChatBubble (Contact) */}
        <a
          href="#contact"
          className="floating-button animate-shake-delay"
        >
          <ChatBubbleLeftIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default FloatingButtons;