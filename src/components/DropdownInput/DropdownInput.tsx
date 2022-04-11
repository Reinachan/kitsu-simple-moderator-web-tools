import React, { FC, InputHTMLAttributes } from 'react';

import styles from './styles.module.css';

const DropdownInput: FC<InputHTMLAttributes<HTMLSelectElement>> = function ({
	className,
	children,
	...props
}) {
	return (
		<select {...props} className={[className, styles.dropdown].join(' ')}>
			{children}
		</select>
	);
};

export default DropdownInput;
