import PropTypes from 'prop-types';
import { Button } from '../components/atoms/Button';

export function ButtonComp(args) {
  return <Button {...args} />;
}

ButtonComp.propTypes = {
  /** type is a variant to give the button style */
  type: PropTypes.string,
  /** children is a child of the button */
  children: PropTypes.string,
};

ButtonComp.defaultProps = {
  type: 'green',
  children: 'Button',
};
