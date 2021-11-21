const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const formatTz = require('date-fns-tz/format');

const specialCases = [
  ['2021-05-27', "No stand-down today — we're in the middle of a retro! Hope it's going well."],
  ['2021-11-22', "No stand-down today — we're in the middle of a retro! Hope it's going well."],
  ['2021-11-25', "No stand-down today — we're still in an all day team thing!"],
];

module.exports = function standDown(team, isItOnToday) {
  if (!isItOnToday) {
    return `No stand-down today.  Hope you are having a wonderful Friday!`
  }

  const dateInNZST = utcToZonedTime(new Date(), 'Pacific/Auckland');
  const c = specialCases.find(([d]) => d === formatTz(dateInNZST, 'yyyy-MM-dd'));
  if (c) { return c[1]; }

  return team.standDownMessage;
}
