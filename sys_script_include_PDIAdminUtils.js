var PDIAdminUtils = Class.create();
PDIAdminUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    moveCustomerUpdatesToCurrent: function(sysIds) {
        sysIds = sysIds || this.getParameter('sysparm_sys_ids');

        var currentUpdateSet = this._getCurrentUpdateSet();

        var customerUpdateGr = new GlideRecord('sys_update_xml');
        customerUpdateGr.addQuery('sys_id', 'IN', sysIds);
        customerUpdateGr.query();
        while (customerUpdateGr.next()) {
            customerUpdateGr.update_set = currentUpdateSet;
            customerUpdateGr.update();
        }

    },

    moveCustomerUpdatesToDefault: function(sysIds) {
        sysIds = sysIds || this.getParameter('sysparm_sys_ids');

        var customerUpdateGr = new GlideRecord('sys_update_xml');
        customerUpdateGr.addQuery('sys_id', 'IN', sysIds);
        customerUpdateGr.query();
        while (customerUpdateGr.next()) {
            var application = customerUpdateGr.getValue('application');
            var defaultUpdateSet = this._getDefaultUpdateSetByApplication(application);

            customerUpdateGr.update_set = defaultUpdateSet;
            customerUpdateGr.update();
        }

    },

    getCurrentUpdateSetName: function() {
        var updateSetGr = new GlideRecord('sys_update_set');
        if (updateSetGr.get(this._getCurrentUpdateSet())) {
            return updateSetGr.getDisplayValue();
        }
    },

    _getCurrentUpdateSet: function() {
        return new GlideUpdateSet().get();
    },

    _getDefaultUpdateSetByApplication: function(application) {
        var updateSetGr = new GlideRecord('sys_update_set');
        updateSetGr.addQuery('application', application);
        updateSetGr.addQuery('state', 'in progress');
        updateSetGr.addQuery('is_default', true);
        updateSetGr.setLimit(1);
        updateSetGr.query();
        if (updateSetGr.next())
            return updateSetGr.getUniqueValue();
    },

    type: 'PDIAdminUtils'
});
