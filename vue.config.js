// https://cli.vuejs.org/config/#vue-config-js
module.exports = {
    publicPath: './',

    // Serve our API stubs.
    devServer: {
        proxy: {
            "/stubs/currentprice.json": {
                target: "http://localhost:3000/stubs/currentprice.json",
                secure: false
            }
        }
    }
};
