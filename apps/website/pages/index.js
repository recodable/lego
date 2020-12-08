import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { highlightBlock } from 'highlight.js';

const availablePositions = [
  { key: 'bottomRight', name: 'bottom right', value: 'bottom-0 right-0' },
  { key: 'bottomLeft', name: 'bottom left', value: 'bottom-0 left-0' },
];

const availableDestinations = [
  { key: 'html', name: 'HTML file', value: 'html' },
  { key: 'react', name: 'React app', value: 'react' },
  { key: 'vue', name: 'Vue app', value: 'vue' },
];

const instructions = [
  {
    destination: 'html',
    position: null,
    code: `<html lang="en">
  <head>
    <title>Your awesome website</title>
  </head>
  <body>
    <!-- Add this like where you want the like button to be -->
    <script defer src="https://unpkg.com/@recodable/like-button-widget@0.1.3/bundle.js"></script>
  </body>
</html>`,
  },
  {
    destination: 'html',
    position: 'bottomRight',
    code: `<html lang="en">
  <head>
    <title>Your awesome website</title>
  </head>
  <body>
    <script defer src="https://unpkg.com/@recodable/like-button-widget@0.1.3/bundle.js" data-position="bottomRight"></script>
  </body>
</html>`,
  },
  {
    destination: 'html',
    position: 'bottomLeft',
    code: `<html lang="en">
  <head>
    <title>Your awesome website</title>
  </head>
  <body>
    <script defer src="https://unpkg.com/@recodable/like-button-widget@0.1.3/bundle.js" data-position="bottomLeft"></script>
  </body>
</html>`,
  },
];

export default function Home() {
  const codeBlock = useRef();
  const [isFloating, setIsFloating] = useState(true);
  const [positionIndex, setPositionIndex] = useState(0);
  const position = availablePositions[positionIndex];
  const [destinationIndex, setDestinationIndex] = useState(0);
  const destination = availableDestinations[destinationIndex];

  useEffect(() => {
    if (codeBlock.current) {
      highlightBlock(codeBlock.current);
    }
  }, [destination, position]);

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
              <span>In your HTML file</span>

              <pre
                key={`${position.key}-${destination.key}`}
                ref={codeBlock}
                className="rounded-lg text-base mt-3"
              >
                <code className="language-html">
                  {
                    (
                      instructions.find((instruction) => {
                        if (isFloating)
                          return (
                            instruction.position === null &&
                            instruction.destination === destination.key
                          );

                        return (
                          instruction.position === position.key &&
                          instruction.destination === destination.key
                        );
                      }) || {}
                    ).code
                  }
                </code>
              </pre>
            </li>

            <li>
              <span>Enjoy!</span>
            </li>
          </ol>
        </div>

        {isFloating && (
          <div className={`absolute ${position.value} m-20`}>
            <Widget />
          </div>
        )}
      </main>
    </div>
  );
}

function Widget() {
  return <div className="bg-red-300 w-10 h-10" />;
  // return (
  //   <script
  //     defer
  //     src="https://unpkg.com/@recodable/like-button-widget@0.1.3/bundle.js"
  //   />
  // );
}
