import { ref } from "yup";
import Reference from "yup/lib/Reference";

export const getReference = (value: string | number) => {
  return typeof value === "number" ? value : (ref(value) as Reference<number>);
};
