import React, { HTMLProps } from 'react';

import SpinnerImage from 'assets/spinner.svg?component';

import styles from './styles.module.css';

interface SpinnerProps {
	className?: string;
	size?: React.SVGAttributes<SVGElement>['height'];
}

export default function Spinner({
	className,
	size = '1.2em',
}: SpinnerProps): JSX.Element {
	return (
		<SpinnerImage
			className={`${styles.spinner} ${className}`}
			height={size}
			width={size}
		/>
	);
}

export const SpinnerBlock: React.FC<
	HTMLProps<HTMLDivElement> & {
		size?: React.SVGAttributes<SVGElement>['height'];
	}
> = function ({ size = '3em', className, ...props }) {
	return (
		<div className={[styles.spinnerBlock, className].join(' ')} {...props}>
			<Spinner size={size} />
		</div>
	);
};
