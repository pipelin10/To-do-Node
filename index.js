require('colors');
const { 
    guardar_db, 
    leer_db 
} = require('./helpers/guardar_archivo');
const {
    inquirer_menu,
    inquirer_pausa,
    leer_input,
    listado_tarea_borrar,
    confirmar,
    mostrar_listado_checklist
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
console.clear();

const main = async() =>{
    let opt = '';
    const tareas = new Tareas();
    
    const tareas_db = leer_db();
    if(tareas_db){
        tareas.cargar_tareas_from_array(tareas_db);
    }
    // await inquirer_pausa();

    do {
        opt = await inquirer_menu();
        // console.log(opt);

        switch(opt){
            case '1':
                const desc = await leer_input('Descripcion:');
                tareas.crear_tarea(desc);
                console.log(desc);
            break;

            case '2':
                tareas.listado_completo();
            break

            case '3':
                tareas.listar_pendientes_completadas(true);
            break;

            case '4':
                tareas.listar_pendientes_completadas(false);
            break;

            case '5':
                const ids = await mostrar_listado_checklist(tareas.listado_arr);
                console.log(ids);
                tareas.toggle_completadas(ids);
            break;

            case '6':
                const id = await listado_tarea_borrar(tareas.listado_arr);
                if(id != 0){
                    const ok = await confirmar(`¿Está seguro que desea borrar la tarea?`);
                    // console.log({id});
                    if(ok){
                        tareas.borrar_tarea(id);
                        console.log('La tarea ha sido borrada');
                    }
                }
            break;
        }

        guardar_db(tareas.listado_arr)

        if(opt != '0'){
            await inquirer_pausa();
        }
    } while (opt != '0');
};

main();