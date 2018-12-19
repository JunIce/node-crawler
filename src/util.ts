export function guidGenerator() {
    return (S4()+S4()+"-"+S4()+S4()+"-"+S4()+S4()+S4());
}
function S4() {
    const rand = (1 + Math.random()) * 0x10000;
    return (rand | 0).toString(16).substring(1);
}