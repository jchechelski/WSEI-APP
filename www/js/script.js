(function() {
    window.onload = function() {
        init();
    }
})();

function init() {
    document.addEventListener('deviceready', onDeviceReady, false);
}


function onDeviceReady() {
    checkConnection(); // internet
    
    
    
    
    
    
    
    
         // pobieramy i zaznaczamy wybranego dostawce
    var img = document.getElementsByTagName('img');
    var dalej = document.getElementById('dalej');
    var slug_mini = document.getElementById('slug_mini');
    for(var i=0; i<img.length; i++){
        img[i].addEventListener('click', function() {
            slug = this.id;
            dalej.style.display = 'block';
            slug_mini.innerHTML = '<img src="img/'+slug+'.png" class="slug_mini">';
            
            for(var z=0; z<img.length; z++){
                img[z].style.border = 'none';
                img[z].style.borderRadius = '0';
            }
            
            this.style.border = '10px solid white';
            this.style.borderRadius = '20px';
        });
    } 
    
    // koniec 
    
    
    
    
    var track_button = document.getElementById('track');
    slug = '';
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
        } else {
            document.getElementById('status').innerHTML = '';
            track();
        }
    }
    
    xhr.send(data);
    document.getElementById("status").innerHTML = 'SZUKAM NUMERU...';
    
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
            // sprawdzenie punktow
            var check_ile = myObj.data.tracking.checkpoints.length;
            var check = myObj.data.tracking.checkpoints;
            wiadomosc = '';
            for(var i=0; i<check_ile; i++) {
                wiadomosc += 'Data: '+check[i].checkpoint_time+'<br>Dostawca: '+check[i].slug+'<br>Status :'+check[i].tag+'<br>Kraj: '+check[i].country_name+'<br>Wiadomość: '+check[i].message+'<hr>';
            }
            
            document.getElementById('show').innerHTML = wiadomosc;
            // kuniec
        }
        else {
            document.getElementById('show').innerHTML = 'PODANY NUMER NIE ISTNIEJE LUB CHWILOWO NIE DOSTĘPNE';
        }
    }
    xhr.send();
    document.getElementById('show').innerHTML = 'SZUKAM STATUSU';
    // koniec funkcji
    
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