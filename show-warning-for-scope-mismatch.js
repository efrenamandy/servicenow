/**
* Used as Display BR in sys_update_set
*/

(function executeRule(current, previous /*null when async*/ ) {

    var isBaseUpdateSet = current.getUniqueValue() === current.getValue('base_update_set');

    if (!isBaseUpdateSet) {
        var customerUpdateGr = new GlideRecord('sys_update_xml');
        customerUpdateGr.addQuery('update_set', current.getUniqueValue());
        customerUpdateGr.addQuery('application', '!=', current.getValue('application'));
        customerUpdateGr.query();
        if (!customerUpdateGr.hasNext()) return;

        return gs.addErrorMessage('<strong>Warning:</strong> This Update Set contains <i>Customer Updates</i> that do not match their Application Scope. Please move the customer updates to the correct scope to avoid errors when previewing in a different instance.');
    }

    var childUpdateSets = [];
    var updateSetGr = new GlideRecord('sys_update_set');
    updateSetGr.addQuery('base_update_set', current.getUniqueValue());
    updateSetGr.query();
    while (updateSetGr.next()) {
        childUpdateSets.push(updateSetGr.getUniqueValue());
    }

    var updateSetsWithIssues = childUpdateSets.filter(function(updateSet) {
        var updateSetGr = new GlideRecord('sys_update_set');
        if (!updateSetGr.get(updateSet)) return;

        var updateSetScope = updateSetGr.getValue('application');

        var customerUpdateGr = new GlideRecord('sys_update_xml');
        customerUpdateGr.addQuery('update_set', updateSet);
        customerUpdateGr.addQuery('application', '!=', updateSetScope);
        customerUpdateGr.query();
        return customerUpdateGr.hasNext();
    });

    var linksOfUpdateSetsWithIssues = updateSetsWithIssues.map(function(updateSet) {
        var updateSetGr = new GlideRecord('sys_update_set');
        if (!updateSetGr.get(updateSet)) return;

        return '<a href="/sys_update_set.do?sys_id=' + updateSet + '" target="_blank">' + updateSetGr.getDisplayValue() + '</a>';
    });

    if (linksOfUpdateSetsWithIssues.length > 0) {
        gs.addErrorMessage('<strong>Warning:</strong> The following Update Sets contain <i>Customer Updates</i> that do not match their Application Scope. Please move the customer updates to the correct scope to avoid errors when previewing in a different instance.<br/><br/>' + linksOfUpdateSetsWithIssues.join('<br/>'));
    }
})(current, previous);
