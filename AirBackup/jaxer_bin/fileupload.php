<?php
    
    // nalezy upewnic sie ze ten folder istnieje i skrypt ma prawa zapisu do niego
    $upload_dir = "./uploads/";
    
    $err_state = true;
    
    $temp_file = $_FILES['Filedata']['tmp_name'];
    $file_name = $_FILES['Filedata']['name'];
    $file_size = $_FILES['Filedata']['size'];
    
    // jesli taki istnieje to dodaj UNIX Timestamp do nazwy jako prefix
    $tmp_file_name = "";
    if (file_exists($upload_dir . $file_name)) {
        $tmp_file_name = time() . '_' . $file_name;
        
        if (move_uploaded_file($temp_file, $upload_dir . $tmp_file_name)) {
            $err_state = false;
            // ...
        }
    }
    else {
        if (move_uploaded_file($temp_file, $upload_dir . $file_name)) {
            $err_state = false;
            // ...
        }
    }
    
    if (!$err_state) {
        // upload przebiegl pomyslnie
        echo "Sukces: przechwycono i zabezpieczono pliki.";
    } else {
        echo "Error: upload nie powiodl sie.";        
    }
    
?>
