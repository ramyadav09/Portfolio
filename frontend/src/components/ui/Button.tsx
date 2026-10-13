import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { buttonClasses, type ButtonStyleProps } from './buttonVariants'

export type { ButtonSize, ButtonVariant } from './buttonVariants'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size }, className)} {...rest} />
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyleProps & { href: string }

export function ButtonLink({ variant, size, className, ...rest }: ButtonLinkProps) {
  return <a className={buttonClasses({ variant, size }, className)} {...rest} />
}
