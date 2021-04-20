function isLocationOverrideOptionValid(option)
{
	return (option === LOCATION_OVERRIDE_OPTIONS.COUNTRY_ONLY ||
		    option === LOCATION_OVERRIDE_OPTIONS.REGION_ONLY ||
		    option === LOCATION_OVERRIDE_OPTIONS.DISABLE);
}

function log(message, messageType)
{
	if(shouldLog === true) 
	{
		switch(messageType)
		{
			case MESSAGE_TYPES.DEBUG:
			{
				console.log(message);
				break;
			}
			case MESSAGE_TYPES.ERROR:
			{
				console.error(message);
				break;
			}
			default:
			{
				console.log(message);
			}
		}
	}
}

function getLocationOverrideOptionFromStorage(callBack)
{
	getStorage(function(items) {
		callBack(items.locationOverride);
	});
}

function getFreeShippingOverrideOptionFromStorage(callBack)
{
	getStorage(function(items) {
		callBack(items.freeShipping);
	});
}

function saveLocationOverrideOptionToStorage(overrideOption, callBack)
{
	setStorage(STORAGE_KEYS.LOCATION_OVERRIDE_OPTION, overrideOption, function(){
		callBack();
	});
}

function saveFreeShippingOverrideOptionToStorage(overrideOption, callBack)
{
	setStorage(STORAGE_KEYS.LOCATION_OVERRIDE_OPTION, overrideOption, function(){
		callBack();
	});
}

function getStorage(callBack)
{
	chrome.storage.sync.get(null, function(items) {
		callBack(items);
	});
}

function setStorage(storageKey, value, callBack)
{
	var key = {};
	key[storageKey] = value;
	
	chrome.storage.sync.set(key, function() {
		callBack();
	});
}