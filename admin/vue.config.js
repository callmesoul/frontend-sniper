module.exports = {
    // 支持 gql 文件
    chainWebpack: config => {
        config.module
            .rule("graphql")
            .test(/\.(graphql|gql)$/)
            .use("graphql-tag/loader")
            .loader("graphql-tag/loader")
            .end();
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#161823',
                    'link-color': '#8f6a6a',
                    'border-radius-base': '2px',
                    'border-color-base': '#161823'
                },
                javascriptEnabled: true,
            }
        }
    },
    devServer: {
        // development server port 8000
        port: 8000,
        // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
        proxy: {
            '/graphql': {
                target: 'http://192.168.130.7:3000',
                ws: false,
                changeOrigin: true, // 开启代理
                pathRewrite: {
                    '^/graphql': '/graphql'
                } // 这里重写路径/run就代理到对应地址
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}