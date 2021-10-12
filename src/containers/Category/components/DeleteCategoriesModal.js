import React from 'react';
import NewModal from '../../../components/UI/Modal';

const DeleteCategoriesModal = (props) => {
  const {
    deleteCategoryModalVisibility,
    setDeleteCategoryModalVisibility,
    deleteCategories,
    checked
  } = props;
  
  return (
    <NewModal
      show={deleteCategoryModalVisibility}
      handleClose={() => setDeleteCategoryModalVisibility(false)}
      handleCloseAndSave={deleteCategories}
      modalTitle="Delete Categories"
      mainButtonTitle="Delete"
      mainButtonVariant="danger"
      secondaryButtonTitle="Cancel"
      size="md"
    >
      <h6 style={{fontWeight:'bold', color: 'red'}}>Are you sure you want to delete these selected categories?</h6>
      {checked.map((item, index) => <p key={index}><b>{item.name}</b></p>)}

    </NewModal>
  );
};

export default DeleteCategoriesModal;