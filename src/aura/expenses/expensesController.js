({
	myAction : function(component, event, helper) {
		
	},doinit:function(component, event, helper){
        var action=component.get('c.getExpenses');
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state=='SUCCESS'){
                component.set('v.expenses',response.getReturnValue())

            }else {
                console.log("Failed with state: " + state);
            }
        });

        $A.enqueueAction(action);

    },
    clickCreate: function(component, event, helper) {
        var validExpense = component.find('expenseform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
            // Create the new expense
            var newExpense = component.get("v.newExpense");
            console.log("Create expense: " + JSON.stringify(newExpense));
            helper.createExpense(component, newExpense);
        }
    }
})