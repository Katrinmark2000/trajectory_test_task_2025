import type { TButtonUIProps } from './type';
import styles from './Button.module.scss';
import clsx from 'clsx'


export const Button = ({
	onClick,
	children,
	className
}: TButtonUIProps) => (
	<button
	className={clsx(styles.button, className)}
		onClick={onClick}
        type="button">
		{children}
	</button>
);