// form-elements.tsx

/**
 * Interface representing the form elements for a specific set of keys.
 *
 * @template Keys - The keys for the form elements.
 */
export type FormElements<Keys extends string> = Record<Keys, React.ReactNode | string | number | undefined>
