import React, { useState, useEffect } from 'react';
import '../styles/AddProduct.css';

function AddProduct() {
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        price: '',
        type: 'Book',
        attribute: '',
        height: '',
        width: '',
        length: '',
    });
    useEffect(() => {
        document.title = "Add Product";
    }, []);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTypeChange = (e) => {
        const type = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            type: type,
            attribute: '',
            height: '',
            width: '',
            length: ''
        }));
    };

    const validNumberMessage = 'Please, provide the data of indicated type / cannot be empty';
    const emptyFieldMessage = 'Please, submit required data';

    const handleNumberValidation = (e) => {
        e.target.setCustomValidity('');
        if (!e.target.value) {
            e.target.setCustomValidity(validNumberMessage);
        }
    };

    const handleTextValidation = (e) => {
        e.target.setCustomValidity('');
        if (!e.target.value) {
            e.target.setCustomValidity(emptyFieldMessage);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("adding product")
        
        let attribute = formData.attribute;
        if (formData.type === 'Furniture') {
            attribute = `${formData.height}x${formData.width}x${formData.length}`;
        }
        
        fetch('https://agile-dawn-35640-c296218cf603.herokuapp.com/add_product.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, attribute, add_product: true })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                    console.log("redirecting")
                    window.location.href = '/';
                    console.log("redireced")
                }
            })
            .catch(err => setError('An error occurred: ' + err.message));
    };

    return (
        <div>
            <div className="header-container">
                <h1>Add Product</h1>
                <div className="button-container">
                    <button type="submit" form="product_form">Save</button>
                    <button type="button" onClick={() => window.location.href = '/'}>Cancel</button>
                </div>
            </div>
            <hr />
            <div className="add-product-container">
                {error && <p id="error">{error}</p>}
                <form id="product_form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='common-label'  htmlFor="sku">SKU:</label>
                        <input 
                        className='common' 
                        type="text"
                        id="sku" 
                        name="sku" 
                        value={formData.sku} 
                        onChange={handleChange} 
                        onInvalid={handleTextValidation}
                        onInput={handleTextValidation}
                        required
                        />
                    </div>

                    <div className="form-group">
                        <label className='common-label' htmlFor="name">Name:</label>
                        <input 
                        className='common' 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        onInvalid={handleTextValidation}
                        onInput={handleTextValidation}
                        required
                        />
                    </div>

                    <div className="form-group">
                        <label className='common-label' htmlFor="price">Price ($):</label>
                        <input
                            className='common'
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            onInvalid={handleNumberValidation}
                            onInput={handleNumberValidation}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="switcher-label" htmlFor="type">Type Switcher:</label>
                        <select id="productType" name="type" value={formData.type} onChange={handleTypeChange}>
                            <option value="Book" label="Book">Book</option>
                            <option value="DVD" label="DVD">DVD</option>
                            <option value="Furniture" label="Furniture">Furniture</option>
                        </select>
                    </div>

                    {formData.type === 'Book' && (
                        <div>
                        <p className='hint' htmlFor="weight">Please, Provide Book Weight</p>
                        <div className="form-group">
                            <label htmlFor="weight">Weight (Kg):</label>
                            <input
                            className='attribute'
                            type="number" 
                            id="weight" 
                            name="attribute" 
                            value={formData.attribute} 
                            onChange={handleChange} 
                            onInvalid={handleNumberValidation}
                            onInput={handleNumberValidation}
                            required
                            />
                        </div>
                        </div>
                    )}

                    {formData.type === 'DVD' && (
                        <div>
                        <p className='hint' htmlFor="size">Please, Provide DVD Size</p>
                        <div className="form-group">
                            <label htmlFor="size">Size (MB):</label>
                            <input 
                            className='attribute'
                            type="number" 
                            id="size" 
                            name="attribute" 
                            value={formData.attribute} 
                            onChange={handleChange} 
                            onInvalid={handleNumberValidation}
                            onInput={handleNumberValidation}
                            required
                            />
                        </div>
                        </div>
                    )}

                    {formData.type === 'Furniture' && (
                        <div>
                            <p className='hint' >Please Provide Dimensions</p>
                            <div className="form-group">
                                <label htmlFor="height">Height (CM):</label>
                                <input 
                                className='attribute'
                                type="number" 
                                id="height"
                                name="height" 
                                value={formData.height} 
                                onChange={handleChange}
                                onInvalid={handleNumberValidation}
                                onInput={handleNumberValidation}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="width">Width (CM):</label>
                                <input 
                                className='attribute'
                                type="number" 
                                id="width" 
                                name="width" 
                                value={formData.width}
                                onChange={handleChange}
                                onInvalid={handleNumberValidation}
                                onInput={handleNumberValidation}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="length">Length (CM):</label>
                                <input 
                                className='attribute'
                                type="number" 
                                id="length" 
                                name="length" 
                                value={formData.length} 
                                onChange={handleChange} 
                                onInvalid={handleNumberValidation}
                                onInput={handleNumberValidation}
                                required
                                />
                                
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AddProduct;