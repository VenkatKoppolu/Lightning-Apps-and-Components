({
	helperMethod : function() {
		
	},
    createExpense: function(component, expense) {
        var action = component.get("c.saveExpense"); //server side apex controller action
        action.setParams({'expense':expense}); // this is parameter for setting an expense
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state=='SUCCESS'){
                var expenses=component.get('v.expenses');
                expenses.push(response.getReturnValue());
                component.set('v.expenses',expenses);

            }
        });
        // this will call the server side class and queues it in server the callback will call above function when it gives response.
        $A.enqueueAction(action); 
    }
})