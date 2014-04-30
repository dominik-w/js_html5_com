<?php
/** 
 * by http://javascript-html5-tutorial.com/ 
 */

if (isset($_POST["filecode"])) {
    // $imageData = $GLOBALS['HTTP_RAW_POST_DATA'];
    $imageData = $_POST["filecode"];
    
    // cleanups
    $filteredData = substr($imageData, strpos($imageData, ",") + 1);
    
    // decode right data
    $unencodedData = base64_decode($filteredData);
    
    // output
    $fp = fopen("tests/file_jpg.jpg", "wb");
    fwrite($fp, $unencodedData);
    fclose($fp);
}
/* else {
    $data = explode(";", $_SERVER["QUERY_STRING"]);
    $type = $data[0];
    $data = explode(",", $data[1]);
    
    // file_put_contents("zx-test.jpg", base64_decode($data[1]));
    
    $img = imagecreatefromstring(base64_decode($data[1]));
    if ($img) {
        imagesavealpha($img, true);
        imagejpeg($img, 'new_image.jpeg'); // !
        imagedestroy($img);
    }
}
*/

?>