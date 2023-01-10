import { NavbarComp } from './NavbarComp';

export default {
  title: 'Navbar Comp',
  component: NavbarComp,
};

function Template(args) {
  return <NavbarComp {...args} />;
}

export const Dark = Template.bind({});
export const Light = Template.bind({});

Dark.args = {
  bgColor: 'dark',
  txtColor: 'dark',
};

Light.args = {
  bgColor: 'light',
  txtColor: 'light',
};
