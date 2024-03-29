import { FC } from 'react';

type CloseProps = {
  fill?: string;
  width?: string;
  height?: string;
  className?: string;
};

export const Close: FC<CloseProps> = (props) => {
  const { fill, width = '32', height = '32', className } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 32 32'
      className={className}
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24.9428 7.0572C25.4635 7.5779 25.4635 8.42212 24.9428 8.94281L8.94277 24.9428C8.42207 25.4635 7.57785 25.4635 7.05715 24.9428C6.53645 24.4221 6.53645 23.5779 7.05715 23.0572L23.0572 7.0572C23.5779 6.5365 24.4221 6.5365 24.9428 7.0572Z'
        fill='url(#paint0_linear_14708_670)'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.05715 7.0572C7.57785 6.5365 8.42207 6.5365 8.94277 7.0572L24.9428 23.0572C25.4635 23.5779 25.4635 24.4221 24.9428 24.9428C24.4221 25.4635 23.5779 25.4635 23.0572 24.9428L7.05715 8.94281C6.53645 8.42212 6.53645 7.5779 7.05715 7.0572Z'
        fill='url(#paint1_linear_14708_670)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_14708_670'
          x1='15.6638'
          y1='-28.0417'
          x2='-56.48'
          y2='29.1756'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#F83600' />
          <stop offset='1' stopColor='#F9D423' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_14708_670'
          x1='15.6638'
          y1='-28.0417'
          x2='-56.48'
          y2='29.1756'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#F83600' />
          <stop offset='1' stopColor='#F9D423' />
        </linearGradient>
      </defs>
    </svg>
  );
};
