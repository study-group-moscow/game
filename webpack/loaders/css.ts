
export default {
    client: {
        test: /\.(css|sass|scss)$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'sass-loader'
            }
        ]
    },
    server: {
        test: /\.(css|sass|scss)$/,
        loader: 'null-loader',
    },
};
