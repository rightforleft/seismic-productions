module.exports = function(grunt) {

	// Default task(s)
	grunt.registerTask('default', ['cleanup','htmlmin:dist','concat:css', 'concat:cssResponsive', 'cssmin', 'copy:css', 'copy:fancyboxImages', 'copy:fonts','concat:jsFancyBox', 'concat:jsOffCanvasMenu', 'copy:js', 'copy:contactForm', 'copy:favicons','copy:images','uglify']);
	grunt.registerTask('tweaks', ['htmlmin:dist','concat:css', 'concat:cssResponsive', 'cssmin', 'copy:css', 'copy:fonts','concat:jsFancyBox', 'concat:jsOffCanvasMenu', 'copy:js','uglify']);
	grunt.registerTask('css', ['concat:css', 'concat:cssResponsive', 'cssmin', 'copy:css', 'copy:fancyboxImages']);
	grunt.registerTask('fonts', ['copy:fonts']);
	grunt.registerTask('checkcss', ['csslint']);
	grunt.registerTask('js', ['concat:jsFancyBox', 'concat:jsOffCanvasMenu', 'copy:js', 'copy:contactForm', 'uglify']);
	grunt.registerTask('js-test' , ['copy:jsTestBuild']);
	grunt.registerTask('html', ['htmlmin:dist']);
	grunt.registerTask('cleanup', ['clean']);

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Concats all CSS and JS files together
		'concat': {
			css: {
				src: [
					'src/css/bootstrap.css',
					'src/css/theme.css',
					'src/css/font-awesome.min.css',
					'src/css/animate.min.css',
					'src/plugins/off-canvas-menu/css/menu_bubble.css',
					'src/plugins/fancybox/source/jquery.fancybox.css',
					'src/plugins/fancybox/source/helpers/jquery.fancybox-buttons.css',
					'src/plugins/fancybox/source/helpers/jquery.fancybox-thumbs.css',
					'src/plugins/isotope-plugin/css/isotope.css'
				],
				dest: 'build/css/seismic.css'
			},
			cssResponsive: {
				src: [
					'src/css/grid-12-responsive.css',
					'src/css/responsive.css'
				],
				dest: 'build/css/seismic-responsive.css'
			},
			jsFancyBox: {
				src: [
					'src/plugins/fancybox/source/jquery.fancybox.js',
					'src/plugins/fancybox/source/jquery.fancybox.pack.js',
					'src/plugins/fancybox/lib/jquery.mousewheel-3.0.6.pack.js',
					'src/plugins/fancybox/source/helpers/jquery.fancybox-buttons.js',
					'src/plugins/fancybox/source/helpers/jquery.fancybox-media.js',
					'src/plugins/fancybox/source/helpers/jquery.fancybox-thumbs.js',
				],
				dest: 'build/js/fancybox.js'
			},
			jsOffCanvasMenu: {
				src: [
					'src/plugins/off-canvas-menu/js/snap.svg-min.js',
					'src/plugins/off-canvas-menu/js/classie.js',
					'src/off-canvas-menu/js/main4.js'
				],
				dest: 'build/js/offCanvasMenu.js'
			},
			jsPost: {
				src: [
					'src/js/bootstrap.min.js',
					'src/js/tinyscrollbar.js',
					'src/js/caroufredsel.js',
					'src/plugins.js',
					'src/plugins/prettyPhoto-plugin/js/jquery.prettyPhoto.js',
					'src/plugins/isotope-plugin/js/jquery.isotope.min.js',
					'src/js/wow.min.js'
				],
				dest: 'dist/js/seismicPost.min.js'
			}
		},

		// Minifies the concatinated CSS file
		'cssmin': {
			core: {
				files: {
					'dist/css/seismic.min.css': [
					'build/css/seismic.css'
					]
				}
			},
			responsive: {
				files: {
					'dist/css/seismic-responsive.min.css': [
					'build/css/seismic-responsive.css'
					]
				}
			},
			style: {
				files: {
					'dist/css/seismic-style.min.css': [
					'src/css/style.css',
					'src/css/images.css'
					]
				}
			}
		},

		// Compiles Javascript files into one minified file
		'uglify': {
			fancybox: {
				files: {
					'dist/js/fancybox.min.js': ['build/js/fancybox.js']
				}
			},
			offCanvasMenu: {
				files: {
					'dist/js/offCanvasMenu.min.js': ['build/js/offCanvasMenu.js']
				}
			},
			seismicPost: {
				files: {
					'dist/js/seismicPost.min.js': ['build/js/seismicPost.js']
				}
			},
			ourWork: {
				files: {
					'dist/js/ourWork.min.js': ['src/js/ourwork.js']
				}
			}
		},

		// Copies Files to Dist
		'copy': {
			js: {
				files: [
					// includes files within path
					{expand: false, src: ['src/js/jquery-2.1.4.min.js'], dest: 'dist/js/jquery.js'},
					{expand: false, src: ['src/js/bootstrap.min.js'], dest: 'dist/js/bootstrap.min.js'},
					{expand: false, src: ['src/js/tinyscrollbar.js'], dest: 'dist/js/tinyscrollbar.js'},
					{expand: false, src: ['src/js/caroufredsel.js'], dest: 'dist/js/caroufredsel.js'},
					{expand: false, src: ['src/js/plugins.js'], dest: 'dist/js/plugins.js'},
					{expand: false, src: ['src/plugins/prettyPhoto-plugin/js/jquery.prettyPhoto.js'], dest: 'dist/js/jquery.prettyPhoto.js'},
					{expand: false, src: ['src/plugins/isotope-plugin/js/isotope.pkgd.js'], dest: 'dist/js/jquery.isotope.min.js'},//New Isotope Ver2
					{expand: false, src: ['src/plugins/isotope-plugin/js/packery-mode.pkgd.min.js'], dest: 'dist/js/packery-mode.pkgd.min.js'},
					{expand: false, src: ['src/js/wow.min.js'], dest: 'dist/js/wow.min.js'},
					{expand: false, src: ['src/plugins/off-canvas-menu/js/classie.js'], dest: 'dist/js/classie.js'},
					{expand: false, src: ['src/plugins/off-canvas-menu/js/main4.js'], dest: 'dist/js/main4.js'},
					{expand: false, src: ['src/js/modernizr.js'], dest: 'dist/js/modernizr.js'},
					{expand: false, src: ['src/js/jquery.gmap.min.js'], dest: 'dist/js/jquery.gmap.min.js'},
					{expand: false, src: ['src/plugins/jquery.nicescroll.3/jquery.nicescroll.min.js'], dest: 'dist/js/jquery.nicescroll.min.js'},
					{expand: false, src: ['src/js/imagesloaded.pkgd.min.js'], dest: 'dist/js/imagesloaded.pkgd.min.js'},
				]
			},
			// JS Test Build
			jsTestBuild: {
				files: [
					{expand: false, src: ['src/js/ourwork-v2.js'], dest: 'dist/js/ourWork.min.js'},
				]
			},
			css: {
				files: [
					{expand: false, src: ['src/css/style.css'], dest: 'dist/css/style.css', filter: 'isFile'},
					{expand: false, src: ['src/css/chrome.css'], dest: 'dist/css/chrome.css', filter: 'isFile'},
					{expand: false, src: ['src/css/fonts.css'], dest: 'dist/css/fonts.css', filter: 'isFile'}
				],
			},
			fancyboxImages: {
				files: [
					{expand: false, src: ['src/plugins/fancybox/source/fancybox_loading.gif'], dest: 'dist/css/fancybox_loading.gif'},
					{expand: false, src: ['src/plugins/fancybox/source/fancybox_overlay.png'], dest: 'dist/css/fancybox_overlay.png'},
					{expand: false, src: ['src/plugins/fancybox/source/fancybox_sprite.png'], dest: 'dist/css/fancybox_sprite.png'},
					{expand: false, src: ['src/plugins/fancybox/source/fancybox_sprite@2x.png'], dest: 'dist/css/fancybox_sprite@2x.png'},
					{expand: false, src: ['src/plugins/fancybox/source/fancybox_loading@2x.png'], dest: 'dist/css/fancybox_loading@2x.png'}
				],
			},
			fonts: {
				files: [
					//Cicle Gordita
					{expand: false, src: ['src/fonts/Cicle_Gordita-webfont.eot'], dest: 'dist/fonts/Cicle_Gordita-webfont.eot'},
					{expand: false, src: ['src/fonts/Cicle_Gordita-webfont.svg'], dest: 'dist/fonts/Cicle_Gordita-webfont.svg'},
					{expand: false, src: ['src/fonts/Cicle_Gordita-webfont.ttf'], dest: 'dist/fonts/Cicle_Gordita-webfont.ttf'},
					{expand: false, src: ['src/fonts/Cicle_Gordita-webfont.woff'], dest: 'dist/fonts/Cicle_Gordita-webfont.woff'},
					//Cicle Semi
					{expand: false, src: ['src/fonts/Cicle_Semi-webfont.eot'], dest: 'dist/fonts/Cicle_Semi-webfont.eot'},
					{expand: false, src: ['src/fonts/Cicle_Semi-webfont.svg'], dest: 'dist/fonts/Cicle_Semi-webfont.svg'},
					{expand: false, src: ['src/fonts/Cicle_Semi-webfont.ttf'], dest: 'dist/fonts/Cicle_Semi-webfont.ttf'},
					{expand: false, src: ['src/fonts/Cicle_Semi-webfont.woff'], dest: 'dist/fonts/Cicle_Semi-webfont.woff'},
					//Font Awesome
					{expand: false, src: ['src/fonts/fontawesome-webfont.eot'], dest: 'dist/fonts/fontawesome-webfont.eot'},
					{expand: false, src: ['src/fonts/fontawesome-webfont.eot@'], dest: 'dist/fonts/fontawesome-webfont.eot@'},
					{expand: false, src: ['src/fonts/fontawesome-webfont.ttf'], dest: 'dist/fonts/fontawesome-webfont.ttf'},
					{expand: false, src: ['src/fonts/fontawesome-webfont.woff'], dest: 'dist/fonts/fontawesome-webfont.woff'},
					{expand: false, src: ['src/fonts/fontawesome-webfont.woff2'], dest: 'dist/fonts/fontawesome-webfont.woff2'},
					{expand: false, src: ['src/fonts/FontAwesome.otf'], dest: 'dist/fonts/FontAwesome.otf'}
				],
			},
			contactForm: {
				files: [
					{expand: true, cwd: 'src/contact-form/', src: ['**'], dest: 'dist/contact-form/'}
				],
			},
			favicons: {
				files: [
					{expand: false, src: ['src/favicon.ico'], dest: 'dist/favicon.ico'},
					{expand: false, src: ['src/plugins/fancybox/source/fancybox_loading@2x.gif'], dest: 'dist/images/loading.gif'}
				],
			},
			images: {
				files: [
					{
						expand: true,
						cwd: 'src/images/',
						src: ['**'],
						dest: 'dist/images/',
					},
				],
			}
		},

		// Check CSS
		'csslint': {
			all: [
				'src/css/*.css',
				'src/plugins/off-canvas-menu/css/*.css'
			],
			options: {
				dest: 'build/seismic-csslint.xml'
			}
		},

		// Minify HTML
		'htmlmin': {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					maxLineLength: 500,
					minifyJS: true
				},
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['**/*.html'],
						dest: 'dist/',
					},
				],
			},
		},

		// Clean
		'clean': {
			dist: ['dist']
		}
	});
};