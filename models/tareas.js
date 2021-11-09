const Tarea = require("./tarea");

class Tareas{
    _listado = {};
    constructor(){
        this._listado = {};
    }

    get listado_arr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        });
        return listado;
    }

    borrar_tarea(id = ''){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargar_tareas_from_array(tareas = []){
        tareas.forEach(tarea => {
            const tmp_tarea = new Tarea();
            tmp_tarea.set_tarea(tarea);
            this._listado[tmp_tarea.id] = tmp_tarea;
        })
    }

    async crear_tarea(desc = ''){
        try{
            const tarea = new Tarea(desc);
            this._listado[tarea.id] = tarea;
        }catch(err){
            throw err;
        }
    }

    listado_completo(){
        //Mine
        // const listado_tareas = Object.values(this._listado);
        // for(let i in listado_tareas){
        //     console.log(`${`${Number(i)+1}`.brightBlue}. ${listado_tareas[i].desc} | ${listado_tareas[i].completadoEn == null ? 'Pendiente'.brightRed : 'Completada'.brightGreen}`);
        // };
        this.listado_arr.forEach( (tarea,i) => {
            const idx = `${i+1}`.brightBlue;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn == null) ? 
                            'Pendiente'.brightRed : 
                            'Completada'.brightGreen;
            console.log(`${idx}. ${desc} | ${estado}`);
        })
    }

    listar_pendientes_completadas ( completadas = true){
        let idx = 1;
        this.listado_arr.forEach( (tarea,i) => {
            const {desc, completadoEn} = tarea;
            if(completadas == true && completadoEn != null){
                console.log(`${idx.toString().brightBlue}. ${desc} | ${completadoEn.brightBlue}`);
                idx++;
            }else if(completadas == false && completadoEn == null){
                const estado = 'Pendiente'.brightRed;
                console.log(`${idx.toString().brightBlue}. ${desc} | ${estado}`);
                idx++;
            }
        })
    }

    toggle_completadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toString();
            }
        })

        this.listado_arr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;