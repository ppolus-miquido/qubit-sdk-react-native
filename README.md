# Qubit React Native SDK

Installation of the QubitSDK, to provide event tracking and lookup. To make use of this SDK, please contact your Qubit Customer Success representative.

# Getting started

## Installation

`$ npm install qubit-sdk-react-native --save`

For React Native < 0.60 you are supposed to link the library.

`$ react-native link qubit-sdk-react-native`

# Send events

## Sending events
QProtocol (QP) is Qubitâ€™s industry standard, extensible data layer. To send a QP event, call the `sendEvent` method taking `QBEvent` object as an argument, as per the following example. The following example emits a standard `ecView` event, but this data can be modified to send any data you wish to send, based on Qubit's event schema:

```java
QubitSDK.tracker().sendEvent(QBEvents.fromJsonString("ecView", viewJson));
```

where `viewJson` takes the example form (this may vary depending on custom schema configuration):

```
{
    "type": "home",
    "subtypes": ["Women", "Dresses", "Cocktail Dresses"]
}
```

## Creating events

`QBEvents` class provides several methods that allows you to create an event as `QBEvent` object.

### From a json as `String`:

Example:

```java
String jsonString = "{ \"type\" : \"home\" }";

QubitSDK.tracker().sendEvent(QBEvents.fromJsonString("ecView", jsonString));
```

### From `JsonObject`:

Example:

```java
JsonObject jsonObject = new JsonObject();
jsonObject.addProperty("type", "home");

QubitSDK.tracker().sendEvent(QBEvents.fromJson("ecView", jsonObject));
```

### From `Object`:

Example:

```java
public class EcViewEventData {
    private String type;

    // some code
}
```

```java
EcViewEventData object = new EcViewEventData();
object.setType("home");

QubitSDK.tracker().sendEvent(QBEvents.fromObject("ecView", object));
```

## Enabling/disabling tracking
To disable/enable message dispatch on event occurrence use the following method:

```java
QubitSDK.tracker().enable(false); // disable
QubitSDK.tracker().enable(true); // enable
```

Note that tracking is enabled by default so you don't need to enable it if you've never disabled it anywhere.

# Experiences

SDK contains methods to fetch Experiences. This can be achieved by:

Kotlin snippet:
```kotlin    
QubitSDK.tracker().getExperiences(
    experienceIdList = listOfExperienceIds,
    onSuccess = { 
      experienceList -> experienceList.forEach { it.shown() } // make a Post to call the returned callback URL
    },
    onError = { 
      throwable -> Log.e(TAG, "Error: ", throwable) 
    },
    variation = 222,
    preview = false,
    ignoreSegments = true
)
```

Java snippet:
```java
QubitSDK.tracker().getExperiences(
    listOfExperienceIds,
    experienceList -> {
      for (Experience experience : experienceList) {
        experience.shown(); // make a Post to call the returned callback URL
      }
      return Unit.INSTANCE;
    },
    throwable -> {
      Log.d(TAG, throwable.toString());
      return Unit.INSTANCE;
    }, 222, false, true
);
```

where `variation`, `preview`, `ignoreSegments` are optional parameters

# Tracker Properties
You can get the `trackingID` and `deviceID` from the QubitSDK via the following methods:
```
QubitSDK.getTrackingId();
QubitSDK.getDeviceId();
```

## Backward compatibility

Migration from [the previous version of the SDK](https://github.com/qubitdigital/android-tracker) might be time-consuming and error-prone.

For this reason, in the current SDK you can send events in an exactly same way as before.

Example:

```java
QBTrackingManager.sharedManager().registerEvent("ecView", viewJson);
```

Note that this class and its methods are deprecated and we recommend to eventually replace them by the new versions (see: [Sending events](#sending-events)).

Example of how to replace deprecated method of sending events:

```java
QubitSDK.tracker().sendEvent(QBEvents.fromJsonString("ecView", viewJson));
```

# Logging

You can specify which level of logs from SDK do you prefer to print in Logcat. You can do it during initialization (see: [Initialization](#initialization)). The default log level is `WARN`. You can turn off logs by setting `SILENT` log level.