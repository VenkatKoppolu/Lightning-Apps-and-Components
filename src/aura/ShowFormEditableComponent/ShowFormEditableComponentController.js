({
	myAction : function(component, event, helper) {
	},
	doinit:function(component,event,helper){
	//	debugger;
		var action=component.get('c.getFieldsFromFieldSet');
		action.setParams({
			'fieldSet':component.get('v.fieldSet'),
			'objectApi':component.get('v.objectApi')
		});
		action.setCallback(this,function(response){
			if(response.getState()=='SUCCESS'){
				var fieldsSchema=JSON.parse(response.getReturnValue());
				component.set('v.fieldsetfields',fieldsSchema);
			}else{
				console.log('Failed in ShowFormEditableComponent'+response);
			}
		});
		$A.enqueueAction(action);
	}
})