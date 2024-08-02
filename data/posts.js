import { USERS } from "./users";

export const POSTS = [
    {
        imageUrl: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        user: 'mcmahon.joshua',
        likes: 270,
        caption: 'Look at this Cat!',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'mike',
                comment: 'Wow, that is an amazin cat!'
            },
        ]

    },
    {
        imageUrl: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        user: 'mcmahon.joshua',
        likes: 340,
        caption: 'Look at this Cat!',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'mike',
                comment: 'Wow, that is an amazin cat!'
            },
            {
                user: 'joebob',
                comment: 'I agree, that cat is super cool!'
            },
        ]

    }
]