import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    loadProducts(1);
    loadCategories();
  }, []);

  async function loadProducts(pageNumber = 1) {
    try {
      setLoading(true);
      setError("");
      const skip = (pageNumber - 1) * limit;
      const data = await getProducts(limit, skip);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      if (search.trim() === "") {
        await loadProducts(1);
        setPage(1);
        return;
      }
      const data = await searchProducts(search);
      setProducts(data.products);
      setTotal(data.total || data.products.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCategory(event) {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    try {
      setLoading(true);
      setError("");
      if (selectedCategory === "") {
        await loadProducts(1);
        setPage(1);
        return;
      }
      const data = await getProductsByCategory(selectedCategory);
      setProducts(data.products);
      setTotal(data.total || data.products.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleCreate(event) {
    event.preventDefault();
    try {
      const newProduct = await createProduct({
        ...form,
        price: Number(form.price),
      });
      setProducts([newProduct, ...products]);
      setForm({
        title: "",
        price: "",
        description: "",
      });
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description || "",
    });
  }

  async function handleUpdate(event) {
    event.preventDefault();
    try {
      const updated = await updateProduct(editingId, {
        ...form,
        price: Number(form.price),
      });
      setProducts(
        products.map((product) =>
          product.id === editingId ? { ...product, ...updated } : product
        )
      );
      setEditingId(null);
      setForm({
        title: "",
        price: "",
        description: "",
      });
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function nextPage() {
    const totalPages = Math.ceil(total / limit);
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      loadProducts(newPage);
    }
  }

  function previousPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      loadProducts(newPage);
    }
  }

  return (
    <section className="products-container">
      <h1>Productos</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="filter-container">
        <select value={category} onChange={handleCategory}>
          <option value="">Todas las categorías</option>
          {categories.map((item) => {
            const value = item.slug ?? item;
            const label = item.name ?? item;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      <h2>{editingId ? "Editar producto" : "Agregar producto"}</h2>
      <form
        onSubmit={editingId ? handleUpdate : handleCreate}
        className="product-form"
      >
        <input
          type="text"
          name="title"
          placeholder="Nombre"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? "Actualizar" : "Guardar"}
        </button>
      </form>

      {loading && <p className="loading-text">Cargando productos...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <>
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <div className="pagination">
            <button onClick={previousPage} disabled={page === 1}>
              Anterior
            </button>
            <span>Página {page}</span>
            <button
              onClick={nextPage}
              disabled={page >= Math.ceil(total / limit)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Products;