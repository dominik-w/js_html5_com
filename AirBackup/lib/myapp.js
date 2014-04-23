/**
 * AirBackup 1.1
 * (c) Dominik Wlazłowski
 * www.javascript-html5-tutorial.pl
 */

/** config **/

// adres docelowy
const SERVER_URL = "http://www.directcode.eu/airbackup/processor.php";

// maksymalna ilość plików, jaką możemy wysłać jednorazowo
const FILES_MAX_AMOUNT = 10;

/** koniec: config **/

$(document).ready(function() {
    // przeciąganie okna chwytając za element top-bar
    $("#top-bar").mousedown(function() {
        window.nativeWindow.startMove();
    });
    
    // zamykanie aplikacji
    $("#app-close").click(function() {
        window.nativeWindow.close();
        return false;
    });
});

// nazwy plików
var backupFileNames = new Array();

// tablica obiektów typu File
var backupFiles = new Array();

// funkcje obsługi zdarzeń

function handleDragEnter(event) {
    event.preventDefault();
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    
    // kontrola ilości plików do jednorazowego wysłania
    if (backupFiles.length >= FILES_MAX_AMOUNT) {
        alert('Wyślij bieżące pliki. Limit jednego pakietu wynosi '
            + FILES_MAX_AMOUNT);
        
        return;
    }
    
    // budujemy listę plików
    var fileList = event.dataTransfer.getData(air.ClipboardFormats.FILE_LIST_FORMAT);
    
    for (var i in fileList) {
        if ($.inArray(fileList[i].name, backupFileNames) == -1) {
            backupFileNames.push(fileList[i].name);
            backupFiles.push(fileList[i]);
            $("#files ul").append('<li>' + fileList[i].name + '</li>');
        }
    }
    
    showFilesInfo();
}

// koniec: funkcje obsługi zdarzeń

// wyświetlanie informacji o plikach
function showFilesInfo() {
    if ($("#info").length == 0) {
        $("#top-bar").after('<div id="info"></div>');
    }
    else {
        $("#info").empty();
    }
    
    var _size = getTotalFileSize() / 1024; // kB
    
    // formatuj do 2 miejsc po przecinku
    var _formatted_size = (Math.floor(_size * 100)) / 100;
    
    $("#info")
        .append("Liczba plików: " + backupFiles.length + "<br />")
        .append("Sumaryczny rozmiar plików: " + _formatted_size + " kB");
}

// obliczanie rozmiaru dodanych plików
function getTotalFileSize() {
    var sum = 0;
    
    for (var i in backupFiles) {
        sum += backupFiles[i].size;
    }
    
    return sum;
}

// funkcja wykonująca upload plików na serwer
function startUpload() {
    
    if (backupFiles.length == 0) {
        alert('Brak plików do wysłania na serwer.');
        return;
    }
    
    var boundary = '--AaB03x';
    var request = null;
    var file = null;
    
    // nowe żądanie
    request = new air.URLRequest(SERVER_URL);
     
    // debug: obsłuż błędny adres skryptu odbierającego dane
    /*
    try {
        request = new air.URLRequest(SERVER_URL);
    } catch (e) {
       // runtime.trace('Proszę sprawdzić czy stała SERVER_URL określa poprawny adres skryptu');
    }
    finally {
        doCleanups();
    }
    */
    
    request.useCache = false;
    request.contentType = 'multipart/form-data, boundary=' + boundary;
    request.method = 'POST';
    
    var buffer = new air.ByteArray();
    
    // pokaż indicator
    $("#progress_pointer").show();
    
    // przetwórz listę plików
    for (x in backupFiles) {
        
        file = new air.File(backupFiles[x].nativePath);
        
        fileStream = new air.FileStream();
        fileStream.open(file, air.FileMode.READ);
        fileContents = new air.ByteArray();
        fileStream.readBytes(fileContents, 0, file.size);
        fileStream.close();
        
        buffer.writeUTFBytes("--" + boundary + "\r\n");
        buffer.writeUTFBytes("content-disposition: form-data; name=\"Filedata\"; filename=\"" + file.name + "\"\r\n");
        buffer.writeUTFBytes("Content-Transfer-Encoding: binary\r\n");
        buffer.writeUTFBytes("Content-Length: " + file.size + "\r\n");
        buffer.writeUTFBytes("Content-Type: application/octet-stream\r\n");
        buffer.writeUTFBytes("\r\n");
        
        buffer.writeBytes(fileContents, 0, fileContents.length);
        buffer.writeUTFBytes("\r\n--" + boundary + "--\r\n");
        
        request.data = buffer;
        
        var loader = new air.URLLoader();
        
        loader.addEventListener(air.ProgressEvent.PROGRESS, function(e) {
           // alert('progress: ' + e);
        });
        
        loader.addEventListener(air.IOErrorEvent.IO_ERROR, function(e) {
            alert('error: ' + e.text);
        });
        
        loader.addEventListener(air.Event.COMPLETE, function(e) {
            if (loader.data) {
                alert(loader.data);
                doCleanups();
            }
        });
        
        loader.load(request);
    }
}

// czyszczenie
function doCleanups() {
    $("#progress_pointer").hide();
    
    backupFileNames = [];
    backupFiles = [];
    
    $("#files").empty();
    $("#info").empty();
}

