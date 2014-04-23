<!DOCTYPE html>
<html>
<head>
  <title>My Uploader</title>
  <link rel="stylesheet" type="text/css" href="uploadify.css">
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
  <script type="text/javascript" src="jquery.uploadify.min.js"></script>
</head>
<body>
  <h1>Uploadify Test</h1>
  <form>
    <div id="queue"></div>
    <input id="file_upload" name="file_upload" type="file" multiple="true">
  </form>
  
  <script type="text/javascript">
  <?php $timestamp = time(); ?>
  
  $(function() {
    $('#file_upload').uploadify({
      'formData' : {
        'timestamp' : '<?php echo $timestamp; ?>',
        'token'     : '<?php echo md5('unique_salt' . $timestamp); ?>'
      },
      'swf'      : 'uploadify.swf',
      'uploader' : 'uploadify.php',
      
      'onUploadSuccess' : function(file, data, response) {
        alert('The file was saved to: ' + data);
      }
      
    });
  });
  </script>
  
</body>
</html>
