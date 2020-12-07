import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { motion } from 'framer-motion';
import 'whatwg-fetch';
import tw, { styled, GlobalStyles } from 'twin.macro';

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

const SVG = styled.svg(tw`w-6 h-6 text-red-500`);

const Container = styled(motion.div)(tw`flex justify-center items-center`);

const Counter = styled(motion.span)(
  tw`font-semibold text-red-300 ml-3 text-sm`,
);

const Button = styled(motion.button)(
  tw`w-12 h-12 shadow-lg bg-white flex justify-center items-center rounded-full focus:ring-2 ring-red-100 focus:outline-none`,
);

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
    <>
      <GlobalStyles />

      <Container>
        <Button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
            <SVG
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </SVG>
          )}

          {!!liked && (
            <SVG
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </SVG>
          )}
        </Button>

        <Counter initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {count}
        </Counter>
      </Container>
    </>
  );
};

export default App;
