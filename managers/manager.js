/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var crypto = require('crypto');

var db;

exports.init = function (database) {
    db = database;
};


exports.securityCheck = function (obj) {
    var returnVal = true;
    if (obj !== undefined || obj !== null) {
        var json = JSON.stringify(obj);
        if (json !== undefined && json !== null) {
            var n = json.indexOf("function");
            if (n > -1) {
                console.log("Security Alert: " + json);
                returnVal = false;
            }
        } else {
            returnVal = false;
        }
    } else {
        returnVal = false;
    }

    return returnVal;
};


exports.hashPassword = function (username, pw, callback) {
    //crypto.pbkdf2(pw, username, 250, 128, 'sha1', callback);
    crypto.pbkdf2(pw, username, 100000, 512, 'sha512', callback);
};
