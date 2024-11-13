import "../styles/globals.css"; // Ensure your global styles are applied
import NavBar from "../components/NavBar"; // Correct path for NavBar
import Footer from "../components/Footer"; // Correct path for Footer

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
