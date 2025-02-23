export const defaultUserEmotions = [
    {
        emotion: 'sadness',
        score: 0,
        color: 'blue',
        exaColor: '#41BDEE',
    },
    {
        emotion: 'fear',
        score: 0,
        color: 'black',
        exaColor: '#974099',
    },
    {
        emotion: 'happiness',
        score: 0,
        color: 'yellow',
        exaColor: '#F8CB0D',
    },
    {
        emotion: 'anger',
        score: 0,
        color: 'red',
        exaColor: '#DD0B80',
    },
    {
        emotion: 'neutral',
        score: 0,
        color: 'grey',
        exaColor: '#8B8391',
    },
    {
        emotion: 'surprise',
        score: 0,
        color: 'purple',
        exaColor: '#FBA719',
    },
    {
        emotion: 'disgust',
        score: 0,
        color: 'green',
        exaColor: '#A3CC3F',
    }
]

export type UserEmotion = {
    emotion: string,
    score: number,
    color: string,
    exaColor: string,
}