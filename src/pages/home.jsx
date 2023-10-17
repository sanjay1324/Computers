import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../pages/Header";
import "./Home.css";
import loadingImage from "../assets/loading.gif.gif";

const productsPerPage = 15;

const ComputerTeamHomePage = () => {
  const [shop13, setShop13] = useState([]);
  const [shop14, setShop14] = useState([]);
  const [shop15, setShop15] = useState([]);
  const [shop16, setShop16] = useState([]);
  const [shop17, setShop17] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allShops, setAllShops] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchShopData = async (url, setStateFunc) => {
        try {
          const response = await axios.get(url);
          const itemList = response.data.documents.map((doc) => ({
            id: doc.name.split("/").pop(),
            productname: doc.fields.productname.stringValue || "",
            price: doc.fields.price.integerValue || 0,
            imageurl: doc.fields.imageurl.stringValue || "",
            category: doc.fields.category.stringValue || "",
            description: doc.fields.description.stringValue || "",
            stock: doc.fields.stock.integerValue || 0,
            shopid: doc.fields.shopid.stringValue || "",
          }));
          setStateFunc(itemList);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      await fetchShopData(
        "https://firestore.googleapis.com/v1/projects/adminstore-196a7/databases/(default)/documents/Products",
        setShop14
      );
      await fetchShopData(
        "https://firestore.googleapis.com/v1/projects/crud-550f3/databases/(default)/documents/Products",
        setShop15
      );
      await fetchShopData(
        "https://firestore.googleapis.com/v1/projects/digig-57d5f/databases/(default)/documents/Products",
        setShop16
      );
      await fetchShopData(
        "https://firestore.googleapis.com/v1/projects/d-richie-computers/databases/(default)/documents/Products",
        setShop17
      );
      await fetchShopData(
        "https://firestore.googleapis.com/v1/projects/abhiram-store2/databases/(default)/documents/Products",
        setShop13
      );

      const fetchArray = [...shop14, ...shop15, ...shop13, ...shop16, ...shop17];
      setAllShops(fetchArray);
      setDisplayedProducts(fetchArray);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const searchProduct = () => {
    if (!search || search.trim() === "") {
      alert("Please enter a search term");
      setDisplayedProducts(allShops);
      return;
    }

    const searchTerm = search.toLowerCase();
    const filteredProducts = allShops.filter((product) =>
      product.productname.toLowerCase().includes(searchTerm)
    );

    setDisplayedProducts(filteredProducts);
  };

  const linkToRender = (product) => {
    if (product.shopid === "shop13") {
      return `/shop13/shop/${product.id}`;
    } else if (product.shopid === "shop14") {
      return `/shop14/products/${product.id}`;
    } else if (product.shopid === "shop15") {
      return `/checkout/${product.id}`;
    } else if (product.shopid === "shop16") {
      return `/shop4products/${product.id}`;
    } else if (product.shopid === "shop17") {
      return `/products/${product.id}`;
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allShops.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="computer-home">
      <Header />
      <div className="computer-search_bar">
        <input
          type="text"
          value={search}
          placeholder="Search"
          className="computer-search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchProduct} className="computer-search-button">
          Search
        </button>
        <Link to="/erichie">
          <div className="computer-button">
            <button>E-Richie</button>
          </div>
        </Link>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <img src={loadingImage} alt="Loading" />
        </div>
      ) : (
        <div className="productpage">
          <div className="shop">
            <div className="container">
              <div className="right_box">
                <div className="product_box">
                  <div className="product_container">
                    {currentProducts.map((curElm) => (
                      <Link to={linkToRender(curElm)} key={curElm.id}>
                        <div className="box" key={curElm.id}>
                          <div className="img_box">
                            <img src={curElm.imageurl} alt="shopimage" />
                            <div className="icon"></div>
                          </div>
                          <div className="detail">
                            <h3>{curElm.productname}</h3>
                            <p>Rs. {curElm.price}</p>
                            <p>Stock: {curElm.stock}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pagination">
            <ul className="pagination-list">
              {Array.from(
                { length: Math.ceil(allShops.length / productsPerPage) },
                (_, index) => (
                  <li
                    key={index}
                    className={`pagination-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="pagination-button"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
      <div className="computershomepagealignment">
        <Link to="/shop13">
          <div className="computer-button1">
            <button>Abhiram-Store</button>
          </div>
        </Link>
        <Link to="/shop14">
          <div className="computer-button2">
            <button>Digital Genie</button>
          </div>
        </Link>
        <Link to="/homepage">
          <div className="computer-button3">
            <button>Sanjay Computers</button>
          </div>
        </Link>
        <Link to="/shop16/user">
          <div className="computer-button4">
            <button>Dhanu Computers</button>
          </div>
        </Link>
        <Link to="/shop17">
          <div className="computer-button5">
            <button>Mr.Computer Wizz</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ComputerTeamHomePage;
