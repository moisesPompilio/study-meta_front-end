/* eslint-disable prettier/prettier */
import MyPage from './Page';

export default {
  title: 'Pages/Page',
  component: MyPage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = () => ({
  components: { MyPage },
  template: '<my-page />',
});

export const LoggedOut = Template.bind({});

