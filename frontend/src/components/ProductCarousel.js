import React, { useEffect } from "react";
import { getTopProducts } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel slide pause="hover" className="bg-custome mb-5">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link
            to={`/product/${product._id}`}
            className="d-flex justify-content-center align-items-center"
          >
            <Image
              src={product.imgs[0]}
              className="carousel-img"
              alt={product.title}
              fluid
            />
            <Carousel.Caption className="carousel-caption text-uppercase">
              <h2>
                {product.title} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
