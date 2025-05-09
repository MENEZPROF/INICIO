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
    try:
        with open(NOMBRE_ARCHIVO, "r") as txt:
            return json.load(txt)
    except json.JSONDecodeError:
        return []
    
def guardar_datos(clientes):
    with open(NOMBRE_ARCHIVO, "w")as txt:
        json.dump(clientes,txt, indent=4)

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

@app.route('/grafica/pais', methods=["GET"])
def grafica_pais():
    cliente = leer_datos()
    pais = [i['pais'] for i in cliente if 'pais' in i]

    
    plt.hist(pais, bins=10, color="orange", edgecolor="black")
    plt.xlabel("paises donde estamos")
    plt.ylabel("Cantidad de usuarios")

    img = io.BytesIO()
    plt.savefig(img, format='png')
    plt.close()
    img.seek(0)
    return Response(img.getvalue(), mimetype='image/png')

@app.route('/grafica/servicios')
def grafica_servicios():
    cliente = leer_datos()
    servicios = [i['servicio'] for i in cliente if 'servicio' in i]

    fig, ax = plt.subplots()
    ax.hist(servicios, bins=20, color="orange", edgecolor="black")
    plt.xlabel("Servicio que ofrecemos")
    plt.ylabel("Cantidad de usuarios")

    buf = io.BytesIO()
    fig.savefig(buf, format='png')
    buf.seek(0)
    plt.close(fig)
    return Response(buf.getvalue(), mimetype='image/png')


if __name__=="__main__":
    app.run(debug=True, port=5000)