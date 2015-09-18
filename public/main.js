$(document).ready(function(){
    
    var data;
    
    // Person Requests
    $('#person-id').on('click', function(){
        $.ajax({
            method: 'GET',
            headers: { 
                "Authorization" : "Bearer bbda8f24-c8a0-443a-95ca-05d403be6805",
                "Content-Type" : "application/json"
            },
            url: 'https://dev-api.rach.io/1/public/person/info',
            success: function(returnData) {
                $('#person-id').prev().text(returnData.id);
            }
        });
    });

    $('#person-data').on('click', function(){
        $.ajax({
            method: 'GET',
            headers: { 
                "Authorization" : "Bearer bbda8f24-c8a0-443a-95ca-05d403be6805",
                "Content-Type" : "application/json"
            },
            url: 'https://dev-api.rach.io/1/public/person/a70f3c0d-a5f7-472b-b183-464c4d0b12d0',
            success: function(returnData) {
                // Store all the data to access devices and zones later
                data = returnData;
                $('#person-data').prev().text(returnData.fullName);
                console.log('The person data', returnData);
            }
        });
    });

    // Stop Watering on Device
    // Device Name: V17140126
    $('#stop-watering').on('click', function(){
        $.ajax({
            method: 'PUT',
            headers: { 
                "Authorization" : "Bearer bbda8f24-c8a0-443a-95ca-05d403be6805",
                "Content-Type" : "application/json"
            },
            data: '{ "id" : "598d8c03-c4f2-4216-b66d-abdfb59382d2" }',
            url: 'https://dev-api.rach.io/1/public/device/stop_water',
            success: function(returnData) {
                $('#stop-watering').prev().text('Stopped Watering!');
            }
        });
    });
    
    
    // Start Zone 8
    $('#zone-8-start').on('click', function(){
        // Zone 8 ID: de43a696-5e30-4556-bbaa-66517984274e
        $.ajax({
            method: 'PUT',
            headers: { 
                "Authorization" : "Bearer bbda8f24-c8a0-443a-95ca-05d403be6805",
                "Content-Type" : "application/json"
            },
            data: '{ "id" : "988066a6-05ba-4c8d-87eb-92588871da01", "duration" : 30 }',
            url: 'https://dev-api.rach.io/1/public/zone/start',
            success: function(returnData) {
                $('#zone-8-start').prev().text('Started Zone 8!');
            }
        });
    });

    
    // Start all zones
    var zones = [];
    
    var getZones = function() {
        // The return data from #person-data request
        data.devices[0].zones.forEach(function(zone, index){
            zones.push({
                "id" : zone.id,
                "duration" : 10,
                "sortOrder" : index
            })
        }); 
        
        return JSON.stringify(zones);
    }
    
    $('#all-zones-start').on('click', function(){
        $.ajax({
            method: 'PUT',
            headers: { 
                "Authorization" : "Bearer bbda8f24-c8a0-443a-95ca-05d403be6805",
                "Content-Type" : "application/json"
            },
            data: '{ "zones" : ' + getZones() + '}',
            url: 'https://dev-api.rach.io/1/public/zone/start_multiple',
            success: function(returnData) {
                $('#all-zones-start').prev.text('All Zones Started');
            }
        });
    });

});