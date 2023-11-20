/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type InstrumentCreateFormInputValues = {
    type?: string;
    brand?: string;
    serialNumber?: string;
    rentStatus?: string;
};
export declare type InstrumentCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    brand?: ValidationFunction<string>;
    serialNumber?: ValidationFunction<string>;
    rentStatus?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InstrumentCreateFormOverridesProps = {
    InstrumentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    brand?: PrimitiveOverrideProps<TextFieldProps>;
    serialNumber?: PrimitiveOverrideProps<TextFieldProps>;
    rentStatus?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InstrumentCreateFormProps = React.PropsWithChildren<{
    overrides?: InstrumentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InstrumentCreateFormInputValues) => InstrumentCreateFormInputValues;
    onSuccess?: (fields: InstrumentCreateFormInputValues) => void;
    onError?: (fields: InstrumentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InstrumentCreateFormInputValues) => InstrumentCreateFormInputValues;
    onValidate?: InstrumentCreateFormValidationValues;
} & React.CSSProperties>;
export default function InstrumentCreateForm(props: InstrumentCreateFormProps): React.ReactElement;
