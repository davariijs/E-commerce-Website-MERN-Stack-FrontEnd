import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../assets/icons/search-icon.svg";
import './Navbar.css';
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "src/store";
import { fetchSearchResults, selectLoadingState, selectSearch } from "src/redux/searchProducts/searchSlice";
import { TProduct } from "src/redux/types/types";



const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const searchResults = useSelector((state: RootState) => selectSearch(state));
  const isLoading = useSelector((state: RootState) => selectLoadingState(state));
  const products: TProduct[] = searchResults?.payload?.products || [];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // Wait 300ms after the user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch search results whenever the debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      dispatch(fetchSearchResults(debouncedQuery)); // Trigger Redux action to fetch results
    }
  }, [debouncedQuery, dispatch]);

  return (
    <div className="searchCom" style={{ position: "relative" }}>
      {/* Search Bar */}
      <div className="relative">
        <img className="searchIcon absolute" src={searchIcon} alt="search" />
        <input
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value) // Update the search query state
          }
          className="searchbar w-full bg-secondary"
          type="text"
          name="searchNav"
          placeholder="Search"
        />
      </div>

      {/* Dropdown Box for Searched Products */}
      {searchQuery && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          {/* Loading State */}
          {isLoading ? (
            <div style={{ padding: "10px", textAlign: "center" }}>Loading...</div>
          ) : products.length > 0 ? (
            // Map over search results
            products.map((product) => (
              <Link to={`/search/${String(product.webID)}`} key={product.webID}>
                <div
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={product.image?.url}
                    alt={product.productTitle}
                    style={{ width: "50px" }}
                  />
                  <h4 style={{ margin: 0, fontSize: "14px" }}>
                    {product.productTitle}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "#888",
                    }}
                  >
                    ${product.prices[0]?.regularPrice?.minPrice}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            // No results found
            <div style={{ padding: "10px", textAlign: "center" }}>
              No products found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;