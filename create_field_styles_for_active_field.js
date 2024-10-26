/** 
 * This script creates field styles for active, u_active, and inactive field.
 * This helps to see records that are active VS inactive from list view much quicker.
 */

(function() {
    var dictionaryGr = new GlideRecord("sys_dictionary");
    dictionaryGr.addEncodedQuery("element=active^ORelement=u_active^ORelement=inactive^internal_type=boolean");
    dictionaryGr.query();
    while (dictionaryGr.next()) {
        var table = dictionaryGr.getValue('name');
        var field = dictionaryGr.getValue('element');

        if (field === 'active' || field === 'u_active') {
            _createActiveTrueStyle(table, field);
            _createActiveFalseStyle(table, field);
        }

		if (field === 'inactive') {
            _createInactiveTrueStyle(table, field);
            _createInactiveFalseStyle(table, field);
        }
    }

    function _createActiveTrueStyle(table, field) {
        var styleGr = new GlideRecord('sys_ui_style');
        styleGr.newRecord();
        styleGr.element = field;
        styleGr.value = '1';
        styleGr.style = 'background-color:limegreen';
        styleGr.name = table;
        styleGr.insert();
    }

    function _createActiveFalseStyle(table, field) {
        var styleGr = new GlideRecord('sys_ui_style');
        styleGr.newRecord();
        styleGr.element = field;
        styleGr.value = '0';
        styleGr.style = 'background-color:tomato';
        styleGr.name = table;
        styleGr.insert();
    }

    function _createInactiveTrueStyle(table, field) {
        var styleGr = new GlideRecord('sys_ui_style');
        styleGr.newRecord();
        styleGr.element = field;
        styleGr.value = '1';
        styleGr.style = 'background-color:tomato';
        styleGr.name = table;
        styleGr.insert();
    }
	
    function _createInactiveFalseStyle(table, field) {
        var styleGr = new GlideRecord('sys_ui_style');
        styleGr.newRecord();
        styleGr.element = field;
        styleGr.value = '0';
        styleGr.style = 'background-color:limegreen';
        styleGr.name = table;
        styleGr.insert();
    }

})();
