import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import { addProduct } from '../../actions';
import NewModal from '../../components/UI/Modal';
import './styles.css';
import { generatePublicUrl } from '../../urlConfig';

function Products() {
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);

  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCloseAndSave = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('stock', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }

    dispatch(addProduct(form));
    setShow(false);
    setName('');
    setQuantity(1);
    setPrice('');
    setDescription('');
    setCategoryId('');
    setProductPictures([]);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderAddProductModal = () => {
    return(
      <NewModal
      show={show}
      handleClose={handleClose}
      handleCloseAndSave={handleCloseAndSave}
      modalTitle="Add New Product"
    >
      <Input
        label="Name"
        type="text"
        value={name}
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Quantity"
        type="number"
        value={quantity}
        placeholder="Product Quanitity"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Input
        label="Price"
        type="number"
        value={price}
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        label="Description"
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={categoryId}
        className="form-control"
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select Category</option>
        {createCategoryList(category.categories).map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>

      <input
        type="file"
        name="productPicture"
        onChange={(e) => {
          handleProductPictures(e);
        }}
      ></input>
      {productPictures.length > 0
        ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>)
        : null}
    </NewModal>
    );
  };

  const handleCloseProductDetailModal = () => {
    setProductDetailModal(false);
  };

  const renderProductDetailModal = () => {
    if (!productDetails) return null;
    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailModal}
        modalTitle={'Product Details'}
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.stock}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <label className="key">Pictures</label>
            <div style={{ display: 'flex' }}>
              {productDetails.productPictures.map((pic, index) => (
                <div className="productImageContainer">
                  <img
                    key={index}
                    src={generatePublicUrl(pic.img)}
                    alt="product"
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Table responsive="sm" style={{ fontSize: '12px' }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {product.products.length > 0
                    ? product.products.map((product) => (
                        <tr
                          key={product._id}
                          onClick={() => showProductDetailsModal(product)}
                        >
                          <td>1</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td>{product.category.name}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailModal()}
    </Layout>
  );
}

export default Products;
