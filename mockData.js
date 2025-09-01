// Your data here
const mockData = {
  events: [
    { title: 'Event 1', description: 'Description of Event 1' },
    { title: 'Event 2', description: 'Description of Event 2' },
  ],
};

export const getData = () => {
  return mockData.events;
};
