import { FC } from 'react';

type ChevronProps = {
  width?: string;
  height?: string;
  className?: string;
  fill?: string;
};

export const Chevron: FC<ChevronProps> = (props) => {
  const { width = '24', height = '24', fill, className } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M7 21L16 3' stroke='#BFC4C9' strokeWidth='2' strokeLinecap='round' />
    </svg>
  );
};
