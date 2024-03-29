import { FC } from 'react';

type StarProps = {
  fill?: string;
  width?: string;
  height?: string;
  className?: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const Star: FC<StarProps> = (props) => {
  const { fill, width = '24', height = '24', className, onClick, onMouseEnter, onMouseLeave } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        d='M9.59798 8.30426L12 2.54946L14.402 8.30426C14.5419 8.63938 14.8576 8.86723 15.2187 8.89608L21.4493 9.39383L16.7036 13.4448C16.4276 13.6804 16.3064 14.0508 16.391 14.4042L17.8415 20.4636L12.5041 17.215C12.1945 17.0266 11.8055 17.0266 11.4959 17.215L6.15848 20.4636L7.60898 14.4042C7.69359 14.0508 7.57245 13.6804 7.29644 13.4448L2.55067 9.39383L8.78134 8.89608C9.14244 8.86723 9.4581 8.63938 9.59798 8.30426Z'
        stroke='#FFBC1F'
      />
    </svg>
  );
};
