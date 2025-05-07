import React from 'react'
import './addProducts.css';

export const AddProducts = () => {
    return (
        <div className="product-form">
            <form className="form-container">
                <div className="form-group">
                    <label className="form-label">Product Image</label>
                    <div className="image-upload-group">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input accept="image/*" type="file" id={`image${index}`} hidden />
                                <img
                                    className="upload-preview"
                                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                                    alt="upload"
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="product-name" className="form-label">Product Name</label>
                    <input id="product-name" type="text" className="form-input" placeholder="Type here" required />
                </div>

                <div className="form-group">
                    <label htmlFor="product-description" className="form-label">Product Description</label>
                    <textarea id="product-description" className="form-input" rows="4" placeholder="Type here"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select id="category" className="form-input">
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                <div className="form-row">
                    <div className="form-group small">
                        <label htmlFor="product-price" className="form-label">Product Price</label>
                        <input id="product-price" type="number" className="form-input" placeholder="0" required />
                    </div>
                    <div className="form-group small">
                        <label htmlFor="offer-price" className="form-label">Offer Price</label>
                        <input id="offer-price" type="number" className="form-input" placeholder="0" required />
                    </div>
                </div>

                <button type="submit" className="submit-btn">ADD</button>
            </form>
        </div>
    );
}
