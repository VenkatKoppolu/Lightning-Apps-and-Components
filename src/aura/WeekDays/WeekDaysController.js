({
	myAction : function(component, event, helper) {
	},
	doinit:function(component,event,helper){
		var action=component.get('c.getDefaultDaysOnForWeek');
		action.setParams({
			'objectApi':component.get('v.objectApi')
		});
		action.setCallback(this,function(response){
			if(response.getState()=='SUCCESS'){
				var weekDaysDefault=JSON.parse(response.getReturnValue());
				debugger;
				component.set('v.WeeklyDaysCustomSetting',weekDaysDefault);
			}else{
				console.log('Failed in WeekDays Component, controller:ShowFormEditableComponentController, Method:getDefaultDaysOnForWeek'+response);
			}
		});
		$A.enqueueAction(action);
	}
})