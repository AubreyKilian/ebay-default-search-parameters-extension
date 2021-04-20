log("Settings page loaded.");

function initDisplayValues() 
{
	getLocationOverrideOptionFromStorage(function(currentLocationOverrideOption) {
		setLocationOverrideOption(currentLocationOverrideOption);
	});

	getFreeShippingOverrideOptionFromStorage(function(currentFreeShippingValue) {
		setFreeShippingOverrideOption(currentFreeShippingValue);
	});
}

function setLocationOverrideOption(locationOverrideOption) 
{
	if (!isLocationOverrideOptionValid(locationOverrideOption)) 
	{
		locationOverrideOption = defaultOverride;

		saveLocationOverrideOptionToStorage(locationOverrideOption, function(){
			log("Location override option set to: " + locationOverrideOption);
		});
	}

	setWidgetChecked(locationOverrideOption, true);
}

function setFreeShippingOverrideOption(freeShippingOverrideOption) 
{
	saveFreeShippingOverrideOptionToStorage(freeShippingOverrideOption, function(){
		log("Free shipping override option set to: " + freeShippingOverrideOption);
	});

	setWidgetChecked(TOGGLE_OVERRIDE_OPTIONS.FREE_SHIPPING, freeShippingOverrideOption);
}

function saveOptions()
{
	var locationOverrideOption = getSelectedLocationOverrideOption();
	var freeShippingValue = getFreeShippingValue();
	var optionKey = {};

	if(isLocationOverrideOptionValid(locationOverrideOption))
	{
		optionKey[STORAGE_KEYS.LOCATION_OVERRIDE_OPTION] = locationOverrideOption;
	}

	if(freeShippingValue !== null) {
		optionKey[STORAGE_KEYS.FREE_SHIPPING] = freeShippingValue;
	}

	chrome.storage.sync.set(optionKey, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() { status.textContent = ''; }, 1000);
	});
}

function getSelectedLocationOverrideOption()
{
	if(isWidgetChecked(LOCATION_OVERRIDE_OPTIONS.COUNTRY_ONLY))
	{
		return LOCATION_OVERRIDE_OPTIONS.COUNTRY_ONLY;
	}

	if(isWidgetChecked(LOCATION_OVERRIDE_OPTIONS.REGION_ONLY))
	{
		return LOCATION_OVERRIDE_OPTIONS.REGION_ONLY;
	}

	if(isWidgetChecked(LOCATION_OVERRIDE_OPTIONS.DISABLE))
	{
		return LOCATION_OVERRIDE_OPTIONS.DISABLE;
	}
}

function getFreeShippingValue()
{
	var freeShippingValue = isWidgetChecked(TOGGLE_OVERRIDE_OPTIONS.FREE_SHIPPING);
	return freeShippingValue;
}

function isWidgetChecked(widgetId)
{
	var widget = document.getElementById(widgetId);

	return (widget !== undefined && widget.checked === true)
}

function setWidgetChecked(widgetId, checked)
{
	var widget = document.getElementById(widgetId);

	if(widget !== undefined)
	{
		widget.checked = (typeof(checked) === "boolean") ? checked : false;
	}
}

document.addEventListener('DOMContentLoaded', initDisplayValues);
document.getElementById(LOCATION_OVERRIDE_OPTIONS.COUNTRY_ONLY).addEventListener('click', saveOptions);
document.getElementById(LOCATION_OVERRIDE_OPTIONS.REGION_ONLY).addEventListener('click', saveOptions);
document.getElementById(LOCATION_OVERRIDE_OPTIONS.DISABLE).addEventListener('click', saveOptions);
document.getElementById(TOGGLE_OVERRIDE_OPTIONS.FREE_SHIPPING).addEventListener('click', saveOptions);
