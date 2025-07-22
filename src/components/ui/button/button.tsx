import type { TButtonUIProps } from './type';
import styles from './Button.module.scss';


export const Button = ({
	onClick,
	children,
}: TButtonUIProps) => (
	<button
		className={styles.button}
		onClick={onClick}
        type="button">
		{children}
	</button>
);