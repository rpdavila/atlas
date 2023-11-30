/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getInstrument } from "../graphql/queries";
import { updateInstrument } from "../graphql/mutations";
const client = generateClient();
export default function InstrumentUpdateForm(props) {
  const {
    id: idProp,
    instrument: instrumentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    type: "",
    brand: "",
    serialNumber: "",
    rentStatus: "",
  };
  const [type, setType] = React.useState(initialValues.type);
  const [brand, setBrand] = React.useState(initialValues.brand);
  const [serialNumber, setSerialNumber] = React.useState(
    initialValues.serialNumber
  );
  const [rentStatus, setRentStatus] = React.useState(initialValues.rentStatus);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = instrumentRecord
      ? { ...initialValues, ...instrumentRecord }
      : initialValues;
    setType(cleanValues.type);
    setBrand(cleanValues.brand);
    setSerialNumber(cleanValues.serialNumber);
    setRentStatus(cleanValues.rentStatus);
    setErrors({});
  };
  const [instrumentRecord, setInstrumentRecord] =
    React.useState(instrumentModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getInstrument.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getInstrument
        : instrumentModelProp;
      setInstrumentRecord(record);
    };
    queryData();
  }, [idProp, instrumentModelProp]);
  React.useEffect(resetStateValues, [instrumentRecord]);
  const validations = {
    type: [{ type: "Required" }],
    brand: [{ type: "Required" }],
    serialNumber: [{ type: "Required" }],
    rentStatus: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          type,
          brand,
          serialNumber,
          rentStatus,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateInstrument.replaceAll("__typename", ""),
            variables: {
              input: {
                id: instrumentRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "InstrumentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Type"
        isRequired={true}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type: value,
              brand,
              serialNumber,
              rentStatus,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Brand"
        isRequired={true}
        isReadOnly={false}
        value={brand}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              brand: value,
              serialNumber,
              rentStatus,
            };
            const result = onChange(modelFields);
            value = result?.brand ?? value;
          }
          if (errors.brand?.hasError) {
            runValidationTasks("brand", value);
          }
          setBrand(value);
        }}
        onBlur={() => runValidationTasks("brand", brand)}
        errorMessage={errors.brand?.errorMessage}
        hasError={errors.brand?.hasError}
        {...getOverrideProps(overrides, "brand")}
      ></TextField>
      <TextField
        label="Serial number"
        isRequired={true}
        isReadOnly={false}
        value={serialNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              brand,
              serialNumber: value,
              rentStatus,
            };
            const result = onChange(modelFields);
            value = result?.serialNumber ?? value;
          }
          if (errors.serialNumber?.hasError) {
            runValidationTasks("serialNumber", value);
          }
          setSerialNumber(value);
        }}
        onBlur={() => runValidationTasks("serialNumber", serialNumber)}
        errorMessage={errors.serialNumber?.errorMessage}
        hasError={errors.serialNumber?.hasError}
        {...getOverrideProps(overrides, "serialNumber")}
      ></TextField>
      <SelectField
        label="Rent status"
        placeholder="Please select an option"
        isDisabled={false}
        value={rentStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              brand,
              serialNumber,
              rentStatus: value,
            };
            const result = onChange(modelFields);
            value = result?.rentStatus ?? value;
          }
          if (errors.rentStatus?.hasError) {
            runValidationTasks("rentStatus", value);
          }
          setRentStatus(value);
        }}
        onBlur={() => runValidationTasks("rentStatus", rentStatus)}
        errorMessage={errors.rentStatus?.errorMessage}
        hasError={errors.rentStatus?.hasError}
        {...getOverrideProps(overrides, "rentStatus")}
      >
        <option
          children="Rented"
          value="RENTED"
          {...getOverrideProps(overrides, "rentStatusoption0")}
        ></option>
        <option
          children="Available"
          value="AVAILABLE"
          {...getOverrideProps(overrides, "rentStatusoption1")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || instrumentModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || instrumentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
