<html lang="en">
<head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script type="text/javascript" src="jsmanipulate.min.js"></script>
    <script type="text/javascript" src="base64.js"></script>
    <script type="text/javascript" src="canvas2image.js"></script>
    
    <!--[if lt IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>JSManipulate</title>
</head>

<body>
    <div id="wrapper">
        <canvas id="cnv" width="200" height="200"></canvas>
        <br /><br />
        <div id="tb"><button onclick="testing()">Test</button></div>
    </div>
    
    <script>
    // setup
    var canvas = document.getElementById('cnv');
    
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        
        // example with loaded image
        
        var img = new Image();
        img.src = 'input.jpg';
        context.drawImage(img, 0, 0, 200, 200);
        
        // some operations USING jsmanipulate librarry
        var data = context.getImageData(0, 0, canvas.width, canvas.height);
        JSManipulate.lensdistortion.filter(data, {refraction: 3.0, radius: 75});
        context.putImageData(data, 0, 0);
    } else {
        alert('Error in canvas context loading. Which browser you have?');
    }
    
    // handler
    function testing() {
        
        // save data as jpg "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA..."
        var strDataJpg = canvas.toDataURL("image/jpeg");
        // alert(strDataJpg);
        
        var my_url = "processor_jpg.php";
        
        $.ajax({
            type: "POST",
            url: my_url,
            data: { filecode: strDataJpg }
        }).done(function(msg) {
            alert("JPG file saved!");
        });
    }
    </script>
    
</body>
</html>
