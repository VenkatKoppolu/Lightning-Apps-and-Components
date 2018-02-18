({
  myAction: function (component, event, helper) {

  },
  doinit: function (component, event, helper) {
    var action = component.get('c.getItems');
    action.setCallback(this, function (response) {
      if (response.getState() == 'SUCCESS') {
        component.set('v.items', response.getReturnValue());
      }

    });
    $A.enqueueAction(action);
  },
  clickCreateItem: function (component, event, helper) {
    var validCampingItem = component.find('campingitemform').reduce(function (validSoFar, inputCmp) {
      inputCmp.showHelpMessageIfInvalid();
      return validSoFar && inputCmp.get('v.validity').valid;
    }, true);
    if (validCampingItem) {
      helper.createItem(component, component.get('v.newItem'));

    }

  }
})