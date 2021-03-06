autocode.action.addCommand = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/AddCommand.json',
    xhr: true,
    ready: function(form) {
      form.fields.command.autocomplete = false;
      
      autocode.popup.open({
        title: 'Add Command',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (!autocode.project.scripts) {
        autocode.project.scripts = {};
      }
      if (!autocode.project.scripts[autocode.data.current.script]) {
        autocode.project.scripts[autocode.data.current.script] = [];
      }
      
      var script = {
        description: data.description,
        command: data.command
      };
      if (data.path.length) {
        script.path = data.path;
      }
      
      autocode.project.scripts[autocode.data.current.script].push(script);
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.action.loadScript();
      
      return false;
    }
  });
};