import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="bg-customBg py-2 fixed top-0 left-0 right-0 flex items-center justify-between px-4">
      <div className="flex items-center">
        <FaDog className="text-customBlue text-4xl mr-2" />
        <h1 className="text-customBlue text-2xl font-bold">MYP</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-customBlue hover:underline font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/adoption" className="text-customBlue hover:underline font-semibold">
              Adoption
            </Link>
          </li>
          <li>
              <Link to="/login" className="text-customBlue hover:bg-blue-800 font-semibold">
                Login
              </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
}
