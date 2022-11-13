export const moviesMockData = {
  movies: [
    {
      id: "635d3d39425fc647181495f2",
      title: "Black Adam",
      description:
        "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
      releasedDate: "2022-10-19",
      duration: 126,
      image:
        "https://img.xmovies8.fun/xxrz/250x400/100/15/1b/151b961f5343bebb7f434f3060079d97/151b961f5343bebb7f434f3060079d97.jpg",
      cost: "$100 million",
    },
    {
      id: "635e2a561fd72a3b343f1576",
      title: "Barbarian",
      description:
        "In town for a job interview, a young woman arrives at her Airbnb late at night only to find that it has been mistakenly double-booked and a strange man is already staying there. Against her better judgement, she decides to stay the night anyway, but soon discovers that there is much more to be afraid of in the house than the other house guest.",
      releasedDate: "2022-09-08",
      duration: 102,
      image:
        "https://img.xmovies8.fun/xxrz/250x400/100/0a/b0/0ab08224c226dd6b284144f1b91dac79/0ab08224c226dd6b284144f1b91dac79.jpg",
      cost: "$10 million",
    },
    {
      id: "6364b81eb40f06357c9ccc6e",
      title: "Titanic: Blood and Steel",
      description:
        "Belfast, 1909. The Harland and Wolff shipyard has been handed the greatest project in its history. It will build a great, unsinkable ship. And it will be called the RMS Titanic.",
      releasedDate: "2012-07-11",
      duration: 60,
      image:
        "https://img.xmovies8.fun/xxrz/250x400/100/7a/18/7a1852a950b65f85d1f479a9faf274e0/7a1852a950b65f85d1f479a9faf274e0.jpg",
      cost: "$10 million",
    },
  ],
  details: {
    id: "635d3d39425fc647181495f2",
    title: "Black Adam",
    description:
      "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
    releasedDate: "2022-10-19",
    duration: 126,
    image:
      "https://img.xmovies8.fun/xxrz/250x400/100/15/1b/151b961f5343bebb7f434f3060079d97/151b961f5343bebb7f434f3060079d97.jpg",
    cost: "$100 million",
  },
  actorMovies: [
    {
      id: "635d3d39425fc647181495f2",
      title: "Black Adam",
      description:
        "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
      cost: "$10 million",
      releasedDate: "2022-10-19",
      duration: 126,
      image:
        "https://img.xmovies8.fun/xxrz/250x400/100/15/1b/151b961f5343bebb7f434f3060079d97/151b961f5343bebb7f434f3060079d97.jpg",
    },
  ],
};

export const currentUserMockData = {
  details: {
    id: "636c6b5a6861ba21acb89047",
    firstName: "John",
    lastName: "Doe",
    email: "john@mail.com",
    role: "User",
    isRoot: false,
    isActive: true,
  },
};

export const actorListMockData = {
  actors: [
    {
      firstName: "Dwayne",
      lastName: "Johnson",
      age: 50,
      gender: "Male",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg",
    },
    {
      firstName: "Sarah",
      lastName: "Shahi",
      age: 42,
      gender: "Female",
      image:
        "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR6bMpT-g99Sl1A9UtU6L5X4VcN_ADVkV2pKsFD2TTW2jDDRN1asWn7ZbyrjZ8nan3tZn38A9dnHmpRhZg",
    },
  ],
  selectedActor: {
    id: "6369cf9f6b314926684a432e",
    firstName: "Dwayne",
    lastName: "Johnson",
    gender: "Male",
    age: 50,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg",
  },
};

export const reviewListMockData = {
  data: [
    {
      id: "636e04d52b822425888c846e",
      reviewScore: 2,
      description: "This is a sample review",
      postedDate: "2022-11-11T08:16:21.896Z",
      status: "approved",
      movieId: "635d3d39425fc647181495f2",
      userId: "636e039a2b822425888c846c",
      user: {
        id: "636e039a2b822425888c846c",
        firstName: "aryan",
        lastName: "aryan",
        email: "aryan@gmail.com",
        role: "User",
        isRoot: false,
        isActive: true,
      },
    },
  ],
};

export const userListMockData = {
  data: [
    {
      id: "636c69114acb654708129bd2",
      firstName: "root",
      lastName: "admin",
      email: "root@admin.com",
      role: "Admin",
      isRoot: true,
      isActive: true,
    },
    {
      id: "636c6b5a6861ba21acb89047",
      firstName: "John",
      lastName: "Doe",
      email: "john@mail.com",
      role: "User",
      isRoot: false,
      isActive: true,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@mail.com",
      role: "User",
      isRoot: false,
      isActive: true,
    },
  ],
};
