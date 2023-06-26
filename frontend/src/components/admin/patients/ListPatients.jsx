import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ListPatients({ patient }) {
  return (
    <li className="flex h-12 w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:px-4 lg:hover:bg-gray-300">
      <div className="flex flex-col">
        <p className="line-clamp-1 text-lg font-semibold lg:text-base">
          {patient.firstname} {patient.lastname}
        </p>
        <p className="text-xs font-medium">{patient.email}</p>
      </div>
      <div className="ml-2 flex gap-2">
        <Link
          to={`${patient.id}`}
          type="button"
          className="g:p-2 h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0"
        >
          <svg
            className="h-5 w-5 lg:h-6 lg:w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 4C9.17881 4 6.71479 5.35002 4.62512 7.56353C3.90971 8.32133 3.28883 9.12994 2.76254 9.93918C2.44405 10.4289 2.22481 10.816 2.10683 11.0503C1.96439 11.3332 1.96439 11.6668 2.10683 11.9497L2.21427 12.1533C2.34063 12.384 2.52367 12.6935 2.76254 13.0608C3.28883 13.8701 3.90971 14.6787 4.62512 15.4365C6.71479 17.65 9.17881 19 12 19C14.8212 19 17.2852 17.65 19.3749 15.4365C20.0903 14.6787 20.7112 13.8701 21.2375 13.0608C21.5559 12.5711 21.7752 12.184 21.8932 11.9497C22.0356 11.6668 22.0356 11.3332 21.8932 11.0503L21.7857 10.8467C21.6594 10.616 21.4763 10.3065 21.2375 9.93918C20.7112 9.12994 20.0903 8.32133 19.3749 7.56353C17.2852 5.35002 14.8212 4 12 4ZM12 6C14.1902 6 16.175 7.08748 17.9206 8.93647C18.5475 9.60054 19.0964 10.3154 19.5608 11.0296L19.7504 11.3282L19.855 11.5L19.66 11.8161C19.6284 11.8659 19.5953 11.9174 19.5608 11.9704C19.0964 12.6846 18.5475 13.3995 17.9206 14.0635C16.175 15.9125 14.1902 17 12 17C9.80982 17 7.82498 15.9125 6.07943 14.0635C5.45251 13.3995 4.90364 12.6846 4.43916 11.9704L4.2496 11.6718L4.144 11.5L4.34002 11.1839C4.37162 11.1341 4.40467 11.0826 4.43916 11.0296C4.90364 10.3154 5.45251 9.60054 6.07943 8.93647C7.82498 7.08748 9.80982 6 12 6ZM12 8.0625C10.0937 8.0625 8.54545 9.59996 8.54545 11.5C8.54545 13.4 10.0937 14.9375 12 14.9375C13.9063 14.9375 15.4545 13.4 15.4545 11.5C15.4545 9.59996 13.9063 8.0625 12 8.0625ZM12 10.0625C12.8049 10.0625 13.4545 10.7077 13.4545 11.5C13.4545 12.2923 12.8049 12.9375 12 12.9375C11.1951 12.9375 10.5455 12.2923 10.5455 11.5C10.5455 10.7077 11.1951 10.0625 12 10.0625Z"
            />
          </svg>
        </Link>
      </div>
    </li>
  );
}

ListPatients.propTypes = {
  patient: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
