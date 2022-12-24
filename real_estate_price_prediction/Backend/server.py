from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
import pandas as pd
import joblib




app = Flask(__name__)

cors = CORS(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

model = joblib.load('real_estate.pkl')

@app.route('/predict', methods=["GET" , "POST"])
def predict():
    try:
        if request.method=='POST':
            TDate = request.json['TDate']
            Hage = request.json['Hage']
            MRT = request.json['MRT']
            CStore = request.json['CStore']
            Latitude = request.json['Latitude']
            Longitude = request.json['Longitude']

            year = int(TDate[:4])
            month = int(TDate[5:7])
            day = int(TDate[8:10])
            month = month-1+day/32
            year = year + month/12
            tdate = year
            

            to_pred = pd.DataFrame([[tdate,Hage,MRT,CStore,Latitude,Longitude]],
            columns = ['X1 transaction date','X2 house age','X3 distance to the nearest MRT station','X4 number of convenience stores','X5 latitude','X6 longitude'])

            y = model.predict(to_pred)
            y=y[0]
            
            return {
                'res' : y
            }

    except:
        return {
                'yes' : 'no cum'
            }


if __name__ == '__main__':
    app.run(debug=True)