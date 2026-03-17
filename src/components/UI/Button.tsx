// src/components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// Define ALL variants in one place — this is the design system contract
const buttonVariants = cva(
  // Base classes — always applied
  'inline-flex items-center justify-center font-semibold transition-all duration-normal focus-ring select-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:   'bg-accent text-accent-fg hover:bg-accent-hover active:scale-95',
        secondary: 'border border-border text-fg-primary hover:border-border-strong hover:bg-bg-elevated',
        ghost:     'text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated',
        danger:    'bg-error text-white hover:opacity-90',
      },
      size: {
        sm:   'h-8  px-4  text-sm  rounded-full',
        md:   'h-10 px-6  text-sm  rounded-full',
        lg:   'h-12 px-8  text-base rounded-full',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'md',
    },
  }
)

// TypeScript infers the valid variant/size combinations automatically
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ variant, size, loading, className, children, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : null}
      {children}
    </button>
  )
}

export default Button

// Usage — TypeScript autocompletes and errors on invalid combinations:
// <Button variant="primary" size="lg">Play</Button>
// <Button variant="ghost" size="icon"><HeartIcon /></Button>
// <Button variant="invalid">  ← TypeScript error