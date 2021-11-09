const { resolve } = require('path');

require('colors');

const mostrar_menu = () =>{
    return new Promise( (resolve,reject) => {
        console.clear();
        console.log('=============================='.brightBlue);
        console.log('    Selecciones una opción'.brightBlue);
        console.log('==============================\n'.brightBlue);
    
        console.log(`${'1.'.brightBlue} Crear tarea`);    
        console.log(`${'2.'.brightBlue} Listar tareas`);    
        console.log(`${'3.'.brightBlue} Listar tareas completadas`);    
        console.log(`${'4.'.brightBlue} Listar tareas completadas`);    
        console.log(`${'5.'.brightBlue} Completar tarea(s)`);    
        console.log(`${'6.'.brightBlue} Borrar tarea`);    
        console.log(`${'0.'.brightBlue} Salir\n`); 
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    });
}

const pausa = () => {
    return new Promise((resolve,reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'Enter'.brightBlue} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        });    
    });
};

module.exports = {
    mostrar_menu,
    pausa
}