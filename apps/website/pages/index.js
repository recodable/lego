import Head from 'next/head';
import Gist from '../components/Gist';
import { useEffect } from 'react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Recodable Widgets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <nav>
        <span>
          30 seconds features by <a href="https://recodable.io">Recodable</a>
        </span>
      </nav> */}

      <main className="flex flex-col justify-center items-center w-screen min-h-screen relative">
        <h1 className="text-5xl font-extrabold text-center my-20">
          Beautiful Like Button
          <br />
          in 30 seconds
        </h1>

        <ol
          className="list-decimal text-2xl font-light"
          style={{ width: '320px' }}
        >
          <li>
            <p>Add the stylesheet</p>
            <Gist
              id="dfd933e226c26713f306d9dfae510935"
              file="stylesheet.html"
            />
          </li>

          <li>
            <span>Add the Javascript</span>
            <Gist id="dfd933e226c26713f306d9dfae510935" file="script.html" />
          </li>

          <li>
            <span>Enjoy!</span>
          </li>
        </ol>

        <div className="absolute bottom-0 right-0 m-20">
          <Widget
            jsFile="https://unpkg.com/@recodable/like-button-widget@latest/bundle.js"
            cssFile="https://unpkg.com/@recodable/like-button-widget@latest/bundle.49797.css"
          />
        </div>
      </main>
    </div>
  );
}

function Widget({ jsFile, cssFile }) {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = jsFile;
    script.defer = true;

    document.body.appendChild(script);

    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = cssFile;

    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return <div className="like-button" />;
}
