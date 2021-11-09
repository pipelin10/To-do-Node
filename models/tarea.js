const { v4: uuidv4} = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }

    set_tarea(Tarea){
        this.id = Tarea.id;
        this.desc = Tarea.desc;
        this.completadoEn = Tarea.completadoEn;
    }
}

module.exports = Tarea;