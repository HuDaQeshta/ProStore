import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded fixed-size">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.imgs[0]}
          variant="top"
          height={176.109}
          width={221}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Footer as="h4" className="text-center bold">
          ${product.price}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Product;
