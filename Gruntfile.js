module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		uglify: {
			src: {
				files: {
					"src/jquery.gistfetcher.min.js": ["src/jquery.gistfetcher.js"]
				}
			}
		}
	});

	grunt.registerTask('default', [
		'uglify'
	]);

};
