/*
Here's a quick rundown of our Gulp setup:

------------------
TERMINAL COMMANDS:
------------------
npm run build             - This will run the build process once then stop.
                            The build process will compile and minify all assets and produce a installable zip file under the 'build' folder
npm run dev               - This will run the build process, then will start watching asset files for changes.
			                      When a file is changed the associated build task will run again and live-reload will fire.
npm run buildGutenberg    - This will run the build process once then stop. This task will also build the Gutenberg blocks.
                            The build process will compile and minify all assets and produce a installable zip file under the 'build' folder
npm run devGutenberg      - This will run the build process, then will start watching asset files for changes. This task will also build the Gutenberg blocks.
			                      When a file is changed the associated build task will run again and live-reload will fire.
npm run BuildAll          - This will run the build process using Webpack for all of the assets.
                            The build process will compile and minify all assets and produce a installable zip file under the 'build' folder
npm run devAll            - This will run the build process using Webpack for all of the assets, then will start watching asset files for changes.
			                      When a file is changed the associated build task will run again and live-reload will fire.
gulp initPlugin           - This command must be launched only once on the vanilla boilerplate.
                            It will customize the plugin namespace and and plugin header based on the strings in package.json
                            Once the command is executed you can start coding immediately. This command doesn't change the plugin's folder name.
gulp buildSources         - This will build a distributable zip containing all of the source files.


---------------------
ASSET FILE STRUCTURE:
---------------------
PLUGIN/src/css/*.scss   ->   PLUGIN/assets/css/*.min.css
PLUGIN/src/js/*.js   ->   PLUGIN/assets/js/*.min.js
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
import {
	src, dest, watch, series, parallel,
} from 'gulp';

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

/* Declarations for images */
import imagemin from 'gulp-imagemin';

/* Clean up the Dist folder */
import del from 'del';

/* Treating JavaScript files */
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';

/* Refresh the browser when a file changes */
import browserSync from "browser-sync";

/* Creates the zipped package */
import zip from "gulp-zip";
import info from "./package.json";

import replace from "gulp-replace";

import wpGutenbergDev from './webpackGutenberg.dev';
import wpGutenbergProd from './webpackGutenberg.prod';
import wpNoGutenbergDev from './webpackNoGutenberg.dev';
import wpNoGutenbergProd from './webpackNoGutenberg.prod';
import wpAllDev from './webpackAll.dev';
import wpAllProd from './webpackAll.prod';

const PRODUCTION = yargs.argv.prod;

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

export const webpackGutenbergDev = (done) => {
	webpackStream(wpGutenbergDev)
	  .pipe(dest('./'));
	done();
};

export const webpackGutenbergProd = (done) => {
	webpackStream(wpGutenbergProd)
	  .pipe(dest('./'));
	done();
};

export const webpackNoGutenbergDev = (done) => {
	webpackStream(wpNoGutenbergDev)
	  .pipe(dest('./'));
	done();
};

export const webpackNoGutenbergProd = (done) => {
	webpackStream(wpNoGutenbergProd)
	  .pipe(dest('./'));
	done();
};

export const webpackAllDev = (done) => {
	webpackStream(wpAllDev)
	.pipe(dest('./'));
	done();
};

export const webpackAllProd = (done) => {
	webpackStream(wpAllProd)
	.pipe(dest('./'));
	done();
};

export const clean = () => {
	return del(['assets/css/*.min.css', 'assets/js/*.min.js', 'assets/js/*.min.js.map', 'assets/images/*.{jpg,jpeg,png,svg,gif}']);
};

export const bundleClean = () => del([`bundled/${info.name}.zip`]);

export const bundleSourcesClean = () => del([`bundled/${info.name}.sources.zip`]);

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
		"!webpackAll.dev.js",
		"!webpackAll.prod.js",
		"!webpackGutenberg.common.js",
		"!webpackGutenberg.dev.js",
		"!webpackGutenberg.prod.js",
		"!webpackNoGutenberg.dev.js",
		"!webpackNoGutenberg.prod.js",
		"!tests{,/**}",
	])
	.pipe(zip(`${info.name}.zip`))
	.pipe(dest('bundled'));
};

export const compressIncludeSources = () => {
	return src([
	'**/*',
	'!node_modules{,/**}',
	'!bundled{,/**}',
	'!package-lock.json',
	'!composer.lock',
	])
	.pipe(zip(`${info.name}.sources.zip`))
	.pipe(dest('bundled'));
}

export const watchForChanges = () => {
	watch('src/scss/*.scss', styles);
	watch('src/images/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
	watch(['src/js/*.js'], series(webpackNoGutenbergDev, reload));
	watch("**/*.php", reload);
};

export const watchGutenberg = () => {
	watch(['blocks/*.js', 'blocks/**/*.js', 'blocks/**/*.scss', 'blocks/**/*.{jpg,jpeg,png,svg,gif}'], series(webpackGutenbergDev, reload));
};

export const watchAll = () => {
	watch(['blocks/*.js', 'blocks/**/*.js', 'blocks/**/*.scss', 'blocks/**/*.{jpg,jpeg,png,svg,gif}'], series(webpackAllDev, reload));
	watch(['src/js/*.js', 'src/scss/*.scss', 'src/images/*.{jpg,jpeg,png,svg,gif}'], series(webpackAllDev, reload));
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
export const dev = series(parallel(styles, images, webpackNoGutenbergDev), serve, watchForChanges);
export const build = series(bundleClean, parallel(styles, images, webpackNoGutenbergProd), compress);
export const devGutenberg = series(parallel(styles, images, webpackGutenbergDev, webpackNoGutenbergDev), serve, watchGutenberg);
export const buildGutenberg = series(bundleClean, parallel(styles, images, webpackGutenbergProd, webpackNoGutenbergProd), compress);
export const devAll = series(parallel(webpackAllDev), serve, watchAll);
export const buildAll = series(bundleClean, parallel(webpackAllProd), compress);
export const buildSources = series(bundleSourcesClean, compressIncludeSources);
export const initPlugin = series(updateStrings, renameMain, renameTemplate, renamePartial, renamePOT, cleanInit );

export default dev;