import { ItemThreadComp } from './ItemThreadComp';

export default {
  title: 'ItemThread Comp',
  component: ItemThreadComp,
};

function Template(args) {
  return <ItemThreadComp {...args} />;
}

export const Dark = Template.bind({});
export const Light = Template.bind({});

Dark.args = {
  bgColor: 'dark',
  color: 'dark',
};

Light.args = {
  bgColor: 'light',
  color: 'light',
};
