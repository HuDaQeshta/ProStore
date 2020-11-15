import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To ProStore",
  description: "We sell the best products for cheap",
  keywords:
    "electronics, bags, women fashion, men fashion, buy products online, cheap products",
};

export default Meta;
