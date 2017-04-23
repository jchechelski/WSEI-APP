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
    document.getElementById("status").innerHTML = 'SZUKAM NUMERU... <br> <img src="img/load.png" class="load">';
    
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
            for(var i=check_ile-1; i>0; i--) {
                var czas = check[i].checkpoint_time; 
                var kraj = (check[i].country_name) ? check[i].country_name : 'Nieznany';
                wiadomosc += 'Data: '+czas.slice(0,10)+'<br>Godzina: '+czas.slice(11,16)+'<br>Dostawca: '+check[i].slug+'<br>Status :'+check[i].tag+'<br>Kraj: '+kraj+'<br>Wiadomość: '+check[i].message+'<hr>';
            }
            
            document.getElementById('show').innerHTML = wiadomosc;
            
            var showButtons = document.getElementById('showButtons');
            showButtons.style.display = 'block';
            
            // kuniec
            
            
            
            //dodaje do local storage historie wyszukiwan
            
                var ile = logJSON.dost.length;
                logJSON.his[ile] = t_number;
                localStorage.setItem('logi', JSON.stringify(logJSON));
            
        }
        else {
            document.getElementById('show').innerHTML = 'PODANY NUMER NIE ISTNIEJE LUB CHWILOWO NIE DOSTĘPNE';
        }
    }
    xhr.send();
    document.getElementById('show').innerHTML = 'SZUKAM STATUSU...<br> <img src="img/load.png" class="load">';
    // koniec funkcji
    
}
   
    
    
    
    // JSON storage
    // guziki 
var dostarczoneButton = document.getElementById('dostarczoneButton'),
    oczekujaceButton = document.getElementById('oczekujaceButton');

    //oczekujace
var oczekujaceTab = document.getElementById('oczekujaceLink'),
    pokazOczek = document.getElementById('pokazOczek');
    
    //dostarczone
var dostarczoneTab = document.getElementById('dostarczoneLink'),
    pokazDost = document.getElementById('pokazDost');
    
    //historia
var historiaTab = document.getElementById('historiaLink'),
    pokazHist = document.getElementById('pokazHist');
    
    
    
var logJSON = {
    his : [{
        
    }],
    dost : [{
        
    }],
    oczek : [{
        
    }]
}


dostarczoneButton.addEventListener('click', function() {
    var ile = logJSON.dost.length;
    logJSON.dost[ile] = t_number;
    localStorage.setItem('logi', JSON.stringify(logJSON));
    alert('DODANO DO DOSTARCZONYCH');
    
});


oczekujaceButton.addEventListener('click', function() {
    var ile = logJSON.oczek.length;
    logJSON.oczek[ile] = t_number;
    localStorage.setItem('logi', JSON.stringify(logJSON));
    alert('DODANO DO OCZEKUJĄCYCH');

});
  

// pokazywanie
oczekujaceTab.addEventListener('click', function() {
    var ile = logJSON.oczek.length;

    localStorage.setItem('logi', JSON.stringify(logJSON));
    
        var retrievedObject = localStorage.getItem('logi');
        var sklej = '';
        for(var i=ile-1; i>0; i--) {
            
            sklej += JSON.parse(retrievedObject).oczek[i] + '<br>'; 
        }
    pokazOczek.innerHTML = sklej;
    
});
    
dostarczoneTab.addEventListener('click', function() {
    var ile = logJSON.dost.length;

    localStorage.setItem('logi', JSON.stringify(logJSON));
    
        var retrievedObject = localStorage.getItem('logi');
        var sklej = '';
        for(var i=ile-1; i>0; i--) {
            
            sklej += JSON.parse(retrievedObject).dost[i] + '<br>'; 
        }
    pokazDost.innerHTML = sklej;
    
});
    
historiaTab.addEventListener('click', function() {
    var ile = logJSON.his.length;

    localStorage.setItem('logi', JSON.stringify(logJSON));
    
        var retrievedObject = localStorage.getItem('logi');
        var sklej = '';
        for(var i=ile-1; i>0; i--) {
            
            sklej += JSON.parse(retrievedObject).his[i] + '<br>'; 
        }
    pokazHist.innerHTML = sklej;
    
});

    // koniec JSON storage
    
    
    // funkcja do usuwanie danych ze storage
    

    
    

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