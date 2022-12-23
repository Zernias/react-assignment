import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchText } from "../../actions/noteActions/searchInputActions";
import { typeRootReducer } from "../../reducers/rootReducer";
import Logout from "../loginComponents/Logout";

const Navbar: React.FC = () => {
  const searchText = useSelector<typeRootReducer, string>(
    (state) => state.note.searchInput
  );
  const dispatch = useDispatch();
  return (
    <nav className="navbar m-2" data-testid="navigation-bar">
      <Link
        to="/create"
        className="btn bg-light m-2 rounded-2"
        data-testid="create-button"
      >
        Create note
      </Link>
      <form className="form-inline">
        <input
          className="search-bar p-2"
          type="search"
          placeholder="Search note's title..."
          aria-label="Search"
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
      </form>
      <Logout />
    </nav>
  );
};

export default Navbar;
