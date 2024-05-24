import { StringFormat } from "./StringColumn";
import { HTMLInputTypeAttribute } from "react";

export const formatToInputType: (
  format: StringFormat
) => HTMLInputTypeAttribute = (format: StringFormat) => {
  switch (format) {
    case StringFormat.PhoneNumber:
      return "tel";
    case StringFormat.Email:
      return "email";
    case StringFormat.Link:
      return "url";
    case StringFormat.Password:
      return "password";
    default:
      return "text";
  }
};
