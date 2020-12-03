import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import './style/index.css';
import { motion } from 'framer-motion';
import 'whatwg-fetch';

function debounce(fn, delay) {
  var timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
}

const url = window.location.href;

const App = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(null);
  const endpoint = `${process.env.API_URL}?url=${url}`;

  useEffect(() => {
    window
      .fetch(endpoint, { method: 'GET' })
      .then((res) => res.json())
      .then(({ count, liked }) => {
        setCount(count);
        setLiked(liked);
      });
  }, []);

  const update = useRef(
    debounce(() => fetch(endpoint, { method: 'POST' }), 1000),
  ).current;

  if (count === null) {
    return null;
  }

  return (
    <motion.div className="flex justify-center items-center">
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 shadow-lg bg-white flex justify-center items-center rounded-full focus:ring-2 ring-red-100 focus:outline-none"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          const newLiked = !liked;
          setLiked(newLiked);
          if (newLiked) setCount((prev) => prev + 1);
          if (!newLiked) setCount((prev) => prev - 1);
          update();
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

      <motion.span
        className="font-semibold text-red-300 ml-3 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {count}
      </motion.span>
    </motion.div>
  );
};

export default App;
