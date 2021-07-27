const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const formatTz = require('date-fns-tz/format');

const specialCases = [
  ['2021-05-27', "No stand-down today — we're in the middle of a retro! Hope it's going well."],
];

module.exports = function standDown(isItOnToday) {
  if (!isItOnToday) {
    return `No stand-down today.  Hope you are having a wonderful Friday!`
  }

  const dateInNZST = utcToZonedTime(new Date(), 'Pacific/Auckland');
  const c = specialCases.find(([d]) => d === formatTz(dateInNZST, 'yyyy-MM-dd'));
  if (c) { return c[1]; }

  return `SLOTHS get SLOTHY — stand down in 15 mins!

You going to be present? :gift:
Or you need to have your head down? :heads-down:
Got any questions that you need people for? :interrobang:

Everyone is welcome to join us in <https://meet.google.com/nxw-bjgg-ibd|this Google Meet>.`;
}
