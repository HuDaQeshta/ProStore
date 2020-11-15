import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //instead of using connect and mapStateTo props, when useDispatch is used to dispatch the action and useSelector used to select specific parts of the global state.
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import { getProducts } from "../actions/productActions";

const HomeScreen = ({ match, location }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const subString = "section";
  let productCategory = "";

  if (location.pathname.includes(subString)) {
    const locationArray = location.pathname.split("/");
    productCategory = locationArray[locationArray.length - 1];
  }

  if (productCategory.includes("-")) {
    productCategory = productCategory.split("-").join(` `).trim().toLowerCase();
    // let category = "";
    // for (let i = 0; i < correctCategory.length; i++) {
    //   category +=
    //     correctCategory[i][0].toUpperCase() +
    //     correctCategory[i].substring(1, correctCategory[i].length) +
    // ` `;
    //}
    console.log(productCategory);
  } else if (productCategory) {
    productCategory = productCategory.trim().toLowerCase();
    console.log(productCategory);
  }
  let productsOfCategory = products.filter(
    (p) => p.category.toLowerCase() === productCategory
  );
  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber));
  }, [dispatch, keyword, productCategory, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword && !productCategory && (
        <>
          <ProductCarousel className="pt-3" />
          <h1 className="text-uppercase border-left pl-3">Latest Products</h1>
        </>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {productCategory ? (
            <>
              <h1 className="text-uppercase border-left pl-3">Results</h1>
              <Row>
                {productsOfCategory.map((product) => (
                  <Col key={product._id} sm={6} md={4} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                page={page}
                pages={pages}
                keyword={keyword ? keyword : ""}
              />
            </>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={6} md={4} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                page={page}
                pages={pages}
                keyword={keyword ? keyword : ""}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
