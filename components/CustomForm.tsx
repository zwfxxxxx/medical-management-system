'use client'

import React from "react"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./form/LoginForm"
import Image from "next/image"
import DatePicke from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"

interface CustomProps {
    control: Control<any>
    fieldType: FormFieldType
    name: string
    label?: string
    placeholder?: string
    iconSrc?: string
    iconAlt?: string
    disabled?: boolean
    dateFormat?: string
    showTimeSelect?: boolean
    children?: React.ReactNode
    renderSkeleton?: (field: any) => React.ReactNode
    // other props
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const {fieldType, iconSrc, iconAlt, placeholder, renderSkeleton} = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounder-md border border-dark-500 bg-dark-500">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || "icon"}
                            width={24}
                            height={24}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={props.disabled}
                        />
                </FormControl>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="CN"
                        placeholder={placeholder}
                        international
                        // withCountryCallingCOde
                        onChange={field.onChange}
                        className="input-phone"
                    />
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounder-md border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="ml-2"
                    />
                    <FormControl>
                        <DatePicke
                            selected={field.value}
                            onChange={(data) => field.onChange(data)}
                            className="shad-input border-0"
                            dateFormat={props.dateFormat}
                            showTimeSelect={props.showTimeSelect}
                        />

                    </FormControl>
                </div>
            )
        case FormFieldType.SKELETON:
            return (
                renderSkeleton ? renderSkeleton(field) : null
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger">
                                <SelectValue placeholder={placeholder} className="shad-select placeholder-gray-400"/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                        {props.children}
                    </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label
                            htmlFor={props.name}
                            className="checkbox-label">{props.label}
                        </label>
                    </div>
                </FormControl>
            )
        default:
            break;
        }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label} = props;
    return(
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label &&(
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField  field={field}  props={props} />
                    <FormMessage className="shad-error" />


                </FormItem>
            )}
        />
    )
}

export default CustomFormField;