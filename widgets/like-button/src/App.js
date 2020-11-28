import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './style/index.css';
import { motion } from 'framer-motion';

const App = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(16);

  useEffect(() => {
    if (liked) setCount((prev) => prev + 1);
    if (!liked) setCount((prev) => prev - 1);
  }, [liked]);

  return (
    <div className="flex justify-center items-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 shadow-lg bg-white flex justify-center items-center rounded-full focus:ring-2 ring-red-100 focus:outline-none"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setLiked(!liked);
        }}
      >
        {!liked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-6 h-6 text-red-500`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}

        {!!liked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-6 h-6 text-red-500`}
          >
            <path
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        )}
      </motion.button>

      <span className="font-semibold text-red-300 ml-3 text-sm">{count}</span>
    </div>
  );
};

export default App;
