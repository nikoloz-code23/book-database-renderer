import type { FormValidationRecord } from "@/utils/FormManipulation";

export const hideValidationElements = (validationRecord : FormValidationRecord) => {
  for (const validationKey in validationRecord) {
    validationRecord[validationKey]?.classList.add("invisible");
  }
}