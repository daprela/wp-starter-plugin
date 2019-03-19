/**********************************************
 * Declarations
 *********************************************/
import { src, dest, watch, series, parallel } from 'gulp';

/* Declarations for style files */
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
const PRODUCTION = yargs.argv.prod;

/* Declarations for images */
import imagemin from 'gulp-imagemin';

/* Clean up the Dist folder */
import del from 'del';

/* Treating JavaScript files */
import webpack from 'webpack-stream';
import named from 'vinyl-named';

/* Refresh the browser when a file changes */
import browserSync from "browser-sync";

/* Creates the zipped package */
import zip from "gulp-zip";
import info from "./package.json";

export const styles_admin = () => {
	return src('assets/css/admin-styles.scss')
		.pipe(named())
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
		.pipe(gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})))
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(rename('admin-styles.min.css'))
		.pipe(dest('assets/css'));
};

export const styles_frontend = () => {
	return src('assets/css/frontend-styles.scss')
	.pipe(named())
	.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
	.pipe(gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})))
	.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
	.pipe(rename('frontend-styles.min.css'))
	.pipe(dest('assets/css'));
};

export const images = () => {
	return src('src/images/*.{jpg,jpeg,png,svg,gif}')
	.pipe(gulpif(PRODUCTION, imagemin()))
	.pipe(dest('assets/images'));
};

export const copy = () => {
	return src(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/*'])
	.pipe(dest('assets'));
};

export const clean = () => {
	return del(['src/assets']);
};

/* Accepts an array of files as input and then rename the output by adding the min suffix */
export const scripts = () => {
	return src(['assets/js/wp-starter-plugin.js'])
	.pipe(named())
	.pipe(webpack({
		module: {
			rules: [
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		},
		mode: PRODUCTION ? 'production' : 'development',
		devtool: !PRODUCTION ? 'inline-source-map' : false,
		output: {
			filename: '[name].min.js'
		},
		externals: {
			jquery: 'jQuery'
		},
	}))
	.pipe(dest('assets/js'));
};

const server = browserSync.create();
export const serve = done => {
	server.init({
		proxy: "http://development.local" // put your local website link here
	});
	done();
};
export const reload = done => {
	server.reload();
	done();
};

export const compress = () => {
	return src([
		"**/*",
		"!node_modules{,/**}",
		"!bundled{,/**}",
		"!src{,/**}",
		"!vendor{,/**}",
		"!.babelrc",
		"!.gitignore",
		"!gulpfile.babel.js",
		"!package.json",
		"!package-lock.json",
	])
	.pipe(zip(`${info.name}.zip`))
	.pipe(dest('bundled'));
};

export const watchForChanges = () => {
	watch('src/scss/*.scss', styles_admin);
	watch('src/scss/*.scss', styles_frontend);
	watch('src/images/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
	watch(['arc/**/*','!src/{images,js,scss}','!src/{images,js,scss}/*'], series(copy, reload));
	watch('src/js/*.js', series(scripts, reload));
	watch("**/*.php", reload);
};

/* Run tasks in series to clean the Dev folder and start watching the files */
export const dev = series(clean, parallel(styles_admin, styles_frontend, images, copy, scripts), serve, watchForChanges);
export const build = series(clean, parallel(styles_admin, styles_frontend, images, copy, scripts), compress);

export default dev;