import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="loading-text">Cargando producto...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <section className="product-detail">
      <Link to="/products" className="back-link">
        ← Regresar
      </Link>
      <h1>{product.title}</h1>
      <div className="detail-content">
        <img src={product.thumbnail} alt={product.title} />
        <div className="detail-info">
          <p className="description">{product.description}</p>
          <p>
            <strong>Categoría:</strong> {product.category}
          </p>
          <p>
            <strong>Precio:</strong> ${product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;