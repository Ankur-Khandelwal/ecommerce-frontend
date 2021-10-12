import React from 'react';
import Input from '../../../components/UI/Input';
import NewModal from '../../../components/UI/Modal';

const AddCategoriesModal = (props) => {

  const {
    show,
    handleClose,
    handleCloseAndAdd,
    categoryName,
    parentCategoryId,
    handleCategoryImage,
    setCategoryName,
    setParentCategoryId,
    categoryList
  } = props;

  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      handleCloseAndSave={handleCloseAndAdd}
      modalTitle="Add New Category"
      mainButtonTitle="Add"
      mainButtonVariant="primary"
      secondaryButtonTitle="Cancel"
      size="md"
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
        {categoryList.map((option) => {
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
  );
};

export default AddCategoriesModal;