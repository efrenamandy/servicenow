/**
* Update all fields in a form to be read only
*/

g_form.elements.forEach(function(element){
    g_form.setMandatory(element.fieldName, false);
    g_form.setReadOnly(element.fieldName, true);
});
