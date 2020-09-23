
import React from 'react';
import { oneOf, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const classBase = 'ui-button';

const UIButton = ({ onClick, to, theme, rounded, children, className, ...restProps }) => {
	const Component = to ? Link : 'button';

	return (
		<Component
			{...restProps}
			className={classNames(className, classBase, `${classBase}--${theme}`, {
				[`${classBase}--rounded`]: rounded,
			})}
			onClick={onClick}
			to={to}
		>
			{children}
		</Component>
	)
}

UIButton.propTypes = {
	rounded: bool,
	theme: oneOf([
		'bordered-green',
		'contained-green',
		'contained-red',
		'contained-blue',
		'contained-yellow',
	]),
};

export default UIButton;

