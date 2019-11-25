import { NativeModules, Platform } from 'react-native';

class QubitSDK {
    private _trackingId: string = null;
    private _logLevel: string = 'WARN';

    /**
     * Setting log level for Qubit tracker
     * @param {'SILENT'|'ERROR'|'WARN'|'INFO'|'DEBUG'|'VERBOSE'} [logLevel='WARN'] Level of logs produced by native SDK.
     * @returns {QubitSDK} Return instance of QubitSDK
     * @example
     *
     * QubitSDK.withLogLevel("DEBUG");
     */
    public withLogLevel(logLevel : 'SILENT'|'ERROR'|'WARN'|'INFO'|'DEBUG'|'VERBOSE') : QubitSDK {
        this._logLevel = logLevel;
        return this;
    }

    /**
     * Setting trackingId for Qubit tracker
     * @param {string} trackingId Tracking id (identifier of application/company etc.)
     * @returns {QubitSDK} Return instance of QubitSDK
     * @example
     *
     * QubitSDK.withLogLevel("qubit");
     */
    public withTrackingId(trackingId : string) : QubitSDK {
        this._trackingId = trackingId;
        return this;
    }

    /**
     * Initialization of SDK. It should be called as early as possible after application start (but after withTrackingId()), only once and before any other interaction with the API.
     * @returns {void} None
     * @example
     *
     * QubitSDK.start();
     */
    public start() {
        if (Platform.OS === 'ios') return;
        NativeModules.QubitSDK.init(this._trackingId, this._logLevel);
    }

    /**
     * Sends event to the server.
     * @param {string} eventType Type of event. eg. ecView
     * @param {object} eventBody Javascript map of any structure
     * @returns {void} None
     * @example
     *
     * QubitSDK.sendEvent("ecView", { "type": "button", "value": "click" });
     */
    public sendEvent(
        eventType : String,
        eventBody : Object
    ) : void {
        if (Platform.OS === 'ios') return;
        NativeModules.QubitSDK.sendEvent(eventType, eventBody);
    }

    /**
     * Enables or disables receiving events.
     * @param {boolean} value true for enabling, false for disabling
     * @returns {void} None
     * @example
     *
     * QubitSDK.enable(false);
     */
    public enable(value: Boolean) {
        if (Platform.OS === 'ios') return;
        NativeModules.QubitSDK.enableTracker(value);
    }

    /**
     * Returns trackingId. Debug purposes.
     * @returns {Promise<string>} Promise with String trackingId.
     * @example
     *
     * async () => {
     *  const trackingId = await QubitSDK.getTrackingId();
     *  ...
     * }
     */
    public getTrackingId() : Promise<String> {
        if (Platform.OS === 'ios') return Promise.reject();
        return NativeModules.QubitSDK.getTrackingId();
    }

    /**
     * Returns device id established by the SDK. Debug purposes.
     * @returns {Promise<string>} Promise with String deviceId.
     * @example
     *
     * async () => {
     *  const deviceId = await QubitSDK.getDeviceId();
     *  ...
     * }
     */
    public getDeviceId() : Promise<String> {
        if (Platform.OS === 'ios') return Promise.reject();
        return NativeModules.QubitSDK.getDeviceId();
    };

    /**
     * Returns current Lookup Data. Debug purposes.
     * @returns {Promise<string>} Promise with object. Although it returns Promise, it returns value only if SDK have these information at the moment of the function call.
     * @example
     *
     * async () => {
     *  const lookupData = await QubitSDK.getLookupData();
     *  ...
     * }
     *
     * { viewNumber: 10,
     *  sessionNumber: 4,
     *  lastViewTs: 1863218003,
     *  ipLocation:
     *   { regionCode: '36004',
     *     region: 'unknown',
     *     longitude: 19.9612,
     *     latitude: 50.0495,
     *     countryCode: 'PL',
     *     country: 'poland',
     *     cityCode: '1803',
     *     city: 'krakow',
     *     areaCode: 'unknown',
     *     area: 'unknown' },
     *  ipAddress: '93.180.179.112',
     *  firstViewTs: 1696635454
     * }
     */
    public getLookupData() : Promise<String> {
        if (Platform.OS === 'ios') return Promise.reject();
        return NativeModules.QubitSDK.getLookupData();
    };

    /**
     * Returns list of Experiences.
     * @param {array<number>} experienceIds List of experiences ids. When array is empty, returns all experiences.
     * @param {boolean} isconstiationSet Is constiation parameter meaningful?
     * @param {number} constiation Meaningful only when isconstiationSet is true?
     * @param {boolean} isPreviewSet Is preview parameter meaningful?
     * @param {boolean} preview Meaningful only when isPreviewSet is true?
     * @param {boolean} isIgnoreSegmentsSet Is ignoreSegments parameter meaningful?
     * @param {boolean} ignoreSegments Meaningful only when isIgnoreSegmentsSet is true?
     * @returns {Promise<array<object>>} Promise with an array of Experiences objects.
     * @example
     *
     * async () => {
     *  const experiences = await QubitSDK.getExperiences([], false, 0, false, false, false, false);
     *  experiences.forEach(e => e.shown());
     *  ...
     * }
     *
     * { constiation: 852190,
     *    payload: {},
     *    isControl: false,
     *    id: 143640,
     *    callback: 'https://sse.qubit.com/v1/callback?data=igKAeyJFeHBlcmllbmNlSWQiOjE0MzY0MCwiSXRlcmF0aW9uARUsMzc2MDY3LCJWYXJpFRUUODUyNzc0HRUUTWFzdGVyATAQODUyMTkBRXBzQ29udHJvbCI6ZmFsc2UsIlRyYWZmaWNBbGxvYwVKTCI6MC40NzUsIlByb2JhYmlsaXR5ARRQODI1NjI2MTk0NTgyNDQ5MSwiUGlkVhkAGFRlbXBsYXQFvwxudWxsBWZMY2tpbmdJZCI6Im1pcXVpZG8iLCIBjQhleHQFFkQ4MmFjYzNiY2FiYmNhYzM2In0='
     *  },
     * { constiation: 855620,
     *    payload: { show_share: false,
     *      show_sale_banner: false,
     *      sale_banner: 'https://dd6zx4ibq538k.cloudfront.net/static/images/5010/626263d0b3d3230f4062da1e0d1395ad_1300_554.jpeg',
     *     free_shipping: 'Shipping is free for you!' },
     *    isControl: false,
     *    id: 144119,
     *    callback: 'https://sse.qubit.com/v1/callback?data=jAKAeyJFeHBlcmllbmNlSWQiOjE0NDExOSwiSXRlcmF0aW9uARUsNDUyOTEwLCJWYXJpFRUYMTAxMDcyMh0WFE1hc3RlcgExmDg1NTYyMCwiSXNDb250cm9sIjpmYWxzZSwiVHJhZmZpY0FsbG9jYQFgSCI6MC4yNSwiUHJvYmFiaWxpdHkBE2A0ODAwMTM4OTg0MjEwNjM3MywiUGlkIjowThoAGFRlbXBsYXQFwQxudWxsBWdMY2tpbmdJZCI6Im1pcXVpZG8iLCIBjghleHQFFkQ4MmFjYzNiY2FiYmNhYzM2In0='
     *  },
     * { constiation: 972984,
     *    payload: {},
     *    isControl: true,
     *    id: 160862,
     *    callback: 'https://sse.qubit.com/v1/callback?data=iQKAeyJFeHBlcmllbmNlSWQiOjE2MDg2MiwiSXRlcmF0aW9uARUsNDM0NjIzLCJWYXJpFRUUOTcyOTg0HRUUTWFzdGVyATARG3BJc0NvbnRyb2wiOnRydWUsIlRyYWZmaWNBbGxvYwVJRCI6MC41LCJQcm9iYWJpbGl0eQESVDAzNjQzMTAyMTQ3MTU5ODkyLCJQaWRaGgAYVGVtcGxhdAW-DG51bGwFZhBja2luZwGLKCJtaXF1aWRvIiwiAYwIZXh0BRZEODJhY2MzYmNhYmJjYWMzNiJ9'
     *  }
     * ]
     */
    public getExperiences(
        experienceIds: Array<Number>,
        isconstiationSet: Boolean,
        constiation: Number,
        isPreviewSet: Boolean,
        preview: Boolean,
        isIgnoreSegmentsSet: Boolean,
        ignoreSegments: Boolean
    ) : Promise<Object[]> {
        return new Promise((resolve, reject) => {
            if (Platform.OS === 'ios') reject();
            NativeModules.QubitSDK.getExperiences(experienceIds, isconstiationSet, constiation, isPreviewSet, preview, isIgnoreSegmentsSet, ignoreSegments)
                .then(experiences => resolve(experiences.map(e => ({...e, shown: () => { NativeModules.QubitSDK.experienceShown(e)} }))))
                .catch(reject)
        })

    }
}

export default new QubitSDK();