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

import replace from "gulp-replace";
import vinyl from 'vinyl';

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
	return del(['assets/css/*.min.css', 'assets/js/*.min.js', 'assets/images/*.{jpg,jpeg,png,svg,gif}']);
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
		"!composer.json",
		"!composer.lock",
		"!phpunit.xml.dist",
		"!wp-tests-config.php",
		"!tests{,/**}",
	])
	.pipe(zip(`${info.name}.zip`))
	.pipe(dest('bundled'));
};

export const watchForChanges = () => {
	watch('assets/css/*.scss', styles_admin);
	watch('assets/css/*.scss', styles_frontend);
	watch('src/images/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
	watch(['assets/**/*','!src/{images,js,scss}','!src/{images,js,scss}/*'], series(copy, reload));
	watch('assets/js/*.js', series(scripts, reload));
	watch("**/*.php", reload);
};

/* Please don't modify anything below this comment */
export const updateStrings = () => {
	return src([
		"./**",
		"!node_modules{,/**}",
		"!bundled{,/**}",
		"!src{,/**}",
		"!vendor{,/**}",
		"!.babelrc",
		"!.gitignore",
		"!gulpfile.babel.js",
		"!package.json",
		"!package-lock.json",
		"!composer.json",
		"!composer.lock",
		"!phpunit.xml.dist",
		"!wp-tests-config.php",
		"!tests{,/**}",
		"!*.zip",
	])
	.pipe(replace("dapre_wpsp", info.rootNamespace))
	.pipe(replace("giulio.daprela@gmail.com", info.email))
	.pipe(replace("https://giuliodaprela.com", info.link))
	.pipe(replace("Giulio Daprela", info.author))
	.pipe(replace("WordPress Starter Plugin", info.pluginName))
	.pipe(replace("A WordPress starter plugin.", info.description))
	.pipe(replace("dapre-wpsp", info.textDomain))
	.pipe(replace("wp-starter-plugin", info.name))
	.pipe(dest("."))
};
export const renameMain = () => {
	return src(	"wp-starter-plugin.php")
	.pipe(named())
	.pipe(rename(`${info.name}.php`))
	.pipe(dest("."))
};
export const renameTemplate = () => {
	return src(	"templates/wp-starter-plugin-template.php")
	.pipe(rename(`${info.name}-template.php`))
	.pipe(dest("templates/"))
};
export const renamePartial = () => {
	return src(	"templates/partials/wp-starter-plugin-partial.php")
	.pipe(rename(`${info.name}-partial.php`))
	.pipe(dest("templates/partials/"))
};
export const renameMinJS = () => {
	return src(	"assets/js/wp-starter-plugin.min.js")
	.pipe(rename(`${info.name}.min.js`))
	.pipe(dest("assets/js/"))
};
export const renameJS = () => {
	return src(	"assets/js/wp-starter-plugin.js")
	.pipe(rename(`${info.name}.js`))
	.pipe(dest("assets/js/"))
};
export const renamePOT = () => {
	return src(	"languages/wp-starter-plugin.pot")
	.pipe(rename(`${info.name}.pot`))
	.pipe(dest("languages/"))
};
export const  cleanInit = () => {
	return del(["wp-starter-plugin.php", "templates/wp-starter-plugin-template.php", "templates/partials/wp-starter-plugin-partial.php", "assets/js/wp-starter-plugin.js", "assets/js/wp-starter-plugin.min.js", "languages/wp-starter-plugin.pot"])
};

/* Run tasks in series to clean the Dev folder and start watching the files */
export const dev = series(clean, parallel(styles_admin, styles_frontend, images, copy, scripts), serve, watchForChanges);
export const build = series(clean, parallel(styles_admin, styles_frontend, images, copy, scripts), compress);
export const initPlugin = series(updateStrings, renameMain, renameTemplate, renamePartial, renameMinJS, renameJS, renamePOT, cleanInit );

export default dev;