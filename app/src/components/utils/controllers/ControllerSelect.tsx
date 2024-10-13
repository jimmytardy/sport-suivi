import { Box, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectProps, TextField } from '@mui/material'
import { useMemo } from 'react'
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

interface IControllerSelectProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TFieldOption extends object = TFieldValues[TName],
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
    id: string
    label: string
    options: TFieldOption[]
    selectProps?: SelectProps
    params: {
        keyId: keyof TFieldOption
        keyLabel: keyof TFieldOption
    }
    multiple?: boolean
    textOnEmpty?: string
}

export function ControllerSelect<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TFieldOption extends object = TFieldValues[TName],
>({ id, label, selectProps, options, params, multiple, textOnEmpty = 'Choississez une option', ...controllerProps }: IControllerSelectProps<TFieldValues, TName, TFieldOption>) {
    const BoxOnEmpty = useMemo(() => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{textOnEmpty}</Box>, [textOnEmpty])

    const renderValueMultiple: SelectProps['renderValue'] = (selected: unknown) => {
        if (Array.isArray(selected) && selected.length > 0) {
            return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => {
                        const item = options?.find((option) => option[params.keyId] == value)
                        if (item) {
                            return <Chip key={controllerProps.name + '-chip_value-' + value} label={item[params.keyLabel] as string} />
                        }
                    })}
                </Box>
            )
        } else {
            return BoxOnEmpty
        }
    }

    const renderValueOne: SelectProps['renderValue'] = (value: unknown) => {
        const item = options?.find((option) => option[params.keyId] == value)
        if (item) {
            return <ListItemText primary={item[params.keyLabel] as string} />
        }
        return BoxOnEmpty
    }

    const hasValueSelected = (value: string | string[] | null) => {
        if (Array.isArray(value)) {
            return value.length === 0
        } else return Boolean(value)
    }

    return (
        <Controller<TFieldValues, TName>
            {...controllerProps}
            render={({ field }) => (
                <FormControl fullWidth>
                    <InputLabel id={`${id}-label`} shrink>{label}</InputLabel>
                    <Select
                        {...field}
                        {...selectProps}
                        displayEmpty={true}
                        labelId={`${id}-label`}
                        id={id}
                        placeholder={label}
                        multiple={multiple}
                        label={label}
                        renderValue={multiple ? renderValueMultiple : renderValueOne}
                    >
                        {!multiple && <MenuItem disabled={!hasValueSelected(field.value)}>{textOnEmpty}</MenuItem>}
                        {options?.map((option: TFieldOption) => (
                            <MenuItem key={'list-item-' + option[params.keyId]} value={option[params.keyId] as string}>
                                {multiple && <Checkbox checked={field.value?.findIndex((selected: TFieldOption) => selected === option[params.keyId]) > -1} />}
                                <ListItemText primary={option[params.keyLabel] as string} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    )
}
