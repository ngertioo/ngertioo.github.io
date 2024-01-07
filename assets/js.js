// Start js for index
function removeTwinLast(inputs) {
        var numbersArray = inputs;

    var resultArray = numbersArray.map(function (number) {
        var lastTwoDigits = number % 100;
        var uniqueDigits = [...new Set(lastTwoDigits.toString().split(''))];
        return uniqueDigits.length === 2 ? number : null;
    });

    resultArray = resultArray.filter(Boolean);

    var resultString = resultArray.join(':');
    return resultArray;
}

function removeTwin(inputs){
    var numbersArray = inputs;
    var resultArray = numbersArray.map(function (number) {
        var uniqueDigits = [...new Set(number)];
        return uniqueDigits.length === number.length ? number : '';
    });
    resultArray = resultArray.filter(Boolean);
    var resultString = resultArray.join(':');
    return resultArray;
}

function processInput() {
    var inputText = document.getElementById("inputString").value;
    if(inputText === ''){
        pesan = 'No No';
        document.getElementById('title-result').textContent = pesan;
    }else{
    var inputArray = inputText.match(/\d+/g).map(function (numberString) {
    return Number(numberString).toString().padStart(numberString.length, '0');
    });
    var filteredArray = inputArray.filter(function(element) {
        return element !== "";
    });

    var selectedRemove = document.getElementById("removeStatus").value;
    if(selectedRemove === "noremove"){
        var filteredArray = inputArray;
        var statusTwin = "Twin";
    }else if(selectedRemove === "removetwinall"){
        var filteredArray = removeTwin(inputArray);
        var statusTwin = "Twin";
    }else if(selectedRemove === "removetwinlast"){
        var filteredArray = removeTwinLast(inputArray);
        var statusTwin = "Twin";
    }

    var selectedGroup = document.getElementById("selected_group").value;

    var groupA = [1, 2, 3, 4, 5, 6, 13, 14, 15, 16, 17, 18, 25, 26, 27, 28, 29, 30, 37, 38, 39, 40, 41, 42];
    var groupB = [49, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 66, 73, 74, 75, 76, 77, 78, 85, 86, 87, 88, 89, 90, 97, 98, 99, 0];
    var groupC = [7, 8, 9, 10, 11, 12, 19, 20, 21, 22, 23, 24, 31, 32, 33, 34, 35, 36, 43, 44, 45, 46, 47, 48];
    var groupD = [55, 56, 57, 58, 59, 60, 67, 68, 69, 70, 71, 72, 79, 80, 81, 82, 83, 84, 91, 92, 93, 94, 95, 96];

    splittedArray = filteredArray.filter(function (value) {
        var lastTwoDigits = parseInt(value.slice(-2), 10);

        if (selectedGroup === "A" && groupA.includes(lastTwoDigits)) {
            return false;
        } else if (selectedGroup === "B" && groupB.includes(lastTwoDigits)) {
            return false;
        } else if (selectedGroup === "C" && groupC.includes(lastTwoDigits)) {
            return false;
        } else if (selectedGroup === "D" && groupD.includes(lastTwoDigits)) {
            return false;
        }
        return true;
    });

    var urut = splittedArray.sort();
    var resultText = urut.join('*');
    totalResult = splittedArray.length;
    document.getElementById("status-twin").textContent = statusTwin; 
    document.getElementById("title-result").textContent = "Total Result : " + totalResult; 

    createTable(splittedArray);
    
    var cpyres = document.getElementById("textToCopy");
    readyToCopy = splittedArray.join('*');
    
    var cpybtn = document.getElementById("status-twin");
    createCopyButton(cpybtn, 'Copy', copytextnow);
    var copyButtonsContainer = document.getElementById('copyMore400');
    copyButtonsContainer.innerHTML = "";
    if(totalResult > 400){
        // createCopyButton(cpybtn, 'Manual', goManual);
        // Create Copy per 400
        var maxCombinations = 400;

        // Membagi data array ke dalam kelompok-kelompok sesuai dengan batas maksimum
        for (var i = 0; i < urut.length; i += maxCombinations) {
            var buttonData = urut.slice(i, i + maxCombinations);
            
            // Definisikan indeks
            var indexButton = buttonData.length;

            // Membuat tombol copy
            var copyButton = document.createElement('button');
            copyButton.textContent = `Copy ${indexButton}`;
            copyButton.classList.add('copy-button');
            copyButton.setAttribute("type", "button");
            copyButton.addEventListener('click', function() {
                copyToClipboardPer400(buttonData.join('*'));
            });
            
            // Menambahkan tombol copy ke dalam kontainer
            copyButtonsContainer.appendChild(copyButton);
        }
    }
}
}

// Fungsi untuk menyalin teks ke clipboard
function copyToClipboardPer400(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Text Copied');
}

function createCopyButton(divv, names, fnct) {
    var copyButton = document.createElement("button");
    copyButton.innerText = names;
    copyButton.classList.add('copy-button');
    copyButton.id = "copy-button";
    copyButton.setAttribute("type", "button");
    copyButton.addEventListener("click", fnct); // Attach the copy function to the button
    divv.appendChild(copyButton);
}

function goManual(){
    var data = document.getElementById("inputString").value;
    localStorage.setItem('myVariable', data);

    // Redirect to receiver page
    window.location.href = 'manual.html';
}

function copytextnow() {
    var isi = readyToCopy;
    var temp = document.createElement("textarea");
    var change = document.getElementById("copy-button"); 
    temp.value = isi;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    //alert("Copied Text: " + temp.value);
    change.innerText = 'Copied';
}

function createTable(dataArray) {
    var strdt = dataArray[0];
    var ldt = strdt.length;
    if(ldt === 4){
        size = '11px';
    } else if (ldt === 3){
        size = '13px';
    } else if (ldt === 2){
        size = '22px';
    }


    var tableContainer = document.getElementById("outputTable");
    var tableHTML = "<table>";

    for (var i = 0; i < dataArray.length; i++) {
        if (i % 10 === 0) {
            tableHTML += "<tr>";
        }
        tableHTML += "<td style='font-size: "+size+";''>" + dataArray[i] + "</td>";
        if (i % 10 === 9 || i === dataArray.length - 1) {
            tableHTML += "</tr>";
        }
    }
    tableHTML += "</table>";
    tableContainer.innerHTML = tableHTML;
}
// End js for index

//Start For Exec
function copyToClipboard() {
    var isi = document.getElementById("textToCopy").value;
    var temp = document.createElement("textarea");
    temp.value = isi;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("Teks berhasil disalin: " + temp.value);
}

function autoFillTextArea() {
    var textAreaElement = document.getElementById('inputString');
    var predefinedText = "00 : 01 : 02 : 03 : 04 : 05 : 06 : 07 : 08 : 09 : 10 : 11 : 12 : 13 : 14 : 15 : 16 : 17 : 18 : 19 : 20 : 21 : 22 : 23 : 24 : 25 : 26 : 27 : 28 : 29 : 30 : 31 : 32 : 33 : 34 : 35 : 36 : 37 : 38 : 39 : 40 : 41 : 42 : 43 : 44 : 45 : 46 : 47 : 48 : 49 : 50 : 51 : 52 : 53 : 54 : 55 : 56 : 57 : 58 : 59 : 60 : 61 : 62 : 63 : 64 : 65 : 66 : 67 : 68 : 69 : 70 : 71 : 72 : 73 : 74 : 75 : 76 : 77 : 78 : 79 : 80 : 81 : 82 : 83 : 84 : 85 : 86 : 87 : 88 : 89 : 90 : 91 : 92 : 93 : 94 : 95 : 96 : 97 : 98 : 99";
    textAreaElement.value = predefinedText;
}

function generateCombination() {
    var num1 = document.getElementById('num1').value;
    var num2 = document.getElementById('num2').value;
    var num3 = document.getElementById('num3').value;
    var num4 = document.getElementById('num4').value;
    var digit2 = document.getElementById('digit2').checked;
    var digit3 = document.getElementById('digit3').checked;
    var digit4 = document.getElementById('digit4').checked;
    var bb3 = document.getElementById('bb3').checked;
    var bb2 = document.getElementById('bb2').checked;
    var bb4 = document.getElementById('bb4').checked;

    num1 = num1.replace(/\s/g, '').replace(/\D/g, '');
    num2 = num2.replace(/\s/g, '').replace(/\D/g, '');
    num3 = num3.replace(/\s/g, '').replace(/\D/g, '');
    num4 = num4.replace(/\s/g, '').replace(/\D/g, '');

    var ress = '';

    if (digit2) {
        for (var i = 0; i < num2.length; i++) {
            for (var j = 0; j < num1.length; j++) {
                ress += num2[i] + num1[j] + ' : ';
            }
        }
    }
    
    if (digit3) {
        for (var i = 0; i < num3.length; i++) {
            for (var j = 0; j < num2.length; j++) {
                for (var k = 0; k < num1.length; k++) {
                    ress += num3[i] + num2[j] + num1[k] + ' : ';
                }
            }
        }
    }

    if (digit4) {
        for (var i = 0; i < num4.length; i++) {
            for (var j = 0; j < num3.length; j++) {
                for (var k = 0; k < num2.length; k++) {
                    for (var l = 0; l < num1.length; l++) {
                        ress += num4[i] + num3[j] + num2[k] + num1[l] + ' : ';
                    }
                }
            }
        }
    }

    if (bb4) {
        function generateHelper(current, remaining, combinations) {
            if (current.length === 4) {
                combinations.push(current);
                return;
            }

            for (var i = 0; i < remaining.length; i++) {
                generateHelper(current + remaining[i], remaining.slice(0, i) + remaining.slice(i + 1), combinations);
            }
        }

        var combinations = [];
        generateHelper('', num1, combinations);

        for (var j = 0; j < combinations.length; j++) {
            ress += combinations[j] + ' : ';
        }
    }

    if (bb3) {
        function generateHelper(current, remaining, combinations) {
            if (current.length === 3) {
                combinations.push(current);
                return;
            }

            for (var i = 0; i < remaining.length; i++) {
                generateHelper(current + remaining[i], remaining.slice(0, i) + remaining.slice(i + 1), combinations);
            }
        }

        var combinations = [];
        generateHelper('', num1, combinations);

        for (var j = 0; j < combinations.length; j++) {
            ress += combinations[j] + ' : ';
        }
    }

    if (bb2) {
        function generateHelper(current, remaining, combinations) {
            if (current.length === 2) {
                combinations.push(current);
                return;
            }

            for (var i = 0; i < remaining.length; i++) {
                generateHelper(current + remaining[i], remaining.slice(0, i) + remaining.slice(i + 1), combinations);
            }
        }

        var combinations = [];
        generateHelper('', num1, combinations);

        for (var j = 0; j < combinations.length; j++) {
            ress += combinations[j] + ' : ';
        }
    }

    document.getElementById('inputString').value = ress;
}

$(document).ready(function() {
        $("#kirim").click(function() {
            var inputString = $("#inputString").val();
            var selected_group = $("#selected_group").val();
            var removetwin = [];
            $('.value1').each(function() {
                if ($(this).is(":checked")) {
                    removetwin.push($(this).val());
                }
            });
            removetwin = removetwin.toString();

            $.ajax({
                type: "POST",
                url: "exec.php",
                data: {
                    inputString: inputString,
                    selected_group: selected_group,
                    removetwin: removetwin
                }, // Data yang akan dikirim ke server
                success: function(response) {
                    $("#respons").html(response);
                }
            });
        });
    });

function dailyCetak() {
    // Isi keempat variabel sebagai array
    var var1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var var2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var var3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var var4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Ambil nilai dari elemen input
    var inputText = document.getElementById("dailyInput").value;

    // Memisahkan masing-masing karakter dari inputText dan mengonversi ke dalam array
    var inputArray = inputText.split("").map(Number);

    // Menghilangkan angka yang sesuai di setiap variabel
    var1 = var1.filter(function(value) { return value !== inputArray[0]; });
    var2 = var2.filter(function(value) { return value !== inputArray[1]; });
    var3 = var3.filter(function(value) { return value !== inputArray[2]; });
    var4 = var4.filter(function(value) { return value !== inputArray[3]; });

    // Mengkombinasikan variabel untuk menciptakan angka empat digit
    var hasilKombinasi = document.getElementById("inputString");
    for (var i = 0; i < var1.length; i++) {
    for (var j = 0; j < var2.length; j++) {
        for (var k = 0; k < var3.length; k++) {
        for (var l = 0; l < var4.length; l++) {
            var angkaEmpatDigit = "" + var1[i] + var2[j] + var3[k] + var4[l] + ' : ';
            hasilKombinasi.value += angkaEmpatDigit;
        }
        }
    }
    }
}

function showHelper(){
	var showImages = document.getElementById('showImages');
    if(showImages.style.display === "none"){
        showImages.style.display = "block";
    }else{
        showImages.style.display = "none";
    }
}

function startFunction(){
    ajaxYesterday();
}
// End for Exec 
// Start JS FOR Manual
$(document).ready(function() {
    $("#kirimmanual").click(function() {
        var data = $("#data").val();
        var a = $("#a").val();
        var b = $("#b").val();
        var c = $("#c").val();

        $.ajax({
            type: "POST",
            url: "exec-man.php",
            data: {
                data: data,
                a: a,
                b: b,
                c: c
            },
            success: function(response) {
                $("#respons").html(response);
            }
        });
    });
});
$(document).ready(function() {
    $("#gasss").click(function() {
        var data = $("#data").val();

        $.ajax({
            type: "POST",
            url: "exec-man400.php",
            data: {
                data: data,
            },
            success: function(response) {
                $("#respons").html(response);
            }
        });
    });
});

// End JS For Manual

// Start for Daily
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function dailyCetak() {
    
    // Menghilangkan semua element
    var hiddenDiv = document.getElementById('hidden-div');
    hiddenDiv.style.display = 'block';
    // Isi keempat variabel sebagai array
    var var1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var var2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var var3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var var4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    shuffleArray(var1);
    shuffleArray(var2);
    shuffleArray(var3);
    shuffleArray(var4);
    var results = "";
    var totals = "";
    // Ambil nilai dari elemen input
    var inputText = document.getElementById("dailyInput").value;
    // Memisahkan masing-masing karakter dari inputText dan mengonversi ke dalam array
    var inputArray = inputText.split("").map(Number);
    var intvl = 120;

    // Menghilangkan angka yang sesuai di setiap variabel
    var1 = var1.filter(function(value) { return value !== inputArray[0]; });
    var2 = var2.filter(function(value) { return value !== inputArray[1]; });
    var3 = var3.filter(function(value) { return value !== inputArray[2]; });
    var4 = var4.filter(function(value) { return value !== inputArray[3]; });

    vars1 = var1; 
    vars2 = var2;
    vars3 = var3;
    vars4 = var4;
    // Mengkombinasikan variabel untuk menciptakan angka empat digit
    for (var i = 0; i < var1.length; i++) {
    for (var j = 0; j < var2.length; j++) {
        for (var k = 0; k < var3.length; k++) {
        for (var l = 0; l < var4.length; l++) {
            var angkaEmpatDigit = "" + var1[i] + var2[j] + var3[k] + var4[l] + ' : ';
            totals += angkaEmpatDigit;
        }
        }
    }
    }

    
    // Menampilkan hasil semua kombinasi dikurangi angka input
    var fullnum = document.getElementById("fullnum");
    fullnumv = "" + var1.join('') + "\n" +
                                "" + var2.join('') + "\n" +
                                "" + var3.join('') + "\n" +
                                "" + var4.join('') + "\n";
    typeWriter(fullnumv, document.getElementById("fullnum"), intvl);

    
    // Menampilkan kombinasi pertama
    var a1 = var1.slice(0, -1);
    var a2 = var2.slice(0, -1);
    var a3 = var3.slice(0, -1);
    var a4 = var4.slice(0, -1);
    var num1 = document.getElementById("num1");
    num1v = "" + a1.join('') + "\n" +
                                "" + a2.join('') + "\n" +
                                "" + a3.join('') + "\n" +
                                "" + a4.join('') + "\n"; 
    typeWriter(num1v, document.getElementById("num1"), intvl);
    for (var i = 0; i < a1.length; i++) {
        for (var j = 0; j < a2.length; j++) {
            for (var k = 0; k < a3.length; k++) {
                for (var l = 0; l < a4.length; l++) {
                    var firstres = "" + a1[i] + a2[j] + a3[k] + a4[l] + ' : ';
                    results += firstres;
                }
            }
        }
    }

    // Menampilkan kombinasi kedua
    var b1 = var1.slice(-1).concat([]);
    var b2 = var2.slice(0, -1);
    var b3 = var3.slice(0, -1);
    var b4 = var4.slice(0, -1);
    var num2 = document.getElementById("num2");
    num2v = "" + b1.join('') + "\n" +
                                "" + b2.join('') + "\n" +
                                "" + b3.join('') + "\n" +
                                "" + b4.join('') + "\n";
    typeWriter(num2v, document.getElementById("num2"), intvl);
    for (var i = 0; i < b1.length; i++) {
        for (var j = 0; j < b2.length; j++) {
            for (var k = 0; k < b3.length; k++) {
                for (var l = 0; l < b4.length; l++) {
                    var secres = "" + b1[i] + b2[j] + b3[k] + b4[l] + ' : ';
                    results += secres;
                }
            }
        }
    }

    // Menampilkan kombinasi ketiga
    var c1 = var1.slice(0, -1);
    var c2 = var2.slice(-1).concat([]);
    var c3 = var3.slice(0, -1);
    var c4 = var4.slice(0, -1);
    var num3 = document.getElementById("num3");
    num3v = "" + c1.join('') + "\n" +
                                "" + c2.join('') + "\n" +
                                "" + c3.join('') + "\n" +
                                "" + c4.join('') + "\n";
    typeWriter(num3v, document.getElementById("num3"), intvl);
    for (var i = 0; i < c1.length; i++) {
    for (var j = 0; j < c2.length; j++) {
        for (var k = 0; k < c3.length; k++) {
        for (var l = 0; l < c4.length; l++) {
            var thirdres = "" + c1[i] + c2[j] + c3[k] + c4[l] + ' : ';
            results += thirdres;
        }
        }
    }
    }

    // Menampilkan kombinasi keempat
    var d1 = var1.slice(0, -1);
    var d2 = var2.slice(0, -1); 
    var d3 = var3.slice(-1).concat([]);
    var d4 = var4.slice(0, -1);
    var num4 = document.getElementById("num4");
    num4v = "" + d1.join('') + "\n" +
                                "" + d2.join('') + "\n" +
                                "" + d3.join('') + "\n" +
                                "" + d4.join('') + "\n";
    typeWriter(num4v, document.getElementById("num4"), intvl);
    for (var i = 0; i < d1.length; i++) {
    for (var j = 0; j < d2.length; j++) {
        for (var k = 0; k < d3.length; k++) {
        for (var l = 0; l < d4.length; l++) {
            var fourthres = "" + d1[i] + d2[j] + d3[k] + d4[l] + ' : ';
            results += fourthres;
        }
        }
    }
    }

    // Menampilkan kombinasi keempat
    var e1 = var1.slice(0, -1);
    var e2 = var2.slice(0, -1); 
    var e3 = var3.slice(0, -1);
    var e4 = var4.slice(-1).concat([]);
    var num5 = document.getElementById("num5");
    num5v = "" + e1.join('') + "\n" +
                                "" + e2.join('') + "\n" +
                                "" + e3.join('') + "\n" +
                                "" + e4.join('') + "\n";
    typeWriter(num5v, document.getElementById("num5"), intvl);
    for (var i = 0; i < e1.length; i++) {
    for (var j = 0; j < e2.length; j++) {
        for (var k = 0; k < e3.length; k++) {
        for (var l = 0; l < e4.length; l++) {
            var fifthres = "" + e1[i] + e2[j] + e3[k] + e4[l] + ' : ';
            results += fifthres;
        }
        }
    }
    }

    document.getElementById("resss").value = results;
    // Menggunakan split() untuk mengubah string menjadi array
    var arrayA = totals.split(" : ");
    var arrayB = results.split(" : ");

    // Menggunakan filter() untuk mendapatkan elemen yang hanya muncul di satu dari dua array
    var uniqueArray = arrayA.filter(element => !arrayB.includes(element)).concat(arrayB.filter(element => !arrayA.includes(element)));
    var sortedArray = uniqueArray.sort();
    shuffleArray(sortedArray);
    var hasilll = sortedArray.join(" : ");
    
    // typeWriter(hasilll, document.getElementById("inputString"), 1);
    document.getElementById("utuh").value += totals;

    // Menampilkan hasil kurangan dalam textarea
    document.getElementById("inputString").value +=  'hasilll';

    // Menampilkan kurangan menjadi per 400
    var maxCombinationsPerTextarea = 400;
    var outputContainer = document.getElementById('responss');
    outputContainer.innerHTML = ''; // Clear previous output
    var combinations = hasilll.match(/\d+/g).map(function (numberString) {
        return Number(numberString).toString().padStart(numberString.length, '0');
    });
    
    while (combinations.length > 0) {
        var chunk = combinations.splice(0, maxCombinationsPerTextarea);
        var index = outputContainer.childElementCount / 3 + 1;

        var info = document.createElement('div');
        info.classList.add('formbold-form-label');
        info.innerHTML = 'Manual Fast ke-' + index + ' Jumlah ' + chunk.length + ' Angka';
        outputContainer.appendChild(info);

        // Add textarea output
        var outputTextarea = document.createElement('textarea');
        outputTextarea.value = addDelimiter(chunk.join('*'), ' : ');
        outputTextarea.classList.add('formbold-form-inputt');
        outputTextarea.setAttribute('rows', '6');
        outputContainer.appendChild(outputTextarea);

        // Add copy button
        var copyButton = document.createElement('button');
        copyButton.innerHTML = 'Copy';
        copyButton.classList.add('copy-button');
        copyButton.setAttribute("type", "button");
        // Pass the index as a parameter to the copyToClipboard function
        copyButton.addEventListener('click', copyToClipboard.bind(null, outputTextarea, index));
        outputContainer.appendChild(copyButton);
    }
}

function addDelimiter(text, delimiter) {
    return text.replace(new RegExp(delimiter, 'g'), delimiter + ' ');
}


// End JS For Daily

// Start JS for checker
function pasteText() {
    var textarea = document.getElementById("data");

    navigator.clipboard.readText().then(function(clipText) {
    // Prevent the default behavior of pasting
    event.preventDefault();

    // Do something with the pasted text (e.g., insert it into the textarea)
    textarea.value += clipText;
    });
}

function clearAll(){
    document.getElementById('data').value = "";
}

function parseString() {
    var stringInput = document.getElementById('data').value;
    var arrayAngka = stringInput.match(/\d+/g).map(function (numberString) {
        return Number(numberString).toString().padStart(numberString.length, '0');
    });
    hasil = arrayAngka.join("");
    numberArray = hasil.split('');

    
    //Menghapus digit dari posisi kelipatan 5 atau tidak
    hapusTidak = document.getElementById('hapus');
    if(hapusTidak.checked){
        for (var i = 4; i < numberArray.length; i += 5) {
            numberArray[i] = '';
        }
    }else {
        numberArray;
    }

    // Menentukan selector 
    var selector = document.getElementById('selector-check').value;
    var baris = '';
    if ( selector === "4" ){
        baris = "0";
    } else if ( selector === "3" ){
        baris = "1";
    } else if ( selector === "2" ){
        baris = "2";
    }

    // Menggabungkan array menjadi string dengan delimiter setiap 4 digit
    var resultString = numberArray.join('');
    var resultArray = resultString.match(/.{1,4}/g);
    var per4 = resultArray.join('*');

    document.getElementById("respons").value = per4 ;

    // Menampilkan hasil dalam tabel
    var resultTable = document.getElementById("resultTable");
    resultTable.innerHTML = ""; // Membersihkan tabel sebelum menambahkan hasil baru
    countFull = resultArray.length;
    // Memeriksa dan menampilkan hasil dalam tabel dengan penanda warna merah jika ada digit yang sama dengan deret sebelumnya
    var prevResult = "";
    var countRed = 0;
    for (var j = 0; j < resultArray.length; j++) {
        if (j % 7 === 0) {
            var row = resultTable.insertRow();
        }

        var currentResult = resultArray[j];
        var cell = row.insertCell(j % 7);
        cell.innerHTML = currentResult;
        cell.classList.add("cells");

        // Pengecekan dan penandaan warna merah per digit
        if (j > 0) {
            for (var k = baris; k < currentResult.length; k++) {
                if (currentResult.charAt(k) === prevResult.charAt(k)) {
                    cell.classList.add("red-text");
                    countRed++;
                    break;
                }
            }
        }

        prevResult = currentResult;
    }
    document.getElementById('start-date').innerHTML = "Start Mulai Tanggal : " + hitungDanTampilkanTanggal(countFull);
    document.getElementById('counter-full').innerHTML = "Jumlah Semua : " + countFull;
    document.getElementById('counter-red').innerHTML = "Jumlah zonk : " + countRed;
}

function hitungDanTampilkanTanggal(jumlah) {
var tambahanHariInput = jumlah;
var tambahanHari = parseInt(tambahanHariInput);

if (!isNaN(tambahanHari)) {
    // Membuat objek Date yang mewakili waktu saat ini
    var tanggalSaatIni = new Date();

    // Menambahkan jumlah hari yang diinput
    tanggalSaatIni.setDate(tanggalSaatIni.getDate() - tambahanHari);

    // Mendapatkan komponen tanggal dari objek Date
    var tanggal = tanggalSaatIni.getDate();
    var bulan = tanggalSaatIni.getMonth() + 1; // Perlu ditambah 1 karena indeks bulan dimulai dari 0
    var tahun = tanggalSaatIni.getFullYear();

    var tanggalmulai = tanggal+'-'+bulan+'-'+tahun;
    return tanggalmulai;
    } 

}
// End js for checker
