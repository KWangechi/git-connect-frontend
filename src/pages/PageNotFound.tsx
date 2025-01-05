import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-yellow-500 font-extrabold text-9xl">404</div>
      <div className="mt-6 text-2xl font-semibold">Oops! Page Not Found</div>
      <p className="mt-8 text-white text-center max-w-md italic">
        The page you’re looking for doesn’t exist. It might have been removed or
        the URL might be incorrect.
      </p>
      <div className="mt-20">
        <Link
          className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold text-lg rounded shadow transition-all"
          to={"/"}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
