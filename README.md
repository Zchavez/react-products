# Guía de Laboratorio: Práctica con Endpoint

**Asignatura:** DESARROLLO WEB 2  
**Tutor:** VLADIMIR MATE  
**Técnico:** TSU DESARROLLO DE SOFTWARE EN CÓDIGO ABIERTO  
**Institución:** Escuela Superior de Innovación y Tecnología (ESIT)  

---

## Datos del Estudiante
* **Nombre Completo:** Eduardo Antonio Zúñiga Chávez [cite: 1, 2]
* **Carrera:** Técnico Superior Universitario en Desarrollo de Software en Código Abierto [cite: 1, 2]
* **Aula Virtual ID / Correo:** Eduardo Zúñiga

---

## Descripción del Proyecto
Aplicación desarrollada en **React** con **Vite** y **React Router DOM** para gestionar productos consumiendo la API REST de **DummyJSON** (`https://dummyjson.com/products`). 

### Funcionalidades Implementadas
1. **Consulta general y paginación:** Obtención de listado de productos (`GET /products?limit=12&skip=x`).
2. **Consulta por detalle:** Vista individualizada para cada producto mediante su ID (`GET /products/:id`).
3. **Búsqueda dinámica:** Filtrado por término o nombre (`GET /products/search?q=`).
4. **Filtrado por categoría:** Selección dinámica de categorías (`GET /products/category/:category`).
5. **Creación de productos:** Formulario para registro simulated via `POST /products/add`.
6. **Actualización de productos:** Edición en formulario con `PUT /products/:id`.
7. **Eliminación de productos:** Remoción de elementos con `DELETE /products/:id`.

---

## Estructura del Repositorio
```
react-products/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductList.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   └── Products.jsx
│   ├── services/
│   │   └── productService.js
│   ├── styles/
│   │   └── main.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## Instrucciones para Ejecución Local

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd react-products
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador en `http://localhost:5173/`.
