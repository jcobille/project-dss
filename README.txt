User
- id:string
- email: string
- password:string
- name:string
- role: :string

Movies
- id: string
- title: string
- description: string
- releasedDate: date
- duration: string
- casts: [actor.id]
- image: string

Actors
- id
- name
- image_link

Reviews
- id: string
- movieId: string
- userId: string
- reviewStar: number
- movieReview: string
- status: boolean