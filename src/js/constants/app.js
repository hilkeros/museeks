import nedb   from 'nedb';
import fs     from 'fs';
import path   from 'path';
import remote from 'remote';

import AppActions from '../actions/AppActions';

var app = remote.require('app');



/*
|--------------------------------------------------------------------------
| Variables
|--------------------------------------------------------------------------
*/

var pathConfig       = app.getPath('userData');
var pathConfigFile   = path.join(pathConfig, 'config.json');
var pathSrc          = __dirname;
var supportedFormats = ['audio/mp4', 'audio/mpeg', 'audio/wav'];



/*
|--------------------------------------------------------------------------
| Audio
|--------------------------------------------------------------------------
*/

// What plays the music
var audio = new Audio();
    audio.type   = 'audio/mpeg';
    audio.volume = 1;

audio.addEventListener('ended', AppActions.player.next);



/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/

var db = new nedb({
    filename: path.join(pathConfig, 'library.db'),
    autoload: true,
});

db.reset = function() {
    db.remove({ }, { multi: true }, function (err, numRemoved) {
        db.loadDatabase(function (err) {
            if(err) {
                throw err
            }
        });
    });
};



/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default {
    db               : db,
    supportedFormats : supportedFormats,
    audio            : audio,
    pathSrc          : pathSrc
};