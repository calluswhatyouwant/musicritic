const reviewMock = {
  albumId: 'album',
  post: `You called me again, drunk in your Benz, driving home under the
  influence. You scared me to death but I am wasting my breath, because you only listen
  to your f-ing friends... I do not relate to you, I do not relate to you,
  no! 'Cause I would never treat me this sh-, you made me hate this city.`,
  createdAt: new Date(),
  updatedAt: new Date(),
  author: {
    id: 'tayla13',
    image:
      'https://pbs.twimg.com/profile_images/1405947624184713220/aCLC4bTE_400x400.jpg',
    name: 'Tayla Shift',
  },
  edited: false,
}

export const reviewMocks = [
  { ...reviewMock, id: '1', rating: 5 },
  { ...reviewMock, id: '2', rating: 3.5 },
  { ...reviewMock, id: '3', rating: 4.5 },
  { ...reviewMock, id: '4', rating: 5 },
]
