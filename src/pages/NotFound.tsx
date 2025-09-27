import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 - Page not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main role="main" className="min-h-screen flex items-center justify-center bg-background p-6">
      <section className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-foreground mb-4" aria-label="404 error">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! The page <code>{location.pathname}</code> does not exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 transition"
          aria-label="Return to homepage"
        >
          Return Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;