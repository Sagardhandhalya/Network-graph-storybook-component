import React from 'react';
import NetworkGraph from '../components/NetworkGraph/NetworkGraph';

export default {
  title: 'Graph/NetworkGraph',
  component: NetworkGraph,
  argTypes: {

  },
};

const Template = args => <NetworkGraph {...args}/>;

export const Default = Template.bind({})
console.log(Default);
Default.args={
    persons :[{id:1,name:"sagar Dineshbhai Dhandhalya"},{id:2,name:"samair"},{id:3,name:"samething.."}],
    relations:[{p1:1,p2:2}]
}