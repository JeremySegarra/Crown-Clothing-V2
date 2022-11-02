import ProductCard from "../product-card/ProductCard";
import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./CategoryPreview.Styles";

const CategoryPreview = ({ title, products }) => {
  //we can use filter to get all products with an index less than 4 to show only 4 products on page
  //then we map over that new array of size 4 returned by filter and show the products
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
