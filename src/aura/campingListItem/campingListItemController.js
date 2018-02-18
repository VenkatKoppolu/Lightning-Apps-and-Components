({
	myAction : function(component, event, helper) {
		
	},
    packItem:function(component,event,helper){
        var item=component.get('v.item');
        item.Packed__c=true;
        component.set('v.item',item);
        var btnCtrl=event.getSource()
        btnCtrl.set('v.disabled',true);
    }
})