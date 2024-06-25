import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <header className="">
      <div>
        <Link to={"/"}>
          <button className="bg-[white] text-blue-700 text-medium py-1 px-3 rounded-md">
            Log out
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default index;
