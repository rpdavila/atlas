/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Instrument } from "../API.ts";
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
export declare type InstrumentUpdateFormInputValues = {
    type?: string;
    brand?: string;
    serialNumber?: string;
    rentStatus?: string;
};
export declare type InstrumentUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
    brand?: ValidationFunction<string>;
    serialNumber?: ValidationFunction<string>;
    rentStatus?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InstrumentUpdateFormOverridesProps = {
    InstrumentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    brand?: PrimitiveOverrideProps<TextFieldProps>;
    serialNumber?: PrimitiveOverrideProps<TextFieldProps>;
    rentStatus?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type InstrumentUpdateFormProps = React.PropsWithChildren<{
    overrides?: InstrumentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    instrument?: Instrument;
    onSubmit?: (fields: InstrumentUpdateFormInputValues) => InstrumentUpdateFormInputValues;
    onSuccess?: (fields: InstrumentUpdateFormInputValues) => void;
    onError?: (fields: InstrumentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InstrumentUpdateFormInputValues) => InstrumentUpdateFormInputValues;
    onValidate?: InstrumentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function InstrumentUpdateForm(props: InstrumentUpdateFormProps): React.ReactElement;
