autocode.state['output'] = function() {
  autocode.action.toggleSection('output');
  
  if (autocode.data.output) {
    $('#output-content-container .table a').slice(1).remove();
    
    var output, output_icon;
    for (var output_filename in autocode.object.sort(autocode.data.output.files)) {
      output = autocode.data.output.files[output_filename];
      
      output_icon = 'file-icon';
      switch (true) {
        case output.format == 'js' || !!output_filename.match(/\.js$/i): {
          output_icon = 'js-icon';
          break;
        }
        case output.format == 'json' || !!output_filename.match(/\.json$/i): {
          output_icon = 'json-icon';
          break;
        }
      }
      
      $('#output-content-container .table').append(
        '<a class="file" href="output/file?file=' + output_filename + '">'
          + '<span class="image"><span class="icon ' + output_icon + '"></span></span>'
          + '<span class="info">'
            + '<span class="name">' + output_filename + '</span>'
          + '</span>'
        + '</a>'
      );
    }
    
    autocode.initState()
    
    $('#output-content-container .table a').eq(1).click();
    
    $('#output-init').hide();
    $('#output-content-container').show();
  } else {
    $('#output-init').show();
    $('#output-content-container').hide();
  }
  
  autocode.resize.all();
};