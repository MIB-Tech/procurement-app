import React from "react";
import axios from "axios";

// @ts-ignore
const CreateAccountingButton = ({ invoiceId }) => {
  const handleButtonClick = () => {
    axios
      .post("/bulk/create-accounting", { invoiceId })
      .then((response) => {
        console.log("Accounting created", response.data);
      })
      .catch((error) => {
        console.error("There was an error creating the accounting!", error);
      });
  };

  return <button onClick={handleButtonClick}>Create Accounting</button>;
};

export default CreateAccountingButton;
