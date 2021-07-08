import '../public/assets/css/main.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  // const body = window.document.querySelector("body");
  // body.classList.add('light-pallete');
  return <Component {...pageProps} />
}

