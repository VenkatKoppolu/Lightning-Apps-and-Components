public with sharing class ShowFormEditableComponentController {
	
	@AuraEnabled
	public static String getFieldsFromFieldSet(String fieldSet,String objectApi){
		List<String> fieldApis=new List<String>();
		List<Schema.FieldSetMember> fieldsetMembers = Schema.getGlobalDescribe().get(objectApi).getDescribe().fieldSets.getMap().get(fieldSet).getFields();
		
        /*for (Schema.FieldSetMember field: fieldsetMembers) {
			field.getMap();
			fieldApis.add(field.getFieldPath());
		}*/
		
		return JSON.serialize(fieldsetMembers);
	}
}