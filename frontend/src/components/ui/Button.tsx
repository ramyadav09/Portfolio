import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { resolvePlayStoreUrl } from '../../lib/utils'
import { buttonClasses, type ButtonStyleProps } from './buttonVariants'

export type { ButtonSize, ButtonVariant } from './buttonVariants'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size }, className)} {...rest} />
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyleProps & { href: string }

export function ButtonLink({ variant, size, className, href, ...rest }: ButtonLinkProps) {
  const targetHref = resolvePlayStoreUrl(href) ?? href
  return <a href={targetHref} className={buttonClasses({ variant, size }, className)} {...rest} />
}
