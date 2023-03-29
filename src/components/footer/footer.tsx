import { FC } from 'react';

import Fb from '../../assets/icon/fb.svg';
import Inst from '../../assets/icon/inst.svg';
import Linkedin from '../../assets/icon/linkedin.svg';
import Vk from '../../assets/icon/vk.svg';

import styles from './footer.module.scss';

export const Footer: FC = () => (
  <footer className={styles.footer}>
    <span className={styles.footerCopy}>© 2020-2023 Cleverland. Все права защищены.</span>
    <div className={styles.footerSocial}>
      <a href='/'>
        <img src={Fb} alt='facebook' />
      </a>
      <a href='/'>
        <img src={Inst} alt='inst' />
      </a>
      <a href='/'>
        <img src={Vk} alt='vk' />
      </a>
      <a href='/'>
        <img src={Linkedin} alt='linkedin' />
      </a>
    </div>
  </footer>
);
