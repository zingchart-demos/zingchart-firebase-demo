/**
 * Created by tmartin on 6/29/16.
 */
module.exports = {
    entry: "public/scripts/main.js",
    output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {test: /\.json$/, loader: 'json'}
        ]
    }/*,
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    }*/
};
