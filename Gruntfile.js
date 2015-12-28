'use strict';

module.exports = function (grunt) {
    grunt.initConfig({

        // Use nodemon to run server in debug mode with an initial breakpoint
        nodemon: {
            debug: {
                script: 'server/app.js',
                options: {
                    //nodeArgs: ['--debug-brk'],
                    env: {
                        PORT: 3008
                    },
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            setTimeout(function () {
                                require('open')('http://localhost:3008');
                            }, 500);
                        });
                    }
                }
            }
        },
        shell:{
            multiple:{
                command:[
                    'cd /Users/carol/Documents/mongodb/bin/',
                    './mongod --dbpath /Users/carol/Documents/mongodb/data/db'
                ].join('&&')
            }
        }
    })

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask("runServer",['shell']);
    grunt.registerTask("app.js",['nodemon:debug']);

}

