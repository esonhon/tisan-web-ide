/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    template.helper("$splitNumber", function(num, decimal) {
        var result = [ 0, 0 ];
        return result[0] = Math.floor(num), result[1] = Math.round(num * Math.pow(10, decimal)) % Math.pow(10, decimal), 
        result;
    }), /*v:4*/
    template("air", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="preview"> <div class="air-wrap"> <div class="progress-circle-outer animate"> </div> <div class="progress-circle-inner"> <span class="number mark">', 
        $out += $escape(status[0]), $out += '</span> <span class="unit">ppm</span> </div> </div> </div> <div class="clf"></div>', 
        new String($out);
    }), /*v:13*/
    template("default", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, label = $data.label, i = $data.i, config = $data.config, status = $data.status, $out = "";
        title && ($out += ' <div class="title">', $out += $escape(title), $out += "-", $out += $escape(label), 
        $out += "</div> "), $out += " ";
        for (var i in config) $out += ' <div class="default-status-wrap"> <div class="default-status-name">', 
        $out += $escape(config[i].name), $out += '</div> <div class="default-status-input-wrap"> <input class="default-status-input" placeholder="空" value="', 
        $out += $escape(status[i]), $out += '"> </div> </div> ';
        return $out += ' <span class="btn btn-refresh">REFRESH</span> <span class="btn btn-set">SET</span> <div class="clf"></div>', 
        new String($out);
    }), /*v:8*/
    template("humiture", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, title = $data.title, $escape = $utils.$escape, status = $data.status, $splitNumber = $helpers.$splitNumber, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="colorpicker"> </div> <div class="preview"> <div class="container"> <div class="de"> <div class="den humiture"> <div class="dene"> <div class="denem"> <div class="deneme humiture-wrap"><w class="humiture-text">', 
        "-" != status[0] && ($out += $escape($splitNumber(status[0], 1)[0])), $out += '</w><span></span><strong>%</strong> </div> </div> </div> </div> </div> </div> </div> <div class="clf"></div>', 
        new String($out);
    }), /*v:13*/
    template("led", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="colorpicker"> <canvas class="picker" width="200" height="200"></canvas> </div> <div class="preview"> <div> <label>R</label> <input type="text" class="rPrev" style="background-color:rgba(', 
        $out += $escape(status[0]), $out += ',0,0,1)"/> </div> <div> <label>G</label> <input type="text" class="gPrev" style="background-color:rgba(0,', 
        $out += $escape(status[1]), $out += ',0,1)"/> </div> <div> <label>B</label> <input type="text" class="bPrev" style="background-color:rgba(0,0,', 
        $out += $escape(status[2]), $out += ',1)"/> </div> </div> <div class="clf"></div> <div class="controls"> <input type="hidden" class="rVal" value="', 
        $out += $escape(status[0]), $out += '"/> <input type="hidden" class="gVal" value="', 
        $out += $escape(status[1]), $out += '"/> <input type="hidden" class="bVal" value="', 
        $out += $escape(status[2]), $out += '"/> </div> <span class="btn btn-refresh">REFRESH</span> <span class="btn btn-set">SET</span> <div class="clf"></div>', 
        new String($out);
    }), /*v:21*/
    template("motor", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="motor"> <div class="range-wrap"> <label for="range"> <input type="range" name="range" id="range" min="-128" max="127" step="1" value="', 
        $out += $escape(status[0]), $out += '" class="motor-range"/> </label> </div> <span class="motor-speed">', 
        $out += $escape(status[0]), $out += '</span><button class="btn-reset">RESET</button> </div> <div class="clf"></div>', 
        new String($out);
    }), /*v:5*/
    template("plug", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), title = $data.title, status = $data.status, cnt = $data.cnt, $out = "";
        return $out += '<div class="plug-title">', $out += $escape(title), $out += '</div> <div class="plug-wrap"> <input type="checkbox" class="slider-v1" ', 
        $out += $escape(status[0] ? "checked" : ""), $out += ' id="autogen-plug-', $out += $escape(cnt), 
        $out += '" /> <label for="autogen-plug-', $out += $escape(cnt), $out += '"></label> </div> <div class="clf"></div> </script> <script type="text/html" id="template-text"> ', 
        title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        new String($out);
    }), /*v:5*/
    template("pm25", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return $out += " ", title && ($out += ' <div class="title">', $out += $escape(title), 
        $out += "</div> "), $out += ' </div> <div class="container"> <div class="progress-circle-container"> <div class="progress-circle-outer animate"> </div> <div class="progress-circle-inner"> <span class="number pm25">', 
        $out += $escape(status[0]), $out += '</span> <span class="unit">ug/m3</span> </div> </div> </div> <div class="clf"></div> ', 
        new String($out);
    }), /*v:2*/
    template("temperature", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, title = $data.title, $escape = $utils.$escape, status = $data.status, $splitNumber = $helpers.$splitNumber, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="container"> <div class="de"> <div class="den"> <div class="dene"> <div class="denem"> <div class="deneme"> <w class="temmperature-text">', 
        "-" != status[0] && ($out += $escape($splitNumber(status[0], 1)[0])), $out += "</w> <span>", 
        "-" != status[0] && ($out += ".", $out += $escape($splitNumber(status[0], 1)[1])), 
        $out += '</span> <strong>&deg;</strong> </div> </div> </div> </div> </div> <div class="clf"></div>', 
        new String($out);
    }), /*v:5*/
    template("text", function($data) {
        "use strict";
        var $utils = this, title = ($utils.$helpers, $data.title), $escape = $utils.$escape, status = $data.status, $out = "";
        return title && ($out += ' <div class="title">', $out += $escape(title), $out += "</div> "), 
        $out += ' <div class="text">', $out += $escape(status.text), $out += "</div>", new String($out);
    });
}();;!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='air';
  window.iotboard.defineWidget(widgetName, {
    status: ['-'],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [],
    parseStatus: function(dom){
      return {
        mark: dom.find(".mark").val()
      }
    },
  });
}();
;!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='default';
  window.iotboard.defineWidget(widgetName, {
    status: [],
    config: [],
    render: function(dataset){
      console.log(dataset);
      dataset.status = this.status;
      dataset.config = JSON.parse(dataset.config);
      this.config = dataset.config;
      return template(widgetName,dataset);
    },
    listeners: [
      {
        selector: ".btn-set",
        event: "click",
        behavior: "set"
      },
      {
        selector: ".btn-refresh",
        event: "click",
        behavior: "get"
      }
    ],
    parseStatus: function(dom){
    var res=[];
    var conf = this.config;
    dom.find('.default-status-wrap').each(function(i){
      var value = $(this).find('.default-status-input').val();
      switch (conf[i].value_type){
        case 1:
        case 2:
          value = parseFloat(value);
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 13:
          value = parseInt(value);
          break;
        case 11:
        case 12:
          value = value + "";
          break;
        default:
          console.log("unkown value type: " + conf[i].value_type);
          break
      }
      res.push(value);
    });
    return res;
  },
  });
}();
;!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='humiture';
  window.iotboard.defineWidget(widgetName, {
    status: ['-'],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [],
    parseStatus: function(dom){
      return {
        humiture:dom.find('.humiture-text').text()
      }
    },
  });
}();
;!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var colorWheelBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAA59GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU1NzcyLCAyMDE0LzAxLzEzLTE5OjQ0OjAwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNS0wNi0xNlQxNjowODozMCswODowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE1LTA2LTE2VDE2OjA5OjI3KzA4OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNS0wNi0xNlQxNjowOToyNyswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDphYjRhYzE1Ni0xMzc3LTQ0MTQtOTllNS1hMTkxZDM5NzMwNmI8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2M2ZkM2U2Yi01NDhkLTExNzgtOTUzMy04M2YxNzdmYWMxYjY8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo3Yjg3NWRhMS0xMTIzLTRlMTQtYTM0NS1lMjZiMjRmNTdjNTM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6N2I4NzVkYTEtMTEyMy00ZTE0LWEzNDUtZTI2YjI0ZjU3YzUzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE1LTA2LTE2VDE2OjA4OjMwKzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YWI0YWMxNTYtMTM3Ny00NDE0LTk5ZTUtYTE5MWQzOTczMDZiPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE1LTA2LTE2VDE2OjA5OjI3KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjAwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjIwMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+JBkaiAAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAACDu0lEQVR42uy9d5wlR3X3/T3V6abJO7M5abVaSaucAIGEBCIbDCbYgDFgbIIN9mM/j81rGxvHx9nGgcc2xgYDJtuATRIIBBLKKK+0Wm3Q5jR55uburvP+UX1nZ1cb5s7cIVn9+ZS0c+dOd3VVnXzO70i1mbLYlyp4nhB5ClgURdRgFRRBBBSLB1g1iAiIggIIKqCqYEEMyKx7C+4eoCiKEcFaxapAdhvPy76j2bc0u4eAoFhVBOPmCoi4nxXN7m5ILXgGrHVzNSabhYLIsdnosRkNgK5RlW5EzxKMAT1XRAaBuqquBNYBiIhkj559iapq9vluETkEBKqMIzyuausgTwBlQfcoMgqCzL6N2Oyubv4iYAxYa2k9UkRQBcTtidsvi7WC5wuoYrN9EANqLSJuj9JU3fOyxTRiae2O4vbAiGCwaOs56p6tIqCCiLoDouLOhVh3JjDu+wYMApq9ANmH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";

  var widgetName = "led";
  window.iotboard.defineWidget(widgetName, {
    status: [0, 0, 0], // [red, blue, green]
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [
      {
        selector: ".btn-refresh",
        event: "click",
        behavior: "get"
      },
      {
        selector: ".btn-set",
        event: "click",
        behavior: "set"
      }
    ],
    parseStatus: function(dom){
      return [parseInt(dom.find(".rVal").val()),parseInt(dom.find(".gVal").val()), parseInt(dom.find(".bVal").val())]
    },
    onRendered: function(dom){
      console.log("on widget rendered.");
      // create canvas and context objects
      dom.find('.picker').each(function(){
        var ctx = this.getContext('2d');
  
        // drawing active image
        var image = new Image();
        image.onload = function () {
          console.log("color picker loaded...");
          ctx.drawImage(image, 0, 0); // draw the image on the canvas
        }
  
        // select desired colorwheel
        var imageSrc = colorWheelBase64;
        image.src = imageSrc;
      });
  
      dom.find('.picker').on("click", function(e) { // mouse move handler
        if (true) {
          // get coordinates of current position
          var widget = $(this).closest(".widget");
          var ctx = this.getContext('2d');
          var canvasOffset = $(this).offset();
          var canvasX = Math.floor(e.pageX - canvasOffset.left);
          var canvasY = Math.floor(e.pageY - canvasOffset.top);
  
          // get current pixel
          var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
          var pixel = imageData.data;
  
          // update preview color
          widget.find(".rPrev").css("background-color", "#" + pixel[0].toString(16) + "0000");
          widget.find(".gPrev").css("background-color", "#00" + pixel[1].toString(16) + "00");
          widget.find(".bPrev").css("background-color", "#0000" + pixel[2].toString(16));
  
          // update controls
          widget.find('.rVal').val(pixel[0]);
          widget.find('.gVal').val(pixel[1]);
          widget.find('.bVal').val(pixel[2]);
        }
      });
  
      dom.find('.freqCtrl').change(function(){
          $(this).closest(".controls").find(".freqVal").text($(this).val());
      });
  
      dom.find('.wCtrl').change(function(){
          $(this).closest(".controls").find(".wVal").text($(this).val());
      });
    }
  });

  console.log("add widget {led}");
}();
;!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='motor';
  window.iotboard.defineWidget(widgetName, {
    status: [0],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [
      {
        selector: ".motor-range",
        event: "change",
        behavior: "set"
      },{
        selector: ".btn-refresh",
        event: "click",
        behavior: "get"
      }
    ],
    parseStatus: function(dom){
      return [parseInt(dom.find(".motor-range").val())]
    },
    onRendered:function(dom){
      dom.find('.motor-range').on('input',function(){
        dom.find('.motor-speed').text($(this).val());
      });
      dom.find('.btn-reset').on('click',function(){
        dom.find('.motor-range').val(0);
        dom.find('.motor-speed').text(0);
        dom.find('.motor-range').change();
      });
    }
  });
}();
;!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var cnt = 0;

  var widgetName = "plug";
  window.iotboard.defineWidget(widgetName, {
    status: [0],
    render: function(dataset){
      cnt ++;
      dataset.status=this.status;
      dataset.cnt=cnt;
      return template(widgetName,dataset);
    },
    listeners: [
      {
        selector: ".plug-wrap label",
        event: "click",
        behavior: "set"
      }
    ],
    parseStatus: function(dom){
      return [dom.find(".slider-v1").is( ":checked" )?0:1];
    }
  });

  console.log("add widget {plug}");
}();
;!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='pm25';
  window.iotboard.defineWidget(widgetName, {
    status: ['-'],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [],
    parseStatus: function(dom){
      return {
        on: dom.find(".pm25").val()
      }
    },
  });
}();
;!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='temperature';
  window.iotboard.defineWidget(widgetName, {
    status: ['-'],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [],
    parseStatus: function(dom){
      return {
        temperature:dom.find('.temperature-text').text()
      }
    },
  });
}();
;!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName = "text";
  window.iotboard.defineWidget(widgetName, {
    status: ["loading..."],
    render: function(dataset){
        dataset.status=this.status;
        return template(widgetName,dataset);
    },
    listeners: [
      {
        selector: ".text",
        event: "click",
        behavior: "set"
      },
      {
        selector: ".title",
        event: "click",
        behavior: "get"
      }
    ],
    parseStatus: function(dom){
      return {
        text: dom.find(".text").html()
      }
    },
  });

  console.log("add widget {text}");
}();
