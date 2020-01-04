function json2txt(obj, path) {
    var txt = '';
    var value = '';

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if ('object' === typeof obj[key]) {
          if (isNaN(key)) {
            txt += json2txt(obj[key], path + (path ? '.' : '') + key);
          } else {
            txt += json2txt(obj[key], path + (path ? '[' : '') + key + ']');
          }
        } else if ('string' === typeof obj[key]) {
          if (isNaN(key)) {
            txt += '.body("' + path + '.' + key + '", equalTo("' + obj[key] + '"))' + '<br/>.and()<br/>';
            txt = txt.replace('.body(".', '.body("');
          } else {
            txt += '.body("' + path + '[' + key + ']", equalTo("' + obj[key] + '"))' + '<br/>.and()<br/>';
          }
        } else {
          if (Number.isInteger(obj[key])) {
            value = obj[key];
          } else if (obj[key] == true) {
            value = obj[key];
          } else if (obj[key] == false) {
            value = obj[key];
          } else {
            value = obj[key] + 'f';
          }

          txt += '.body("' + path + '.' + key + '", equalTo(' + value + '))' + '<br/>.and()<br/>';
          txt = txt.replace('.body(".', '.body("');
        }
      }
    }
    return txt;
  }

  function myFunction() {
    if (IsJsonString(document.getElementById('inputJson').value)) {
      document.getElementById('assertions').innerHTML = '';
      var myObj = JSON.parse(document.getElementById('inputJson').value);

      document.getElementById('assertions').innerHTML += json2txt(
        myObj,
        ''
      );

      var text = document.getElementById('assertions').innerHTML;
      var textLength = text.trim().length;
      document.getElementById('assertions').innerHTML =
        '--------copy and paste the relevant assertions into your script -------------<br/><br/>' +
        text.substring(0, textLength - 14) +
        ';';
    } else {
      document.getElementById('assertions').innerHTML =
        "<span style='color:red'>  Not valid JSON </span>";
    }
  }

  function prettyPrint() {
    document.getElementById('assertions').innerText = '';
    if (IsJsonString(document.getElementById('inputJson').value)) {
      var obj = JSON.parse(document.getElementById('inputJson').value);
      var pretty = JSON.stringify(obj, undefined, 4);
      document.getElementById('inputJson').value = pretty;
      document.getElementById('assertions').innerHTML =
        "<span style='color:green'> JSON is well structured </span>";
    } else {
      document.getElementById('assertions').innerHTML =
        "<span style='color:red'>  Not valid JSON </span>";
    }
  }

  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function load(){
      currentVersion = "2.5";
      document.getElementById('auth').innerHTML='Cliff Douglas';
      document.getElementById('version').innerHTML="Assertion Creator version " + currentVersion;
  }