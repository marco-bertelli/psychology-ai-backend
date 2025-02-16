export const defaultUserEmotions = [
    {
        emotion: 'sadness',
        score: 0,
        color: 'blue',
        exaColor: '#0000FF',
    },
    {
        emotion: 'fear',
        score: 0,
        color: 'black',
        exaColor: '#000000',
    },
    {
        emotion: 'happiness',
        score: 0,
        color: 'yellow',
        exaColor: '#FFFF00',
    },
    {
        emotion: 'anger',
        score: 0,
        color: 'red',
        exaColor: '#FF0000',
    },
    {
        emotion: 'neutral',
        score: 0,
        color: 'grey',
        exaColor: '#808080',
    },
    {
        emotion: 'surprise',
        score: 0,
        color: 'purple',
        exaColor: '#800080',
    },
    {
        emotion: 'disgust',
        score: 0,
        color: 'green',
        exaColor: '#008000',
    }
]

export type UserEmotion = {
    emotion: string,
    score: number,
    color: string,
    exaColor: string,
}