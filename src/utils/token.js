export const getRandomToken = () => {
    return Math.floor(Math.random() * 1000000);
}

export const getExpireDateFromNow = () => {
    return new Date(Date.now() + 60 * 60 * 24 * 1000);
}