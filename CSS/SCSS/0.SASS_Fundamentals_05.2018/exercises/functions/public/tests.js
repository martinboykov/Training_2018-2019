(function() {
  function testTheme(themename, c1, c2, c3, c4) {
    test(themename + ' button colors', function(assert) {
      assert.hasStyle('.' + themename + ' .btn.btn-primary', {
        'background-color': c1
      }, 'primary button bg color is incorrect');
      assert.hasStyle('.' + themename + ' .btn.btn-secondary', {
        'background-color': c2
      }, 'secondary button bg color is incorrect');
      assert.hasStyle('.' + themename + ' .btn.btn-other', {
        'background-color': c3
      }, 'other button bg color is incorrect');
      assert.hasStyle('.' + themename + ' .btn.btn-other2', {
        'background-color': c4
      }, 'other2 button bg color is incorrect');
    });
  }
  test('First button', function(assert) {
    assert.hasStyle('.btn', {
      'border-radius': assert.compare.eq('2px'),
      'border-style': 'solid',
      'border-color': assert.compare.truthy(),
      'border-width': assert.compare.gt(0),
      'display': 'inline-block'
    }, 'styles are incorrect');
  })

  testTheme('theme-1', '#339999', '#779933', '#773399', '#993333');
  testTheme('theme-2', '#660099', '#009966', '#996600', '#339900');
  testTheme('theme-3', '#cc6699', '#6699cc', '#99cc66', '#66cc99');
}());
