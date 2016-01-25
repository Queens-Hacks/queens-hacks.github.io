(function() {
  // Get the information
  var lines = [].slice.call(document.querySelectorAll('.prompt > *'));
  var cmds = lines.map(function(line) { return line.getAttribute('data-cmd'); });
  var htmls = lines.map(function(line) { return line.innerHTML; });

  // Clear every element
  lines.forEach(function(line) { line.innerHTML = ''; });

  // Perform the typing of every line
  var i = 0;
  function typeLine() {
    if (i < lines.length) {
      // Get the information about the line
      var line = lines[i], cmd = cmds[i], html = htmls[i];

      // Initial line content
      line.appendChild(document.createTextNode('root@qhack:~# '));
      line.classList.add('active');

      // Print every character
      var c = 0;
      function typeChar() {
        if (c < cmd.length) {
          // Print a char
          var character = document.createTextNode(cmd.charAt(c));
          line.appendChild(character);
          c++;

          setTimeout(typeChar, 70);
        } else {
          // Print the output
          var result = document.createElement('div');
          result.setAttribute('class', 'output');
          result.innerHTML = html;
          line.appendChild(result);
          line.classList.remove('active');

          i++;
          typeLine();
        }
      }

      setTimeout(typeChar, 300);
    } else {
      var last = document.createElement('p');
      last.appendChild(document.createTextNode('root@qhack:~# '));
      last.classList.add('active');
      document.querySelector('.prompt').appendChild(last);
    }
  }

  typeLine();
})();
