import { FC } from 'react';

type SearchProps = {
  fill?: string;
  width?: string;
  height?: string;
  className?: string;
};

export const Search: FC<SearchProps> = (props) => {
  const { fill, width = '16', height = '16', className } = props;

  return (
    <svg width={width} height={height} viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.3335 2.66671C4.75617 2.66671 2.66683 4.75605 2.66683 7.33337C2.66683 9.9107 4.75617 12 7.3335 12C9.91083 12 12.0002 9.9107 12.0002 7.33337C12.0002 4.75605 9.91083 2.66671 7.3335 2.66671ZM1.3335 7.33337C1.3335 4.01967 4.01979 1.33337 7.3335 1.33337C10.6472 1.33337 13.3335 4.01967 13.3335 7.33337C13.3335 10.6471 10.6472 13.3334 7.3335 13.3334C4.01979 13.3334 1.3335 10.6471 1.3335 7.33337Z'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.6284 10.6286C10.8887 10.3683 11.3108 10.3683 11.5712 10.6286L14.4712 13.5286C14.7315 13.789 14.7315 14.2111 14.4712 14.4714C14.2108 14.7318 13.7887 14.7318 13.5284 14.4714L10.6284 11.5714C10.368 11.3111 10.368 10.889 10.6284 10.6286Z'
      />
    </svg>
  );
};
