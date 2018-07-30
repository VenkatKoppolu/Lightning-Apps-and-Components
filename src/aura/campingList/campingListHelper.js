({
	helperMethod : function() {
		
	},createItem:function(component,campingItem){
		var action=component.get('c.saveItem');
		action.setParams({
			'itemCamping':campingItem
		});
		action.setCallback(this,function(response){
			if(response.getState()=='SUCCESS'){
				var campingItems=component.get('v.items');
          campingItems.push(response.getReturnValue());
		  component.set('v.items',campingItems);
		  component.set('v.newItem',{sobjectType:'Camping_Item__c',Name:'',Quantity__c:'0',Price__c:'0.0'});

			}
		});
		$A.enqueueAction(action);
	}
})