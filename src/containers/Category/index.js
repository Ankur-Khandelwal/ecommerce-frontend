import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory, updateCategories, deleteCategories as deleteAction } from '../../actions';
import NewModal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { BiCheckbox, BiCheckboxSquare } from 'react-icons/bi';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import DeleteCategoriesModal from './components/DeleteCategoriesModal';

function Category() {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModalVisibility, setDeleteCategoryModalVisibility] = useState(false);

  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const handleCloseAndAdd = () => {
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);
    dispatch(addCategory(form));
    setCategoryName('');
    setParentCategoryId('');
    setShow(false);
  };

  const handleCloseAndUpdate = () => {
    const form = new FormData();
    expanded.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
    });
    checked.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
    });

    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);


  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateModalCall = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
    updateCheckedAndExpandedCategories();
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === 'checked') {
      const updatedCheckedArray = checked.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setChecked(updatedCheckedArray);
    } else if (type === 'expanded') {
      const updatedExpandedArray = expanded.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpanded(updatedExpandedArray);
    }
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checked = [];
    const expanded = [];
    checkedArray.length > 0 &&
      checkedArray.forEach((categoryId, index) => {
        const category = categories.find(
          (category) => category.value === categoryId
        );
        category && checked.push(category);
      });
    expandedArray.length > 0 &&
      expandedArray.forEach((categoryId, index) => {
        const category = categories.find(
          (category) => category.value === categoryId
        );
        category && expanded.push(category);
      });
    setChecked(checked);
    setExpanded(expanded);
    // console.log({ checkedArray, expandedArray, checked, expanded });
  };
  const deleteCategories = () => {
    const checkedIdsArray = checked.map((item, index) => ({_id: item.value}));
    dispatch(deleteAction(checkedIdsArray))
    setDeleteCategoryModalVisibility(false);
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
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checkedArray}
              expanded={expandedArray}
              onCheck={(checked) => setCheckedArray(checked)}
              onExpand={(expanded) => setExpandedArray(expanded)}
              icons={{
                check: <BiCheckboxSquare />,
                uncheck: <BiCheckbox />,
                halfCheck: <BiCheckbox />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              onClick={() => {
                updateCheckedAndExpandedCategories();
                setDeleteCategoryModalVisibility(true);
              }}
            >
              Delete
            </button>
            <button onClick={() => updateModalCall()}>Edit</button>
          </Col>
        </Row>
      </Container>

      {/*ADD CATEGORIES*/}
      <AddCategoryModal
      show={show}
      handleClose={handleClose}
      handleCloseAndAdd={handleCloseAndAdd}
      categoryName={categoryName}
      setCategoryName={setCategoryName}
      parentCategoryId={parentCategoryId}
      setParentCategoryId={setParentCategoryId}
      handleCategoryImage={handleCategoryImage}
      categoryList = {createCategoryList(category.categories)}
      />

      {/*EDIT CATEGORIES*/}
      <UpdateCategoriesModal
        updateCategoryModal={updateCategoryModal}
        setUpdateCategoryModal={setUpdateCategoryModal}
        handleCloseAndUpdate={handleCloseAndUpdate}
        handleCategoryInput={handleCategoryInput}
        expanded={expanded}
        checked={checked}
        categoryList={createCategoryList(category.categories)}
      />

      {/*DELETE CATEGORIES*/}
      <DeleteCategoriesModal
        deleteCategoryModalVisibility={deleteCategoryModalVisibility}
        setDeleteCategoryModalVisibility={setDeleteCategoryModalVisibility}
        deleteCategories={deleteCategories}
        checked={checked}
      />

    </Layout>
  );
}

export default Category;
