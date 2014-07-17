// config requirejs

require.config({
    // urlArgs: "bust=" + (new Date()).getTime(),  // never delete this
    baseUrl: "/static/js",
    paths: {
        text: "libs/requirejs/text"
    }
}); 

require(["pages/Application"], function(Application) {
    Application.start();
});