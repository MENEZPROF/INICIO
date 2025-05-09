from flask import Flask, jsonify,request,Response
from flask_cors import CORS
import os
import json
import matplotlib.pyplot as plt
import io
app=Flask(__name__)
CORS(app)

NOMBRE_ARCHIVO="clientes.json"
if not os.path.exists(NOMBRE_ARCHIVO):
    with open(NOMBRE_ARCHIVO,"w") as txt:
        json.dump([], txt, indent=4)

def leer_datos():
    with open(NOMBRE_ARCHIVO,"r") as txt:
        return json.load(txt)
    
def guardar_datos(cliente):
    with open(NOMBRE_ARCHIVO, "w")as txt:
        json.dump(cliente,txt, indent=4)

@app.route('/insertar', methods=["POST"])
def insertar():
    datos=request.json
    clientes=leer_datos()
    clientes.append(datos)
    guardar_datos(clientes)
    return {"mensaje":"ok"}

@app.route('/consultar',methods=["GET"])
def consultar_clientes():
    clientes=leer_datos()
    return jsonify(clientes)

@app.route('/grafica')

def grafica_serv():
    with open(NOMBRE_ARCHIVO,'r') as txt:
        cliente=json.load(txt)
    
    servicios = []
    for i in cliente:
      if 'servicio' in i:
        servicios.append(i['servicio'])

    #plt.figure(figsize=(6,6))
    plt.hist(servicios,bins=10, color="orange", edgecolor="green")
    plt.title("Servicios mas Utilizados")
    plt.xlabel("Servicio")
    plt.ylabel("Cantidad")

    img=io.BytesIO()
    plt.savefig(img,format='png')
    plt.close()
    img.seek(0)
    return Response(img.getvalue(),mimetype='image/png')



if __name__=="__main__":
    app.run(debug=True, port=5000)