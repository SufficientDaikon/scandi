import React, { useState, useEffect } from 'react';
import '../styles/ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        console.log("getting products")
        document.title = "Product List";
        fetch('https://agile-dawn-35640-c296218cf603.herokuapp.com')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setProducts(data.products);
                }
            })
            .catch(err => setError('An error occurred: ' + err.message));
    }, []);

    const handleDelete = (event) => {
        event.preventDefault();
        fetch('https://agile-dawn-35640-c296218cf603.herokuapp.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ delete_ids: selectedProducts })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProducts(prevProducts =>
                        prevProducts.filter(product => !selectedProducts.includes(product.sku))
                    );
                    setSelectedProducts([]);
                } else {
                    setError(data.error);
                }
            })
            .catch(err => setError('An error occurred: ' + err.message));
    };

    const handleSelect = (sku) => {
        setSelectedProducts(prevSelected =>
            prevSelected.includes(sku)
                ? prevSelected.filter(id => id !== sku)
                : [...prevSelected, sku]
        );
    };

    return (
        <div>
            <div className="header-container">
                <h1>Product List</h1>
                <div className="button-container">
                    <button id="add" onClick={() => window.location.href = '/add-product'}>ADD</button>
                    <form id="deleteForm" onSubmit={handleDelete}>
                        <button type="submit" id="delete-product-btn" disabled={selectedProducts.length === 0}>MASS DELETE</button>
                    </form>
                </div>
            </div>
            <hr id="break"></hr>
            {error && <p id="error">{error}</p>}

            <div className="product-container" id="Product List">
                {products.map(product => (
                    <div className="product-item" key={product.sku}>
                        <input
                            type="checkbox"
                            className="delete-checkbox"
                            value={product.sku}
                            onChange={() => handleSelect(product.sku)}
                        />
                        <p>{product.sku}</p>
                        <p>{product.name}</p>
                        <p>${product.price}</p>
                        <p>{product.attribute}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
