export function getRandomNumber(total) {
  return Math.floor(Math.random() * (total));
}
export function getNextRoundRobin(total, current) {
  return ((current < (total - 1)) ? current + 1 : 0);
}
