import { Link } from "react-router-dom";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="category">{product.category}</p>
      <strong className="price">${product.price}</strong>
      <div className="actions">
        <Link to={`/products/${product.id}`} className="btn-detail">
          Ver detalle
        </Link>
        <button onClick={() => onEdit(product)} className="btn-edit">
          Editar
        </button>
        <button onClick={() => onDelete(product.id)} className="btn-delete">
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default ProductCard;