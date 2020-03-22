var limit;
var repeat;
var tags_Repeat;

function Config_options(nameArray) {
    if (nameArray.length != 0) {
        for (var i = 0; i < nameArray.length; i++) {
            var cut_word = nameArray[i].split(":", 2);
            switch (cut_word[0]) {
                case "limit":
                    limit = parseInt(cut_word[1]);
                    break;
                case "repeat":
                    repeat = cut_word[1];
                    break;
                default:
                    limit = 20;
                    repeat = "false";
                    break;
            }
        }
    }
}

function Repeat_tags(arrTags, valSelect) {
    tags_Repeat = false;
    for (var i = 0; i < arrTags.length; i++) {
        if (arrTags[i].text == valSelect) {
            tags_Repeat = true;
        }
    }
}

function Reset_Config() {
    limit = 20;
    repeat = "false";
}

//funcion crear inputs
[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
   //inicalizar en caso de no entrar en case default
    limit = 20;
    repeat = "false"
    tags_Repeat = false;

     //valores de configuracion por defecto
    var hiddenInput = document.createElement('input');
    var idDiv = el.getAttribute('id');
    mainInput = document.createElement('input');


    //creacion del texbox que guarda value esta oculto
    hiddenInput.setAttribute('id', 'value-' + el.getAttribute('id'));
    hiddenInput.setAttribute('type', 'hidden');//modificar a hidden
    hiddenInput.setAttribute('name', 'value-' + el.getAttribute('id'));

    //creacion del texbox para autocompletado
    mainInput.setAttribute('type', 'text');
    mainInput.setAttribute('class', 'main-input');
    mainInput.setAttribute('id', 'txtAutoComplete-' + idDiv);
    mainInput.setAttribute('name', 'txtAutoComplete-' + idDiv);



    //se agregan como nodos hijos del div con clase tags input
    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    //inicia la funcion autocompletadomandando parametros id y array

    var arrAutoComplete = eval("Array_" + idDiv)//se iguala nombre del array con nombre del id del div

    autocomplete(document.getElementById("txtAutoComplete-" + idDiv), arrAutoComplete, document.getElementById("value-" + idDiv), idDiv);

});



function autocomplete(inp, arr, inpval, nomIdDiv) {

    var currentFocus;
    var VeriArrayDist = ["tags"];
    var existArray = false;


    //crear array de tags por nombre sin que se vuelvan a crear
    for (var i = 0; i < VeriArrayDist.length; i++) {
        if (VeriArrayDist[i] == nomIdDiv) {
            existArray = true;
        }
    }

    VeriArrayDist.push(nomIdDiv);

    if (existArray == false) {
        eval("var tags" + nomIdDiv + "= []");

    }

    inp.addEventListener("input", function (e) {
        Config_options(eval("Config_" + nomIdDiv));  //Leer configuraciones de cada input


        var a, b, i, e = 0, val = this.value;

        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        //crea div padre de todas la sugerencias
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        a.setAttribute("style", "position:relative;");

        this.parentNode.appendChild(a);

        for (i = 0; i < arr.length; i++) {
            //comienza el filtro de la busqueda en el array
            var arrayNombre = arr[i];
            var nombre = arrayNombre.toString().toLowerCase();
            var regex = RegExp(val.toLowerCase());

            if (regex.test(nombre) == true) {
                //crea div por cada coincidencia
                b = document.createElement("DIV");
                b.setAttribute("style", "height:40px;border-radius:2px;border:1px solid rgba(206, 212, 218, 1);");
                b.innerHTML = arr[i].substr(0, val.length);
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.innerHTML += "<img src='descarga.jpg'  height='20' width='20' style='margin-left:10px'>";
                //funcion por cada click en input
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    if (repeat == "true") {
                        Repeat_tags(eval("tags" + nomIdDiv), this.getElementsByTagName("input")[0].value);
                    } else {
                        tags_Repeat = false;
                    }

                    var hiddenInput = inpval;
                    var el = document.getElementById(nomIdDiv);
                    var mainInput = inp;
          

                    mainInput.addEventListener('keydown', function (e) {
           
                        var keyCode = e.which || e.keyCode;
                        if (keyCode === 8 && mainInput.value.length === 0 && eval("tags" + nomIdDiv).length > 0) {
                            removeTag(eval("tags" + nomIdDiv).length - 1);
                        }
                    });


                    //funcion agregar tag
                    function addTag(text) {
                        

                            var tag = {
                                text: text,
                                element: document.createElement('span'),
                            };


                            tag.element.setAttribute('class', 'tag');
                            tag.element.textContent = tag.text;

                            var closeBtn = document.createElement('span');
                            closeBtn.setAttribute('class', 'close');
                            closeBtn.addEventListener('click', function () {
                                removeTag(eval("tags" + nomIdDiv).indexOf(tag));
                            });
                            tag.element.appendChild(closeBtn);

                            eval("tags" + nomIdDiv).push(tag);

                            el.insertBefore(tag.element, mainInput);
                            refreshTags();
                        if (eval("tags" + nomIdDiv).length == limit) { ///limitar tags
                            document.getElementById("txtAutoComplete-" + nomIdDiv).style.display = "none"; //desaparecer control para limitar tags
                        }

                        Reset_Config();


                    }

                    //funcion eliminar tag
                    function removeTag(index) {
                  
                            document.getElementById("txtAutoComplete-" + nomIdDiv).style.display = "block"; //aparecer control al eliminar tag cuando el limite es menor a lo indicado

                            var tag = eval("tags" + nomIdDiv)[index];
                            eval("tags" + nomIdDiv).splice(index, 1);
                            el.removeChild(tag.element);
                            refreshTags();
                
                    }

                    //funcion refrescar tag del div cuando elimina o crea
                    function refreshTags() {

                        var tagsList = [];
                        eval("tags" + nomIdDiv).forEach(function (t) {
                            tagsList.push(t.text);
                        });

                        hiddenInput.value = tagsList.join(',');
                        mainInput.focus();
                      
                    }

                    //Guarda el dato para manda a funcion addTag
                    var filteredTag = inp.value;
                    if (filteredTag.length > 0 && tags_Repeat == false)
                        addTag(filteredTag);
                    mainInput.value = '';
                    mainInput.focus();

                    //cerrar lista de sugerencias
                    closeAllLists();
                });

                if (e <= 10) {
                    a.appendChild(b);
                    e++
                }
            }

        }
    });

    //funcion teclacdo cuando dan enter o clic en div de sugerencias
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {

        if (!x) return false;

        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].setAttribute('class', 'autocomplete-active');
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("keypress", function (e) {
        closeAllLists(e.target);
    });
}


