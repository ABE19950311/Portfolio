
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
});


