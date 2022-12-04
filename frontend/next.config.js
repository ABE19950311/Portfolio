
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "@fullcalendar/list",
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
    env: {
      BASE_URL: process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS,
    }
});


