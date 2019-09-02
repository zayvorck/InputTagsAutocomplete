tags = [];
//funcion crear inputs

[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
    let hiddenInput = document.createElement('input'),
        mainInput = document.createElement('input');

    //creacion del texbox que guarda value esta oculto
    hiddenInput.setAttribute('id', 'txtOculto');
    hiddenInput.setAttribute('type', 'hidden');//modificar a hidden
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));

    //creacion del texbox para autocompletado
    mainInput.setAttribute('type', 'text');
    mainInput.setAttribute('class', '');
    mainInput.setAttribute('id', 'slNombreTarea');
    mainInput.setAttribute('name', 'slNombreTarea');
    mainInput.classList.add('main-input');

    //se agregan como nodos hijos del div con clase tags input
    el.appendChild(mainInput);
    el.appendChild(hiddenInput);


});


function autocomplete(inp, arr) {

    var currentFocus;

    inp.addEventListener("input", function (e) {
        var a,b, i,e = 0, val = this.value;
    
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
                b.setAttribute("style", "height:30px;border-radius:2px;");
                b.innerHTML =  arr[i].substr(0, val.length); 
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.innerHTML += "<img src='descarga.jpg'  height='20' width='20' style='margin-left:10px'>";
                //funcion por cada click en input
                b.addEventListener("click", function (e) {
                inp.value = this.getElementsByTagName("input")[0].value;
             
                    
                    var hiddenInput = document.getElementById("txtOculto");
                    var el = document.getElementById("dvtag");
                    var mainInput = document.getElementById("slNombreTarea");

                    mainInput.addEventListener('keydown', function (e) {

                        let keyCode = e.which || e.keyCode;
                        if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) { 
                            removeTag(tags.length - 1);
                        }
                    });

                
                 //funcion agregar tag
                    function addTag(text) {
                        /*if (tags.length < 1) { *///limitar tags
                       
                            let tag = {
                                text: text,
                                element: document.createElement('span'),
                            };

                            
                            tag.element.classList.add('tag');
                            tag.element.textContent = tag.text;

                            let closeBtn = document.createElement('span');
                            closeBtn.classList.add('close');
                            closeBtn.addEventListener('click', function () {
                                removeTag(tags.indexOf(tag));
                            });
                            tag.element.appendChild(closeBtn);

                            tags.push(tag);

                            el.insertBefore(tag.element, mainInput);

                            refreshTags();
                        //}
                        

                    }

                    //funcion eliminar tag
                    function removeTag(index) {

                            let tag = tags[index];
                            tags.splice(index, 1);
                            el.removeChild(tag.element);
                            refreshTags();

                    }

                    //funcion refrescar tag del div cuando elimina o crea
                    function refreshTags() {
                      
                            let tagsList = [];
                            tags.forEach(function (t) {
                                tagsList.push(t.text);
                            });
                            hiddenInput.value = tagsList.join(',');
                    }
                
                    //Guarda el dato para manda a funcion addTag
                    let filteredTag =inp.value;
                    if (filteredTag.length > 0)
                        addTag(filteredTag);
                    mainInput.value = '';

                    //cerrar lista de sugerencias
                    closeAllLists();
                })
                ;

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
        x[currentFocus].classList.add("autocomplete-active");
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


//inicia la funcion autocompletadomandando parametros id y array
autocomplete(document.getElementById("slNombreTarea"), nomTarea);
