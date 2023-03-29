import { FC } from 'react';

type CleanProps = {
  width?: string;
  height?: string;
  className?: string;
  onClick: () => void;
};

export const Clean: FC<CleanProps> = (props) => {
  const { width = '16', height = '16', className, onClick } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.4716 3.52864C12.7319 3.78899 12.7319 4.2111 12.4716 4.47145L4.47157 12.4714C4.21122 12.7318 3.78911 12.7318 3.52876 12.4714C3.26841 12.2111 3.26841 11.789 3.52876 11.5286L11.5288 3.52864C11.7891 3.26829 12.2112 3.26829 12.4716 3.52864Z'
        fill='url(#paint0_linear_4766_33963)'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.52876 3.52864C3.78911 3.26829 4.21122 3.26829 4.47157 3.52864L12.4716 11.5286C12.7319 11.789 12.7319 12.2111 12.4716 12.4714C12.2112 12.7318 11.7891 12.7318 11.5288 12.4714L3.52876 4.47145C3.26841 4.2111 3.26841 3.78899 3.52876 3.52864Z'
        fill='url(#paint1_linear_4766_33963)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_4766_33963'
          x1='7.99216'
          y1='-6.58329'
          x2='-28.1338'
          y2='19.925'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#F83600' />
          <stop offset='1' stopColor='#F9D423' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_4766_33963'
          x1='7.99216'
          y1='-6.58329'
          x2='-28.1338'
          y2='19.925'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#F83600' />
          <stop offset='1' stopColor='#F9D423' />
        </linearGradient>
      </defs>
    </svg>
  );
};
