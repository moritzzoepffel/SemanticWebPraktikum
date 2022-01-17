const fs = require('fs')
var x = 'abc'
fs.readFile('response.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('reading');
    progressData(data.toString());

})

function progressData(data) {
    console.log('progressing');
    var json = JSON.parse(data);
    var url = "root";
    var comment = "";
    rdf = triplify(url, json, comment);
    console.log('\n' + rdf)

    writeRDFFile(rdf);
}

function writeRDFFile(data) {
    console.log('writing');
    fs.writeFile('rdffile.txt', data, (err) => {
        if (err) throw err;
    })
}






function triplify(url, obj, s) {
    if (typeof obj === "object") {
        for (var i in obj) {
            if (i === "events")
                s += map_events(url, obj, i);
            else if (i === "properties")
                s += map_properties(url, obj, i);
            else if (i === "actions")
                s += map_actions(url, obj, i);
            else
                s += map_field(url, obj, i);
        }
    }
    return s;
}
function map_events(url, obj, i) {
    var value = obj[i];

    if (typeof value === "string") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (typeof value === "number") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (typeof value === "object") {
        var s = "";
        for (var j in value) {
            s += '<' + url + ', ' + i + ', ' + j + '>\n';
            if (typeof value[j] === "string")
                s += '<' + j + ', type, ' + value[j] + '>\n';
            else if (typeof value[j] === "object") {
                for (var k in value[j]) {
                    s += '<' + j + ', param, ' + k + '>\n';
                    if (typeof value[j][k] === "string")
                        s += '<' + k + ', type, ' + value[j][k] + '>\n';
                }
            }
        }
        return s;
    }

    if (typeof value === "array") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (value == null) {
        return '<' + url + ', ' + i + ', ' + 'null' + '>\n';
    }
}
function map_properties(url, obj, i) {
    var value = obj[i];

    if (typeof value === "string") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (typeof value === "number") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (typeof value === "object") {
        var s = "";
        for (var j in value) {
            s += '<' + url + ', ' + i + ', ' + j + '>\n';
            if (typeof value[j] === "string")
                s += '<' + j + ', type, ' + value[j] + '>\n';
            else if (typeof value[j] === "object") {
                for (var k in value[j]) {
                    var field = value[j];
                    var fvalue = field[k];
                    if (typeof (value[j][k]) === "object") {
                        for (var l in fvalue) {
                            s += '<' + j + ', ' + 'property' + ', ' + l + '>\n';
                            s += '<' + l + ', ' + 'type' + ', ' + fvalue[l] + '>\n';
                        }
                    }
                    else
                        s += '<' + j + ', ' + k + ', ' + value[j][k] + '>\n';
                }
            }
        }
        return s;
    }

    if (typeof value === "array") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (value == null) {
        return '<' + url + ', ' + i + ', ' + 'null' + '>\n';
    }
}
function map_actions(url, obj, i) {
    var value = obj[i];

    if (typeof value === "string") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (typeof value === "number") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (typeof value === "object") {
        var s = "";
        for (var j in value) {
            s += '<' + url + ', ' + i + ', ' + j + '>\n';
            if (typeof value[j] === "string")
                s += '<' + j + ', type, ' + value[j] + '>\n';
            else if (typeof value[j] === "object") {
                for (var k in value[j]) {
                    var field = value[j];
                    var fvalue = field[k];
                    if (typeof fvalue === "object") {
                        for (var l in fvalue) {
                            s += '<' + j + ', ' + k + ', ' + l + '>\n';
                            s += '<' + l + ', ' + 'type' + ', ' + fvalue[l] + '>\n';
                        }
                    }
                    else
                        s += '<' + j + ', ' + k + ', ' + value[j][k] + '>\n';
                }
            }
        }
        return s;
    }

    if (typeof value === "array") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (value == null) {
        return '<' + url + ', ' + i + ', ' + 'null' + '>\n';
    }
}
function map_field(url, obj, i) {
    var value = obj[i];

    if (i === "@context")
        return "";

    if (typeof value === "string") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (typeof value === "number") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (typeof value === "object") {
        var s = "";
        for (var j in value) {
            s += '<' + url + ', ' + i + ', ' + j + '>\n';
            if (typeof value[j] === "string")
                s += '<' + j + ', type, ' + value[j] + '>\n';
            else if (typeof value[j] === "object") {
                for (var k in value[j]) {
                    s += '<' + j + ', param, ' + k + '>\n';
                    if (typeof value[j][k] === "string")
                        s += '<' + k + ', type, ' + value[j][k] + '>\n';
                }
            }
        }
        return s;
    }

    if (typeof value === "array") {
        return '<' + url + ', ' + i + ', ' + value + '>\n';
    }

    if (value == null) {
        return '<' + url + ', ' + i + ', ' + 'null' + '>\n';
    }
}





