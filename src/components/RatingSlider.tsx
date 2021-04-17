import React from "react";
import Slider from "@material-ui/core/Slider";
import { FormikErrors } from "formik";

interface Props {
  value: number;
  fieldName: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          feedback: string;
          visual: number;
          content: number;
          relevance: number;
        }>
      >;
}

const RatingSlider: React.FC<Props> = ({ value, fieldName, setFieldValue }) => {
  return (
    <Slider
      value={value}
      onChange={(event, val) => setFieldValue(fieldName, val)}
      valueLabelDisplay="auto"
      step={1}
      marks
      min={1}
      max={5}
    />
  );
};

export default RatingSlider;
