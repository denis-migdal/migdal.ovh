var req = require.context(".", true, /^.*\.css$/);
req.keys().forEach( (key) => {
    req(key);
});