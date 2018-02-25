({
	helperMethod : function() {
	},
	showEventsOnCalendar:function(component,defaultCalendarData,candidateEventArray){
		var calendarDiv=component.find('calendar').getElement();
		debugger
		$(calendarDiv).fullCalendar({
			header: {
				left: 'month,agendaWeek,today',
				center: 'title',
				right: 'prev,next'
			},
			 views: {
				month: { // name of view
					columnHeaderFormat: 'ddd'
					// other view-specific options here
				}, week: {
						 columnHeaderFormat: 'ddd-D'
					}
			},
			weekMode    : 'variable',
			fixedWeekCount : false,
			//height: 600,
			defaultView: defaultCalendarData.CalendarView__c ,  
			allDaySlot : false,
			firstDay    : '',//result.selectDayValue,
			editable: true,
			eventSources: [ JSON.parse(candidateEventArray) ],
			eventRender : function(event, element) {
				var view = $(calendarDiv).fullCalendar('getView');
				element.find('.fc-event-title').hide();
				element.find('.fc-time').hide();
		   },
		   dayClick: function(date, jsEvent, view) {
			   this.showPopUpCreateEvents();
			   
		   },
		   eventClick: function(calEvent, jsEvent, view) {
			   debugger;
		   }
		});
	},
	fetchAccountEvents:function(component,defaultCalendarData){
		var action=component.get('c.getEvents');
		action.setParams({
			'accountID':component.get('v.recordId'),
			'calendarView':defaultCalendarData.CalendarView__c
		});
		action.setCallback(this,function(response){
			if(response.getState()=='SUCCESS'){
				this.showEventsOnCalendar(component,defaultCalendarData,response.getReturnValue());
			}else{
				console.log('Failed to call getEvents'+response.getState());
			}
		});
		$A.enqueueAction(action);
	},
	fetchDefaultCalendarSettings:function(component){
		var action=component.get("c.getDefaultCalendarSettings");
		action.setCallback(this,function(response){
			if(response.getState()=='SUCCESS'){
				var customMetaData=response.getReturnValue();
				component.set('v.defaultSettings',customMetaData);
				this.fetchAccountEvents(component,customMetaData[0]);
			}else{
				console.log('Failed to call getDefaultCalendarSettings'+response.getState());
			}
		});
		$A.enqueueAction(action);
	},
	showPopUpCreateEvents:function(component){
		

	}
})