import "@testing-library/jest-dom/extend-expect"

// Polyfill for encoding which isn't present globally in jsdom
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder
}

if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = require('util').TextDecoder
}