public with sharing class AccountCalendarController {

	@AuraEnabled
	public static List < CalendarDefault__mdt > getDefaultCalendarSettings() {
		return [select CalendarView__c, DateFormat__c from CalendarDefault__mdt];
	}

	/*	@AuraEnabled
		public static List<Event> getEvents(ID accountID){
			List<Event> accountEvents=[];


			return accountEvents;
		}*/

	@AuraEnabled
	public static String getEvents(String accountID, String calendarView) {
		Date startDate = System.today();
		Date endDate = System.today();
		if (calendarView.equals('month')) {
			startDate = startDate.toStartOfWeek();
			endDate = startDate.addDays(6);
		} else if (calendarView.equals('agendaWeek')) {
			startDate = startDate.toStartOfMonth();
			endDate = startDate.addMonths(1).toStartOfMonth().addDays(-1);
		} else {

		}

		Map < String, String > eventsTypesColorsMap = new Map < String, String > ();
		for (EventTypeColor__mdt typeMdt: [SELECT ColorCode__c, Type__c, Available__c FROM EventTypeColor__mdt]) {

			eventsTypesColorsMap.put(typeMdt.Type__c, typeMdt.ColorCode__c);
		}
		List < CalendarEvent > candidateEventList = new List < CalendarEvent > ();
		
		
		String ceventQuery = 'SELECT ID,StartDateTime,EndDateTime,Subject,Type FROM EVENT WHERE WhatId=\''+accountID +'\' AND StartDateTime >='+ convertDateToString(startDate,'start')+' AND StartDateTime <='+ convertDateToString(endDate,'end')+'';
		//String ceventQuery = ;
		
		System.debug('INFO' + ceventQuery);
		//System.debug('INFO' + Database.query('SELECT ID,StartDateTime,EndDateTime,Subject,Type FROM EVENT WHERE WhatId=\''+accountID +'\' AND StartDateTime >= :startDate AND StartDateTime <= :endDate'));
		for (Event ca: Database.query(ceventQuery)) {
			CalendarEvent calEvent = new CalendarEvent();
			calEvent.reason = ca.Type;
			calEvent.start = ca.StartDateTime.format(Utility.FULLDATETIMEFORMATSTR); //It needs to be in this format as full calendar expects month first
			calEvent.endDateTime = ca.EndDateTime.format(Utility.FULLDATETIMEFORMATSTR);
			calEvent.title=+ca.StartDateTime.format('h:mm a')+'-'+ca.EndDateTime.format('h:mm a');

			calEvent.Id = ca.Id;
			String colorCode;
			if (eventsTypesColorsMap.get(calEvent.reason) != NULL) {
				colorCode = eventsTypesColorsMap.get(calEvent.reason);
			} else {
				colorCode = 'Yellow';
			}
			calEvent.color = colorCode; //'yellow';//Utility_Constants.DEFAULTAVAILACOLOR;
			String tooltip = '<table width="100%">';
			tooltip += Utility.addTableRow('CA No', '<a href="/' + ca.Id + '" target="_blank"></a>');
			tooltip += '</table>';
			calEvent.description = tooltip;
			candidateEventList.add(calEvent);
		}
		String candidateEventString = JSON.serialize(candidateEventList);
		while (candidateEventString.contains(Utility.ENDDATETIMESTR)) {
			candidateEventString = candidateEventString.replace(Utility.ENDDATETIMESTR, Utility.ENDSTR);
		}
		return candidateEventString;
	}

	@AuraEnabled
	public static String convertDateToString(Date inputDate,String type){
		if(type=='start'){
			return datetime.newInstance(inputDate.year(), inputDate.month(),inputDate.day()).format('yyyy-MM-dd\'T\'00:00:00\'Z\'');
		}else if(type=='end'){
			return datetime.newInstance(inputDate.year(), inputDate.month(),inputDate.day()).format('yyyy-MM-dd\'T\'11:59:59\'Z\'');
		}
		return '';
	}
}