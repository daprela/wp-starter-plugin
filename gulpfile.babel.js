/*
Here's a quick rundown of our Gulp setup:

------------------
TERMINAL COMMANDS:
------------------
npm run build   - This will run the build process once then stop.
                  The build process will compile and minify all assets and produce a installable zip file under the 'build' folder
npm run dev     - This will run the build process, then will start watching asset files for changes.
			      When a file is changed the associated build task will run again and live-reload will fire.
gulp initPlugin - This command must be launched only once on the vanilla boilerplate.
                  It will customize the plugin namespace and and plugin header based on the strings in package.json
                  Once the command is executed you can start coding immediately. This command doesn't change the plugin's folder name.

---------------------
ASSET FILE STRUCTURE:
---------------------
PLUGIN/assets/css/*.scss   ->   PLUGIN/assets/css/*.min.css
PLUGIN/assets/js/*.js   ->   PLUGIN/assets/js/*.min.js
PLUGIN/src/images/*.{jpg,jpeg,png,svg,gif}   ->   PLUGIN/assets/images/*.{jpg,jpeg,png,svg,gif}


-------------------------------------------------
Running Gulp will do the following things for us:
-------------------------------------------------
SCSS
	- Autoprefix our SCSS
	- Minify the output CSS
	- Add '.min' to the end of the output file name
	- Drop the final autoprefixed, minified CSS file in assets/css as style.css

JS
	- Concatenate all our JS files
	- add '.min' to the end of the output file name
	- Minify the JS
	- Runs jshint on our JS, catching common errors and warnings and displaying them in the terminal
	- Drops the final JS file in the /assets/js folder

IMAGES
	- Compress images from src/images
	- Drop compressed images in assets/images
*/

/**********************************************
 * Declarations
 *********************************************/
import { src, dest, watch, series, parallel } from 'gulp';

/* Declarations for style files */
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import notify from 'gulp-notify';
import sassGlob from 'gulp-sass-glob-import';
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

require("@babel/core").transform("code", {
	plugins: ["@babel/plugin-transform-react-jsx"]
});

/* Refresh the browser when a file changes */
import browserSync from "browser-sync";

/* Creates the zipped package */
import zip from "gulp-zip";
import info from "./package.json";

import replace from "gulp-replace";
import vinyl from 'vinyl';

export const styles = () => {
	return src('src/scss/*.scss')
	.pipe(sassGlob()) // allow importing multiple files using '/*'
	.pipe(named())
	.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
	.pipe(gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})))
	.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
	.pipe(rename({ suffix: '.min' }))
	.pipe(dest('assets/css'))
	.pipe(notify({ message: 'Sass completed' }));
};

export const images = () => {
	return src('src/images/*.{jpg,jpeg,png,svg,gif}')
	.pipe(gulpif(PRODUCTION, imagemin()))
	.pipe(dest('assets/images'))
	.pipe(notify({ message: 'Image compression completed' }));
};

export const scripts = () => {
	return src(['src/js/*.js'])
	.pipe(named())
	.pipe(webpack({
		module: {
			rules: [
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								"@wordpress/default",
								'@babel/preset-env',
								["@babel/preset-react",
									{
										"development": PRODUCTION ? false : true,
									}]
							],
							plugins: [
								[
									"@babel/transform-react-jsx",
									{ pragma: "wp.element.createElement" }
								],
								[
									"transform-react-remove-prop-types",
									{
										mode: "wrap",
										ignoreFilenames: ["node_modules"]
									}
								]
							]
						}
					}
				}
			]
		},
		mode: PRODUCTION ? 'production' : 'development',
		devtool: !PRODUCTION ? 'source-map' : false,
		output: {
			filename: '[name].min.js'
		},
		externals: {
			jquery: 'jQuery'
		},
	}))
	.pipe(dest('assets/js'))
	.pipe(notify({ message: 'Scripts completed' }));
};

export const copy = () => {
	return src(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/*'])
	.pipe(dest('assets'));
};

export const clean = () => {
	return del(['assets/css/*.min.css', 'assets/js/*.min.js', 'assets/js/*.min.js.map', 'assets/images/*.{jpg,jpeg,png,svg,gif}']);
};

export const bundleClean = () => {
	return del(['bundled/*']);
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
		"!assets/css{,/*.map}",
		"!assets/js{,/*.map}",
		"!vendor{,/**}",
		"!blocks{,/**}",
		"!.babelrc",
		"!.gitignore",
		"!gulpfile.babel.js",
		"!package.json",
		"!package-lock.json",
		"!composer.json",
		"!composer.lock",
		"!phpunit.xml.dist",
		"!wp-tests-config.php",
		"!webpack.common.js",
		"!webpack.dev.js",
		"!webpack.prod.js",
		"!tests{,/**}",
	])
	.pipe(zip(`${info.name}.zip`))
	.pipe(dest('bundled'));
};

export const watchForChanges = () => {
	watch('src/scss/*.scss', styles);
	watch('src/images/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
	watch(['src/js/*.js'], series(scripts, reload));
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
export const renamePOT = () => {
	return src(	"languages/wp-starter-plugin.pot")
	.pipe(rename(`${info.name}.pot`))
	.pipe(dest("languages/"))
};
export const  cleanInit = () => {
	return del(["wp-starter-plugin.php", "templates/wp-starter-plugin-template.php", "templates/partials/wp-starter-plugin-partial.php", "languages/wp-starter-plugin.pot"])
};

/* Run tasks in series to clean the Dev folder and start watching the files */
export const dev = series(parallel(styles, images, scripts), serve, watchForChanges);
export const build = series(bundleClean, parallel(styles, images, scripts), compress);
export const initPlugin = series(updateStrings, renameMain, renameTemplate, renamePartial, renamePOT, cleanInit );

export default dev;