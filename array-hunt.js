$(document).ready(function () {
    var chineseFood = ["bao", "chow-mein", "dumplings", "egg-rolls",
        "fortune-cookies", "fried-rice", "gyoza", "lo-mein", "mapo-tofu",
        "ramen", "shumai", "wonton-soup"];
    var dinosaurs = ["ankylosaurus", "brachiosaurus", "dilophosaurus",
        "pachycelphalosaurus", "pterodactyl", "stegosaurus",
        "styracosaurus", "triceratops", "tyrannosaurus-rex",
        "velociraptor"];
    var solarSystem = ["earth", "jupiter", "luna", "mars", "mercury",
        "neptune", "saturn", "sol", "uranus", "venus"];

    $("#imageSet").change(showAllImages);
    $("#huntButton").click(arrayHunt);

    showAllImages();

    function showAllImages()
    {
        // What image set was selected? This is the directory name
        var directoryName = $("#imageSet").val();
        // Based on the selection, use the correct array
        var arrayOfImagesNames = getSelectedArray();

        // Empty out any children from the div
        var imageDiv = $("#originalArray").empty();

        // Make two rows of images, half in each row
        var half = arrayOfImagesNames.length / 2;
        // How many images are in the current row?
        var count = 0;
        // The current <div class="row">
        var row;

        for (var fileName of arrayOfImagesNames) {
            // Time to make a new row?
            if (count === 0 || count >= half) {
                row = $("<div>").addClass("row");
                imageDiv.append(row);
                count = 0;
            }
            // append a <figure> with the image and its caption
            row.append(createImage(directoryName, fileName));
            count++;
        }

    }

    function createImage(directory, fileName)
    {
        // Create a div with a Bootstrap class
        var col = $("<div>").addClass("col");
        // Create a figure (can have a caption)
        var figure = $("<figure>").addClass("figure");
        col.append(figure);

        // Create the image itself
        var img = $("<img>");
        img.attr("src", `${directory}/${fileName}.png`);
        img.attr("alt", fileName);

        // Add the image to the figure
        figure.append(img);

        // Create a caption
        var caption = $(`<figcaption>${fileName}</figcaption>`)
            .addClass("figure-caption text-center");
        figure.append(caption);

        return col;
    }

    function getSelectedArray()
    {
        // Which image set was selected?
        var selection = $("#imageSet").val();

        // Return the array that corresponds to
        // the selected string
        if (selection === "chinese")
            return chineseFood;
        else if (selection === "solar")
            return solarSystem;
        else if (selection === "dinos")
            return dinosaurs;
    }

    function arrayHunt()
    {
        var myArray = getSelectedArray();

        /*
        Find the first and last string in the array.
        Output them to td#firstLast
         */
        $("td#firstLast").text(myArray[0] + " " +
            myArray[myArray.length - 1]);

        /*
        Find the first string that contains an 'n'.
        Output it to td#firstEnn
         */
        var findN;

        for(var i = 0; i < myArray.length; i++){
            if (myArray[i].includes("n")) {
                findN = myArray[i]
                break;
            }
        }
        $("td#firstEnn").text(findN)

        /*
        Find all of the strings with less than 6 characters.
        Output them to td#lessThanSix
         */
        var lessThanSix = "";

        for(var i = 0; i < myArray.length; i++){
            if (myArray[i].length < 6 ){
                lessThanSix = lessThanSix + " " + myArray[i]
            }
        };
        $("td#lessThanSix").text(lessThanSix);

        /*
        Find the longest string in the array.
        Output it to td#longName
         */
        var longest = "";
        for(var i = 0; i < myArray.length; i++){
            if(myArray[i].length > longest.length){
                longest = myArray[i]
            }
        };
        $("td#longName").text(longest);

        /*
        Find all of the strings that do not contain the letter 's'.
        Output them to td#noEss
         */
        var noS = "";

        for(var i = 0; i < myArray.length; i++){
            if (!myArray[i].includes("s")) {
                noS = noS + " " + myArray[i]
            }
        }
        $("td#noEss").text(noS)

        /*
        Output all of the strings, but with all of their vowels
        in uppercase, to td#upperVowels
         */
        var spongeBobCase =
            myArray.map(
                item =>{
                    var newWord = "";
                    for(var i = 0; i < item.length; i++){
                        if (item.charAt(i) === 'a' || item.charAt(i) === 'e' || item.charAt(i) === 'i' || item.charAt(i) === 'o' || item.charAt(i) === 'u') {
                            newWord = newWord + item.charAt(i).toUpperCase()
                        }
                        else{
                            newWord = newWord + item.charAt(i)
                        }
                    }
                    return newWord;}
            )
        var displaySpongeBob = "";
        for(var i = 0; i < spongeBobCase.length; i++) {
            displaySpongeBob = displaySpongeBob + " " + spongeBobCase[i];
        }
        $("td#upperVowels").text(displaySpongeBob);


        /*
        Output all of the strings in reverse order and separated by
        ' - ' to td#reverseDash
         */
        var displayNew = "";
        var reverseArray = myArray.reverse()
        for(var i = 0; i < reverseArray.length; i++) {
            if(displayNew === "") {
                displayNew = displayNew + reverseArray[i];
            }
            else {
                displayNew = displayNew + " - " + reverseArray[i];
            }
        }

        $("td#reverseDash").text(displayNew)


    }

});