const { exec } = require('child_process');
module.exports = function test(){
    try{
        var face = "123123123"
        var id_empresa = "1"
        var id_funcionario = "1"
        const pythonScriptPath = './src/descompress.py';
        const command = `python ${pythonScriptPath} "${face}" "${id_empresa}" "${id_funcionario}"`;
        exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro: ${error}`);
            return;
        }
        console.log(`Saída padrão: ${stdout}`);
        console.error(`Saída de erro: ${stderr}`);
        });    
    }
    catch(er){
        console.log(er)
    }

}

