export const availablePositions = [
  { key: 'bottomRight', name: 'bottom right', value: 'bottom-0 right-0' },
  { key: 'bottomLeft', name: 'bottom left', value: 'bottom-0 left-0' },
];

export const availableDestinations = [
  { key: 'html', name: 'HTML file', value: 'html' },
  { key: 'react', name: 'React app', value: 'react' },
  // { key: 'vue', name: 'Vue app', value: 'vue' },
];

export const htmlInstructions = [
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
    position: 'bottomLeft',
    code: `<html lang="en">
  <head>
    <title>Your awesome website</title>
  </head>
  <body>

    <!-- You will need a relative element to position the widget from -->
    <div style="position: relative;">

      <!-- Copy this in your HTML file -->
      <div style="position: absolute; position: fixed; margin: 5rem; bottom: 0; left: 0;">
        <script defer src="https://unpkg.com/@recodable/like-button-widget@0.1.3/bundle.js"></script>
      </div>

    </div>

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

    <!-- You will need a relative element to position the widget from -->
    <div style="position: relative;">

      <!-- Copy this in your HTML file -->
      <div style="position: absolute; position: fixed; margin: 5rem; bottom: 0; right: 0;">
        <script defer src="https://unpkg.com/@recodable/like-button-widget@0.1.3/bundle.js"></script>
      </div>

    </div>

  </body>
</html>`,
  },
];

export const reactInstructions = [
  {
    destination: 'react',
    position: null,
    code: `// Create a Widget.js component
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

// Then use it in your app where ever you wants
function App() {
  return (
    <div>
      <h1>This is my app</h1>

      <Widget />
    </div>
  )
}
`,
  },
  {
    destination: 'react',
    position: 'bottomLeft',
    code: `// Create a Widget.js component
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

// Then use it in your app where ever you wants
function App() {
  return (
    <div>
      <h1>This is my app</h1>

      // You will need a relative element to position the widget from
      <div style={{ position: "relative" }}>

        // Copy this in your HTML file
        <div style={{ position: "fixed", margin: "5rem", bottom: 0, left: 0 }}>
          <Widget />
        </div>

      </div>
    </div>
  )
}
`,
  },
  {
    destination: 'react',
    position: 'bottomRight',
    code: `// Create a Widget.js component
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

// Then use it in your app where ever you wants
function App() {
  return (
    <div>
      <h1>This is my app</h1>

      // You will need a relative element to position the widget from
      <div style={{ position: "relative" }}>

        // Copy this in your HTML file
        <div style={{ position: "fixed", margin: "5rem", bottom: 0, right: 0 }}>
          <Widget />
        </div>

      </div>
    </div>
  )
}
`,
  },
];

export const instructions = [...htmlInstructions, ...reactInstructions];
