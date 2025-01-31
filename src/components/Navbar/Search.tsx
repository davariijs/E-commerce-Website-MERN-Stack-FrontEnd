import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../utils/selectorImplementation"; // Import the combined selector
import searchIcon from "../../assets/icons/search-icon.svg";
import './Navbar.css';
import { Link } from "react-router-dom";
import { RootState } from "src/store";
import { TProduct } from "src/redux/types/types";

interface Product {
  webID: string;
  productTitle: string;
  prices: { regularPrice: { minPrice: number } }[];
  image?: { url: string };
}

const SearchBar: React.FC = () => {
  // Local state for the search query
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  // Get all products from the combined selector
  const allProducts = useSelector((state: RootState) => selectAllProducts(state));

  // Filter products based on the search query
  const filteredProducts = allProducts.filter((product) =>
    product.productTitle?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );


  return (
    <div className="searchCom" style={{ position: "relative" }}>
      {/* Search Bar */}

      <div className='relative'>
        <img className='searchIcon absolute' src={searchIcon} alt='search'/>
        <input 
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        className='searchbar w-full bg-secondary' type="text" name="searchNav" placeholder='Search'/>
      </div>

      {/* Dropdown Box for Searched Products */}
      {searchQuery && filteredProducts.length > 0 && (
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
          {filteredProducts.map((product:TProduct) => (
            <Link to={String(product.webID)} key={product.webID}>
              <div
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                }}
                // onClick={() => alert(`You selected ${product.productTitle}`)} // Example action
              >
                <img src={product.image?.url} alt={product.productTitle} style={{ width: "50px" }} />
                <h4 style={{ margin: 0, fontSize: "14px" }}>{product.productTitle}</h4>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  ${product.prices[0]?.regularPrice?.minPrice}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Products Found */}
      {searchQuery && filteredProducts.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          No products found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;