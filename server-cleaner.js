// Generated by CoffeeScript 1.9.2
(function() {
  var a_list, b_s, collected_elements, d, element_has_been_added, gen_link, gen_photo, gen_video, i, j, k, l, len, len1, len2, len3, len4, len5, len6, m, n, o, p, ref, ref1, s, t, type_guide, x,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  collected_elements = [];

  a_list = document.getElementsByTagName("a");

  for (j = 0, len = a_list.length; j < len; j++) {
    i = a_list[j];
    if (i.innerText !== void 0 && i.href !== void 0) {
      collected_elements.push({
        "href": i.href,
        "text": i.innerText
      });
    }
  }

  console.log(JSON.stringify(collected_elements));

  type_guide = [
    {
      "type": "directory",
      "types": ""
    }, {
      "type": "video",
      "types": "mp4 avi mkv flv"
    }, {
      "type": "photo",
      "types": "png jpeg jpg webm PNG JPEG JPG WEBM"
    }, {
      "type": "audio",
      "types": "m4a mp3 aiff"
    }, {
      "type": "source_code",
      "types": "py bookmarklet coffee js py rb coffee txt rtf"
    }, {
      "type": "database",
      "types": "sqlite db"
    }, {
      "type": "archive",
      "types": "7z zip jar tar gzip bz"
    }, {
      "type": "log",
      "types": "md out log"
    }, {
      "type": "other",
      "types": ""
    }
  ];

  for (k = 0, len1 = collected_elements.length; k < len1; k++) {
    i = collected_elements[k];
    if (i.text.split("").pop() === "/") {
      i["type"] = "directory";
    }
    for (l = 0, len2 = type_guide.length; l < len2; l++) {
      t = type_guide[l];
      if (ref = i.text.split(".").pop(), indexOf.call(t.types.split(' '), ref) >= 0) {
        i['type'] = t['type'];
      }
    }
    if (i["type"] === void 0) {
      i["type"] = "other";
    }
  }

  gen_link = function(list_object) {
    var css, d;
    d = document.createElement("a");
    d.innerText = list_object['text'];
    d.className = list_object['type'];
    d.href = list_object['href'];
    css = "<style>a{\n  margin: 6px;\n  position: relative;\n  float: left;\n  text-decoration: none;\n  color: white;\n  padding: 0.08in;\n  font-family: 'Avenir Next';\n  width:auto;\n  background: rgba(100,100,100,0.8);\n  text-align: center;\n}\na:hover, a:active{\n  background: blue;\n}</style>";
    return css + d.outerHTML;
  };

  gen_photo = function(list_object) {
    var css, d;
    d = document.createElement("img");
    d.className = list_object['type'];
    d.src = list_object['href'];
    d.href = list_object['href'];
    css = "<style>.photo{\n  margin: 6px 0;\n  position: relative;\n  height:auto;\n  float: left;\n  width:100%;\n}\n.photo:hover, .photo:active{\n  opacity:0.6;\n}</style>";
    return css + d.outerHTML;
  };

  gen_video = function(list_object) {
    var css, d;
    d = document.createElement('video');
    d.className = list_object['type'];
    d.src = list_object['href'];
    css = "<style>\n  .video{\n    width:10%;\n    margin:6px 0;\n    height:auto;\n    float:left;\n    position:relative;\n  }\n  .video:hover, .video:active{\n    opacity:0.6;\n  }\n</style>";
    return css + d.outerHTML;
  };

  for (m = 0, len3 = collected_elements.length; m < len3; m++) {
    i = collected_elements[m];
    console.log(gen_link(i));
    i['html'] = gen_link(i);
    if (i['type'] === "photo") {
      i['html'] = gen_photo(i);
    }
    if (i['type'] === "video") {
      i['html'] = gen_video(i);
    }
  }

  document.body.innerHTML = "";

  b_s = document.body.style;

  b_s.height = "auto";

  b_s.width = "100%";

  b_s.background = 'rgba(20,20,20,0.9)';

  b_s.margin = 0;

  for (n = 0, len4 = type_guide.length; n < len4; n++) {
    i = type_guide[n];
    element_has_been_added = false;
    d = document.createElement("div");
    d.className = i['type'] + "_container";
    s = d.style;
    s.position = "relative";
    s.height = "auto";
    s.width = "90%";
    s.margin = "0.1in 5%";
    s.float = "left";
    d.innerHTML = "<p style='height:0.25in;width:100%;margin:0.05in 0;border-bottom:solid 1px white;color:white;font-family:arial;'>" + i['type'] + "</p>";
    for (o = 0, len5 = collected_elements.length; o < len5; o++) {
      x = collected_elements[o];
      if (x['type'] === i['type']) {
        element_has_been_added = true;
        d.innerHTML += x['html'];
      }
    }
    if (element_has_been_added) {
      document.body.innerHTML += d.outerHTML;
    }
  }

  ref1 = document.getElementsByTagName("img");
  for (p = 0, len6 = ref1.length; p < len6; p++) {
    i = ref1[p];
    i.ondblclick = function() {
      console.log("opening " + this.src);
      return location.href = this.src;
    };
  }

}).call(this);
