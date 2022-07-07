import * as path from "path";

export default {
    client:   {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.json')
                }
            }
        ],
        exclude: /(node_modules)/
    },
    server:   {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.json')
                }
            }
        ],
        exclude: /(node_modules)/
    },
};
