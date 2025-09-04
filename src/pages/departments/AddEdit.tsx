import type { FC } from "react";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  return <div>AddEdit</div>;
};

export default AddEdit;
