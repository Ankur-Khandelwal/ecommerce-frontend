import React from 'react';
import Input from '../../../components/UI/Input';
import NewModal from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';

const UpdateCategoriesModal = (props) => {
  const {
    updateCategoryModal,
    setUpdateCategoryModal,
    handleCloseAndUpdate,
    handleCategoryInput,
    categoryList,
    expanded,
    checked
  } = props;

  return (
    <NewModal
      show={updateCategoryModal}
      handleClose={() => setUpdateCategoryModal(false)}
      handleCloseAndSave={handleCloseAndUpdate}
      modalTitle="Update Categories"
      mainButtonTitle="Update"
      mainButtonVariant="primary"
      secondaryButtonTitle="Cancel"
      size="lg"
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      {expanded.length > 0 &&
        expanded.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  type="text"
                  value={item.name}
                  placeholder="Category Name"
                  onChange={(e) =>
                    handleCategoryInput(
                      'name',
                      e.target.value,
                      index,
                      'expanded'
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  value={item.parentId}
                  className="form-control"
                  onChange={(e) =>
                    handleCategoryInput(
                      'parentId',
                      e.target.value,
                      index,
                      'expanded'
                    )
                  }
                >
                  <option value="">Select Parent Category</option>
                  {categoryList.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </Col>
              <Col>
                <select 
                className="form-control"
                value={item.type}
                onChange={(e) =>
                    handleCategoryInput(
                      'type',
                      e.target.value,
                      index,
                      'expanded'
                    )
                  }
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          );
        })}

      <Row>
        <Col>
          <h6>Checked</h6>
        </Col>
      </Row>
      {checked.length > 0 &&
        checked.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  type="text"
                  value={item.name}
                  placeholder="Category Name"
                  onChange={(e) =>
                    handleCategoryInput(
                      'name',
                      e.target.value,
                      index,
                      'checked'
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  value={item.parentId}
                  className="form-control"
                  onChange={(e) =>
                    handleCategoryInput(
                      'parentId',
                      e.target.value,
                      index,
                      'checked'
                    )
                  }
                >
                  <option value="">Select Parent Category</option>
                  {categoryList.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </Col>
              <Col>
                <select 
                className="form-control"
                value={item.type}
                onChange={(e) =>
                    handleCategoryInput(
                      'type',
                      e.target.value,
                      index,
                      'checked'
                    )
                  }
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          );
        })}
    </NewModal>
  );
};

export default UpdateCategoriesModal;