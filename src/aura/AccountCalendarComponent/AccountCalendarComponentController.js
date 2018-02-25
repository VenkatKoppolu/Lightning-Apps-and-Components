({
	myAction : function(component, event, helper) {
	},
	afterScriptsLoaded:function(component,event,helper){
		helper.fetchDefaultCalendarSettings(component);
	}
})