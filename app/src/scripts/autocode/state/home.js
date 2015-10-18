autocode.state['home'] = function() {
  autocode.popover.close();
  
  if (autocode.data.originalConfig != jsyaml.safeDump(autocode.project)) {
    autocode.popup.open({
      title: 'Close Project',
      content: '<div style="padding-bottom: 15px">Are you sure you want to close this project? <b>You will lose all unsaved changes.</b></div>'
        + '<a class="button" href="popup/close">No, Keep It Open</a> <a class="button secondary" href="home/submit">Yes, Close Project</a> <a class="button secondary" href="project/diff">View Unsaved Changes</a>'
    });
    return;
  }
  
  autocode.state['home/submit']();
};