import { FC } from 'react';

type HightlightProps = {
  filter: string | string;
  str: string | any;
};

export const Hightlight: FC<HightlightProps> = (props) => {
  const { filter, str } = props;

  if (!filter) return str;

  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);

  if (matchValue) {
    return str.split(regexp).map((s: string, index: number, array: []) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();

        return (
          <div style={{ display: 'inline' }}>
            {s}
            <span data-test-id='highlight-matches' style={{ color: '#ff5253' }}>
              {c}
            </span>
          </div>
        );
      }

      return s;
    });
  }

  return str;
};
