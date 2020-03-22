# InputTagsAutocomplete
Etiquetas con auto completado mas imagen
INSTRUCCIONES DE USO

1 .-Crear control 
    <div class="tags-input" id="dvtag">
    </div>
    
2 .-Cargar datos de autocompletado
  colocar Array_ + id  (en una variable de tipo array)
  ejemplo:
  var Array_dvtag = [ "iguana", "oso", "hidro", "koala", "elefante" ,"tiburon", "delfin", "perro" ];  

3.-Definir configuracion "obligatorio"  
colocar Config_ + id (en una variable de tipo array)
ejemplo:
var Config_dvtag = ["none"]

4.-Limitar tags
colocar entre comillas "limit": + numero de tag limitados (por defecto el numero de tags es 20)
ejemplo:
var Config_dvtag = [
"limit":3
]

5.-No repetir tags
colocar "repeat": + true (por defecto puedes repetir tags con los mismos valores)
ejemplo:
var Config_dvtag = [
"repeat:true"
]


