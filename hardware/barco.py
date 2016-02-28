# coding=utf-8

import glob
import serial
import requests

def main():
	texto = []
	port = glob.glob('/dev/ttyUSB*')
	print("Listening on port: %s" %(str(port)))
	
	ser = serial.Serial(str(port[0]), 9600, timeout=2)
	while 1:
		caracter = ser.readline()  
		
		if (len(texto) <= 8):
			texto.append(caracter)
		else (len(texto > 8):
		
			lat = 5
			lon = 5
			sql = "https://fpuga.cartodb.com/api/v2/sql?q=INSERT INTO hacksb (the_geom, description, username, event_type, name) VALUES (ST_GeomFromText('POINT({} {})', 4326),'la descripcion', 'fpuga', 'Automático', 'Ejemplo 1')&api_key=64e8707d60397bcb8666f1c86e165b96bd7a2851".format(lat, lon)
		
			# r = requests.get(sql)
			# print r.status_code
			# print r.text
	
			texto = []

if __name__=="__main__":
	main()
