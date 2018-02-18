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
      }
        
    }
})