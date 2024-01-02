import { ReactNode } from "react";
export type CenterProps = {
    children: ReactNode;
};

export type InputType = {
    placeholder?: string;
    value?: string;
    error?: string | undefined;
    disabled?: boolean | undefined;
    label?: string;
    type?: string | undefined;
    handleOnchange?: any;
}
export type ButtonType = {
    onPress?: () => void;
    children: ReactNode;
    width?: number | `${number}%`;
    marginTop?: number | `${number}%`;
    marginBottom?: number | `${number}%`;
}
export type label = {
    label: string;
    focused: boolean
}