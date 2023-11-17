import React, { AnchorHTMLAttributes, FC } from 'react';


type EmailLinkProps = {
  email: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const EmailLink: FC<EmailLinkProps> = ({ email, ...props }) => (
  <a href={`mailto:${email}`} {...props}>{email}</a>
);