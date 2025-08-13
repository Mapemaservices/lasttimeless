import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { useAllProducts, Product } from "@/hooks/useAllProducts";
import { useProductCategories } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";

const CategoryProducts = () => {
  const { category } = useParams();
  const { data: products } = useAllProducts();
  const { data: categories } = useProductCategories();
  const navigate = useNavigate();

  // Filter products by selected category
  const filteredProducts = products?.filter(
    (product: Product) => product.category === category
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Category: {category}</h1>
          <p className="text-muted-foreground mb-4">Browse products in this category</p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories?.map(cat => (
              <Button key={cat} variant={cat === category ? "default" : "outline"} size="sm" onClick={() => navigate(`/categories/${cat}`)}>
                {cat}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts?.length ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">No products found in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
