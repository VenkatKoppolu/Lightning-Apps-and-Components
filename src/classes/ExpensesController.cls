public with sharing class ExpensesController {
	@AuraEnabled
	public static Expense__c saveExpense(Expense__c expense){

		upsert expense;
		return expense;
	}

	@AuraEnabled
	public static List<Expense__c> getExpenses(){
		 // Check to make sure all fields are accessible to this user i.e., Field Level Security(FLS)
        String[] fieldsToCheck = new String[] {
            'Id', 'Name', 'Amount__c', 'Client__c', 'Date__c', 
            'Reimbursed__c', 'CreatedDate'
        };
        
        Map<String,Schema.SObjectField> fieldDescribeTokens = 
            Schema.SObjectType.Expense__c.fields.getMap();
        
        for(String field : fieldsToCheck) {
            if( ! fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
                throw new System.NoAccessException();
                return null;
            }
        }
        
        // OK, they're cool, let 'em through
        return [SELECT Id, Name, Amount__c, Client__c, Date__c, 
                       Reimbursed__c, CreatedDate 
                FROM Expense__c];
	}
}