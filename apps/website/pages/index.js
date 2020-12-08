import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { highlightBlock } from 'highlight.js';
import Arrow from '../components/Arrow';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../components/Footer';
import {
  availablePositions,
  availableDestinations,
  instructions,
} from '../data';

export default function Home() {
  const codeBlock = useRef();
  const [isFloating, setIsFloating] = useState(false);
  const [positionIndex, setPositionIndex] = useState(0);
  const position = availablePositions[positionIndex];
  const [destinationIndex, setDestinationIndex] = useState(0);
  const destination = availableDestinations[destinationIndex];

  useEffect(() => {
    if (codeBlock.current) {
      highlightBlock(codeBlock.current);
    }
  }, [destination, position, isFloating]);

  return (
    <div>
      <Head>
        <title>Beautiful Like Button in 30 seconds</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://highlightjs.org/static/demo/styles/solarized-dark.css"
        />
      </Head>

      {/* <nav>
        <span>
          30 seconds features by <a href="https://recodable.io">Recodable</a>
        </span>
      </nav> */}

      <main className="w-screen min-h-screen">
        <div className="relative mx-auto" style={{ width: '640px' }}>
          <h1 className="text-5xl font-extrabold text-center py-20">
            Beautiful Like Button
            <br />
            in 30 seconds
          </h1>

          <p className="text-3xl pb-8">
            I want a{' '}
            <button
              type="button"
              onClick={() => setIsFloating(!isFloating)}
              className="border-b-4 border-dashed border-blue-500 text-blue-500"
            >
              {isFloating ? 'floating' : 'simple'}
            </button>{' '}
            like button{' '}
            {isFloating && (
              <>
                at the{' '}
                <button
                  type="button"
                  onClick={() =>
                    setPositionIndex(
                      positionIndex + 1 < availablePositions.length
                        ? positionIndex + 1
                        : 0,
                    )
                  }
                  className="border-b-4 border-dashed border-blue-500 text-blue-500"
                >
                  {position.name}
                </button>{' '}
              </>
            )}
            in a{' '}
            <button
              type="button"
              className="border-b-4 border-dashed border-blue-500 text-blue-500"
              onClick={() =>
                setDestinationIndex(
                  destinationIndex + 1 < availableDestinations.length
                    ? destinationIndex + 1
                    : 0,
                )
              }
            >
              {destination.name}
            </button>
            .
          </p>

          {!isFloating && (
            <div>
              <span className="text-light text-xs text-gray-400">WIDGET</span>
              <div className="rounded-lg border-dashed border-2">
                <Widget />
              </div>
            </div>
          )}

          <ol className="list-decimal text-xl font-light list-inside">
            <li className="my-8">
              <span>In your {destination.name}</span>

              <AnimatePresence
                exitBeforeEnter
                onExitComplete={() => highlightBlock(codeBlock.current)}
              >
                <motion.pre
                  key={`${isFloating ? position.key : 'noneFloating'}-${
                    destination.key
                  }`}
                  ref={codeBlock}
                  className="rounded-lg text-base mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <code className="language-js">
                    {
                      (
                        instructions.find((instruction) => {
                          if (!isFloating) {
                            return (
                              instruction.position === null &&
                              instruction.destination === destination.key
                            );
                          }

                          return (
                            instruction.position === position.key &&
                            instruction.destination === destination.key
                          );
                        }) || {}
                      ).code
                    }
                  </code>
                </motion.pre>
              </AnimatePresence>
            </li>

            <li>
              <span>Enjoy!</span>
            </li>
          </ol>
        </div>

        {isFloating && (
          <div className={`fixed ${position.value} m-20`}>
            <Arrow className="mb-4 text-blue-400" />
            <Widget />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Widget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://unpkg.com/@recodable/like-button-widget@0.1.3/bundle.js';
    script.defer = true;
    container.current.appendChild(script);
  }, [container.current]);

  return <div ref={container} />;
}
