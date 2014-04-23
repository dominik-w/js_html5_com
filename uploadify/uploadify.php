<?php

$targetFolder = 'uploads'; // relative to the root

$verifyToken = md5('unique_salt' . $_POST['timestamp']);

if (!empty($_FILES) && $_POST['token'] == $verifyToken) {
    $tempFile = $_FILES['Filedata']['tmp_name'];
    // $targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
	$targetPath = $targetFolder;
    $targetFile = rtrim($targetPath, '/') . '/' . $_FILES['Filedata']['name'];
	
	$fileParts = pathinfo($_FILES['Filedata']['name']);
    
    // validate the file type - if needed
    // $fileTypes = array('jpg','jpeg','gif','png','txt'); // allowed file extensions
    
    // if (in_array($fileParts['extension'], $fileTypes)) {
        move_uploaded_file($tempFile, $targetFile);
        echo $targetFolder . '/' . $_FILES['Filedata']['name'];
    // } else {
       // echo 'Invalid file type.';
    // }
}

?>