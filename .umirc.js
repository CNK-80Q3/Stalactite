
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'Stalactite',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  "publicPath": "/static/",
  "proxy": {
    "/user_api": {
      "target": "http://localhost:3456",
      // "changeOrigin": true
    },
    "/article_api": {
      "target": "http://localhost:3456",
      // "changeOrigin": true
    },
    "/microblog_api": {
      "target": "http://localhost:3456",
      // "changeOrigin": true
    },
    "/picture_api": {
      "target": "http://localhost:3456",
      // "changeOrigin": true
    },
    "/video_api": {
      "target": "http://localhost:3456",
      // "changeOrigin": true
    }
  },
}