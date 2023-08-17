import sys
import zlib
import os

# Recebendo as variáveis da linha de comando
compressed_data = sys.argv[1]
id_empresa = sys.argv[2]
id_funcionario = sys.argv[3]

current_directory = os.getcwd()
parent_directory = os.path.dirname(current_directory)
print(current_directory)

decompressed_data = zlib.decompress(compressed_data)

# Decodificar os dados para uma string (supondo que seja texto)
decompressed_text = decompressed_data.decode('utf-8')

file_name = str(id_empresa)+"\\"+str(id_funcionario)+'.yml'

# Escrever os dados descomprimidos no arquivo
with open(file_name, 'w') as file:
    file.write(decompressed_text)
