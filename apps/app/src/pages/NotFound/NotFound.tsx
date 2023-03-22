import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <template>
      <div>
        <div className="grid h-screen bg-white background">
          <div className="place-self-center" data-cy="404">
            <span className="block mb-4 text-8xl font-bold text-center text-gray-200">
              404
            </span>
            <p className="block mb-4 text-center text-gray-400">
              Sorry, this board does not exist
            </p>
            <Link to="/" className="block font-semibold text-center text-blue7">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </template>
  );
};
