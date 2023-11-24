/* eslint-disable @typescript-eslint/no-explicit-any */
// useFormManager.tsx

import { FormInstance } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useMemo, useState } from 'react'

/**
 * Interface representing the configuration for the Form Manager.
 *
 * @template TEntity - The type of the entity being managed by the form.
 * @template TModel - The type of the data model for the form.
 * @template TProps - Additional props for the form.
 */
export type FormManagerConfig<TEntity, TModel, TProps extends object> = {
  /**
   * The entity being managed by the form.
   */
  entity?: TEntity
  /**
   * Adapter function to convert the entity to the form data model.
   *
   * @param entity - The entity to be adapted.
   * @returns The adapted data model.
   */
  adapter: (entity: TEntity) => TModel
  /**
   * Additional props for the form.
   */
  props?: TProps
}

/**
 * Interface representing the common properties of the Form Manager.
 *
 * @template TModel - The type of the data model for the form.
 * @template TProps - Additional props for the form.
 */
export type FormModel<TModel, TProps extends object> = TProps & {
  /**
   * The current value of the form.
   */
  value: TModel
  /**
   * Indicates whether the form is in editing mode.
   */
  editing: boolean
  /**
   * Form Instance from Ant Design's useForm hook.
   */
  instance: FormInstance<TModel>
  /**
   * Sets the editing status and synchronizes the form fields when entering editing mode.
   *
   * @param editing - The new editing status.
   */
  setEditing: (editing: boolean) => void
  /**
   * Cancels the editing mode, reverts changes, and resets the form fields.
   */
  cancelEditing: () => void
  /**
   * Patches changes to the form value and updates the form fields.
   *
   * @param changes - The changes to apply to the form value.
   */
  patch: (changes: TModel) => void
  /**
   * Submits the form using Ant Design's submit function.
   */
  submit: () => void
}

/**
 * useFormManager Hook
 *
 * This hook provides a Form Manager for handling form state, actions, and interactions.
 * It is designed to streamline form management for diverse data objects in React applications.
 *
 * @param config - Configuration for the Form Manager.
 * @returns FormManager object containing form state and actions.
 * @template TEntity - The type of the entity being managed by the form.
 * @template TModel - The type of the data model for the form.
 * @template TProps - Additional props for the form.
 */
export const useFormManager = <TEntity, TModel, TProps extends object>(
  config: FormManagerConfig<TEntity, TModel, TProps>
) => {
  const { entity, adapter, props } = config

  const [value, setValue] = useState<TModel>(entity ? adapter(entity) : ({} as TModel))
  const [oldValue, setOldValue] = useState<TModel>(entity ? adapter(entity) : ({} as TModel))
  const [editing, setEditing] = useState(false)

  const [instance] = useForm<TModel>()

  // Effect to update form value when the entity changes.
  // We assume that the entity is not re-fetched from the backend on each render
  useEffect(() => {
    setValue(entity ? adapter(entity) : ({} as TModel))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity])

  return useMemo(
    () => ({
      ...props,
      value,
      editing,
      instance,
      setEditing: (editing: boolean) => {
        setEditing(editing)
        if (editing) {
          instance.setFieldsValue(value as any)
          setOldValue({ ...value })
        }
      },
      cancelEditing: () => {
        setEditing(false)
        setValue({ ...oldValue })
        instance.resetFields()
      },
      patch: (changes: TModel) => {
        const newValue = { ...value, ...changes }
        setValue(newValue)
        instance.setFieldsValue(newValue as any)
      },
      submit: () => {
        instance.submit()
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, editing, entity]
  ) as FormModel<TModel, TProps>
}
