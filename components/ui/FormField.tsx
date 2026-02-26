/* ============================================================
   FormField — La Belle Détente Design System
   Labeled input / textarea / select primitive.
   Consistent with DurationSelector design vocabulary.
   ============================================================ */

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  rows?: number
  error?: string
  defaultValue?: string
  disabled?: boolean
}

const fieldBaseClass = `
  w-full px-4 py-3
  font-[family-name:var(--font-body)] text-[var(--text-base)]
  bg-[var(--color-surface)]
  border border-[var(--color-border)]
  rounded-[var(--radius-md)]
  placeholder:text-[var(--color-text-muted)]
  focus:outline-none focus:border-[var(--color-accent-500)]
  focus:ring-1 focus:ring-[var(--color-accent-500)]/30
  transition-colors duration-[var(--duration-fast)]
  disabled:opacity-50
`

const fieldErrorClass = 'border-red-400 focus:border-red-400 focus:ring-red-400/30'

const FormField = ({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  options = [],
  rows = 4,
  error,
  defaultValue,
  disabled = false,
}: FormFieldProps) => {
  const inputId = `field-${name}`
  const errorId = `field-${name}-error`
  const hasError = Boolean(error)
  const combinedClass = `${fieldBaseClass} ${hasError ? fieldErrorClass : ''}`.trim()

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputId}
        className="label-eyebrow block mb-2 text-[var(--color-text-secondary)]"
      >
        {label}
        {required && <span className="text-[var(--color-accent-600)] ml-1" aria-hidden="true">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`${combinedClass} resize-y min-h-[100px]`}
        />
      ) : type === 'select' ? (
        <select
          id={inputId}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ''}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={combinedClass}
        >
          <option value="" disabled>
            {placeholder ?? 'Sélectionner…'}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={combinedClass}
        />
      )}

      {hasError && (
        <p id={errorId} role="alert" className="text-xs text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

FormField.displayName = 'FormField'

export { FormField }
export type { FormFieldProps }
