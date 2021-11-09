const inquirer = require('inquirer');
require('colors');


const inquirer_menu = async() => {
    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                {
                    value: '1',
                    name: `${'1.'.brightBlue} Crear tarea`
                },
                {
                    value: '2',
                    name: `${'2.'.brightBlue} Listar tareas`
                },
                {
                    value: '3',
                    name: `${'3.'.brightBlue} Listar tareas completadas`
                },
                {
                    value: '4',
                    name: `${'4.'.brightBlue} Listar tareas pendientes`
                },
                {
                    value: '5',
                    name: `${'5.'.brightBlue} Completar tarea(s)`
                },
                {
                    value: '6',
                    name: `${'6.'.brightBlue} Borrar tarea`
                },
                {
                    value: '0',
                    name: `${'0.'.brightBlue} Salir`
                }
            ]
        }
    ];
    console.clear();
    console.log('=============================='.brightBlue);
    console.log('    Selecciones una opción'.brightBlue);
    console.log('==============================\n'.brightBlue);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const inquirer_pausa = async() => {

    const pausa_pregunta = [
        {
            type: 'input',
            name: 'pausa_opt',
            message: `Presione ${'Enter'.brightBlue} para continuar`,
        }
    ];
    console.log('\n');
    await inquirer.prompt(pausa_pregunta);
}

const leer_input = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if( value.length == 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listado_tarea_borrar = async(tareas = []) => {
    
    const choices = tareas.map((tarea,i) => {
        i++;
        return {
            value: tarea.id,
            name: `${i.toString().brightBlue}. ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0'.brightBlue + '. Cancelar'
    });
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrar_listado_checklist = async(tareas = []) => {
    
    const choices = tareas.map((tarea,i) => {
        i++;
        return {
            value: tarea.id,
            name: `${i.toString().brightBlue}. ${tarea.desc}`,
            checked: (tarea.completadoEn ? true : false)
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas);

    return ids;
}

module.exports = {
    inquirer_menu,
    inquirer_pausa,
    leer_input,
    listado_tarea_borrar,
    confirmar,
    mostrar_listado_checklist
};