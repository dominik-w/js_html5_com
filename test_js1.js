
/**
 * Test - JS
 * 
 * by javascript-html5-tutorial.com
 */

function getCarData() {

    var myCar = {
        name: "VW",
        model: "Bora",
        power_hp: 110,
        getColor: function () {
            // ...
        }
    };
    
    alert(myCar.hasOwnProperty('constructor')); // false
    alert(myCar.hasOwnProperty('getColor')); // true
    alert(myCar.hasOwnProperty('megaFooBarNonExisting')); // false

    if (myCar.hasOwnProperty('power_hp')) {
        alert(typeof(myCar.power_hp)); // number
    }
}

getCarData();
