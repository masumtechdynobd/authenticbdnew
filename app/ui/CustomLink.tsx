import { cn } from '@/lib/utils';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type CustomLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

type CustomButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  // add any other button-specific props you need
};

const CustomLink: React.FC<CustomLinkProps> = ({ href = "", children, className }) => {
  return (
    <Link href={href} passHref className={clsx(`inline-block py-[6px] sm:py-[10px] px-[30px] sm:px-[72px] border-primary border-[1px] rounded-[35px] transition duration-300 ease-in-out hover:bg-primary-hover hover:text-white uppercase text-[12px]`, className)}>
      {children}
    </Link>
  );
};

export const CustomButton: React.FC<CustomButtonProps> = ({ children, className, onClick, disabled, ...rest }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={cn(`inline-block py-[6px] sm:py-[10px] px-[30px] sm:px-[72px] border-primary border-[1px] rounded-[35px] transition duration-300 ease-in-out hover:bg-primary-hover hover:text-white uppercase text-[12px] group `, className)}
    >
      {children}
    </button>
  );
};

export default CustomLink;
