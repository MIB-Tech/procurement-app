import React, {AnchorHTMLAttributes, FC} from 'react'


type PhoneNumberLinkProps = {
  phoneNumber: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const PhoneNumberLink: FC<PhoneNumberLinkProps> = ({phoneNumber, ...props}) => (
  <a href={`tel:${phoneNumber}`} {...props}>{phoneNumber}</a>
)