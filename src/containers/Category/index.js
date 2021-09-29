import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions';
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/Modal';

function Category() {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  const handleCloseAndSave = () => {
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);

    dispatch(addCategory(form));
    setCategoryName('');
    setParentCategoryId('');
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>
      <NewModal
        show={show}
        handleClose={handleClose}
        handleCloseAndSave={handleCloseAndSave}
        modalTitle="Add New Category"
      >
        <Input
          type="text"
          value={categoryName}
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          value={parentCategoryId}
          className="form-control"
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option value="">Select Parent Category</option>
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
          name="categoryImage"
          onChange={(e) => {
            handleCategoryImage(e);
          }}
        ></input>
      </NewModal>
    </Layout>
  );
}

export default Category;
