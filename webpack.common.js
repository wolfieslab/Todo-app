import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default {
  entry: {
    app: './src/index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(import.meta.dirname, 'dist'),
    clean: true,
  },
};
