/* eslint-disable prettier/prettier */
import {InputText} from "../components/comuns/InputText";

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Components/Comum/InputText',
    component: InputText,
}
const Template = (arg,{argTypes}) => ({
    props: Object.keys(argTypes),
  components: {
    InputText
  },
  template: '<InputText v-bind="$props" />'
})
export const Email = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Email.args = {
  type: "email",
  label: 'Button',
  placeholder: "Exp: name@studymeta.com"
};
export const Passowrd = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Passowrd.args = {
  type: "passowrd",
  label: 'Passowrd',
  placeholder: "Passowrd"
};
export const Name = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Name.args = {
  label: 'Name',
  placeholder: "Joaquim"
};
