// webpack.common.js
import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/assets", to: "assets" }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
};
