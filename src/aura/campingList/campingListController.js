({
	myAction : function(component, event, helper) {
		
	},
    clickCreateItem:function(component,event,helper){
      var validCampingItem= component.find('campingitemform').reduce(function(validSoFar,inputCmp){
        inputCmp.showHelpMessageIfInvalid();
        return validSoFar && inputCmp.get('v.validity').valid;
      },true);
      if(validCampingItem){
          var newCampingItem=component.get('v.newItem');
          debugger;
          var campingItems=component.get('v.items');
          campingItems.push(JSON.parse(JSON.stringify(newCampingItem)));
		  component.set('v.items',campingItems);
		  var ssss=component.get('v.newItem');
		  debugger;
		  component.set('v.newItem',{sobjectType:'Camping_Item__c',Name:'',Quantity__c:'0',Price__c:'0.0'});
      }
        
    }
})