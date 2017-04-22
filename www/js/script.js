(function() {
    window.onload = function() {
        init();
    }
})();

function init() {
    document.addEventListener('deviceready', onDeviceReady, false);
}


function onDeviceReady() {
    navigator.notification.alert('Dzialam');
    checkConnection(); // internet
   
    var track_button = document.getElementById('track');
    var slug = 'dhl';
    track_button.addEventListener('click', function() {
    
    var xhr = new XMLHttpRequest();
    
    var url = 'http://zeenek.webd.pl/aftership2/lib/test/xhr.php';
    
    t_number = document.getElementById('tracking_number').value;
    
    var data = 'track_number='+t_number;
    
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('status').innerHTML = xhr.responseText;
            track();
        }
    }
    
    xhr.send(data);
    document.getElementById("status").innerHTML = 'szukam...';
    
    });
    
    
    
    
    
    
// funckcja do odbierania danych o przesylce
function track() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.aftership.com/v4/trackings/'+slug+'/'+t_number, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('aftership-api-key', '07183679-df7c-4c64-b7d5-4cef43e0deca');

    xhr.onload = function() {
        if(xhr.status === 200) {
            console.log(' works? : ' + xhr.responseText);
            
            var myObj = JSON.parse(xhr.responseText);
            var carrier = myObj.data.tracking.slug;
            var tag = myObj.data.tracking.tag;
            
            var status = 'Dostawca: '+carrier+', Stan: '+tag;
            document.getElementById('show').innerHTML = status;
        }
        else {
            console.log('DOESN NOT WORK!' + xhr.status);
        }
    }
    xhr.send();
     document.getElementById("show").innerHTML = 'szukam statusu...';
}
    
}




    






// sprawdzamy połaczenie z internetem
function checkConnection() {
    var networkState = navigator.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if(networkState == Connection.NONE) {
        navigator.notification.alert(states[networkState].toUpperCase() + '\n You can not track parcels');
    }
}