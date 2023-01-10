import { ButtonComp } from './Button';

export default {
  title: 'Button',
  component: ButtonComp,
};

function Template(args) {
  return <ButtonComp {...args} />;
}

export const Green = Template.bind({});
Green.args = {
  type: 'green',
  children: 'Button',
};

export const Red = Template.bind({});
Red.args = {
  type: 'red',
  children: 'Button',
};

export const Blue = Template.bind({});
Blue.args = {
  type: 'blue',
  children: 'Button',
};
