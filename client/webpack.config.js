// Import necessary webpack plugins and modules
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Export a function that returns the webpack configuration
module.exports = () => {
  return {
    // Set the mode to development
    mode: "development",

    // Specify entry points for the application bundles
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },

    // Specify the output configuration for the generated bundles
    output: {
      filename: "[name].bundle.js", // Use the name of the entry point as the output filename
      path: path.resolve(__dirname, "dist"), // Set the output directory path
    },

    // Specify the plugins used in the webpack configuration
    plugins: [
      // Generate an HTML file that includes all webpack bundles
      new HtmlWebpackPlugin({
        template: "./index.html", // Use the specified HTML template
        title: "Webpack Plugin", // Set the title of the generated HTML file
      }),

      // Find the source for the service worker file and inject it into the specified destination
      new InjectManifest({
        swSrc: "./src-sw.js", // Specify the source file for the service worker
        swDest: "src-sw.js", // Specify the destination file for the injected service worker
      }),

      // Generate a manifest.json file for the Progressive Web App (PWA)
      new WebpackPwaManifest({
        fingerprints: false, // Do not include fingerprints in the generated manifest
        inject: true, // Inject the manifest settings into the HTML file
        name: "Just Another Text Editor", // Set the name of the PWA
        short_name: "Jate", // Set the short name of the PWA
        description: "Text Editor", // Set the description of the PWA
        background_color: "#7eb4e2", // Set the background color of the PWA
        theme_color: "#7eb4e2", // Set the theme color of the PWA
        start_url: "./", // Set the starting URL of the PWA
        publicPath: "./", // Set the public path for the generated icons
        icons: [
          {
            src: path.resolve("src/images/logo.png"), // Specify the source file for the PWA icon
            sizes: [96, 128, 192, 256, 384, 512], // Specify the sizes for the generated icons
            destination: path.join("assets", "icons"), // Set the destination directory for the generated icons
          },
        ],
      }),
    ],

    // Specify the module rules for processing different types of files
    module: {
      rules: [
        // Process CSS files using style-loader and css-loader
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },

        // Process JavaScript files using babel-loader
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
