#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11); // RX, TX

bool leemos1 = false;
bool leemos2 = false;

int comp;
char comandoGPS[6] = {'$', 'G', 'P', 'R', 'M', 'C'};
char comando[6];

bool tramaCorr = false;
int contadorComas = 0;
int cont;
char hora[10];
char latitud[10];
char longitud[10];
char ONS[1];
char OWE[1];
char estado[1];
char trama [40];
int contComa;

void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  mySerial.begin(9600);

}


void loop() { // run over and over

  char str;
  if (mySerial.available()) {
    str = mySerial.read();


    if (str == '\n') {
      leemos1 = true;
      comp = 0;
      cont = 0;
      tramaCorr = false;
      contComa = 0;
      Serial.println(trama);
    }
    else{
      if ((str == '$') && (leemos1 == true)) {
        leemos2 = true;
        //Serial.println(str);
      }
      if ((leemos1 == true) && (leemos2 == true) && (comp < 6)) {
        comando[comp] = str;
        comp++;
        //Serial.println(comando);
      }
      if ((tramaCorr)&&(cont < 40)) {
        
            trama[cont] = str;
            cont++;
            //Serial.println(trama);
//            if((contComa == 2) && (str == 'V')){
//                Serial.println("cosa");
//                leemos1 = false;
//                leemos2=false;
//                comp = 0;
//                cont = 0;
//                tramaCorr = false;
//                contComa = 0;
//                //tramaOK = true;         
//            }
//            if(str ==','){
//                contComa ++;
//            }
      }
      
      if (comp == 6) {
        leemos1 = false;
        leemos2 = false;
        comp = 0;
        //comando[1]=' ';
        if (strcmp(comando, "$GPRMC") == 0) {
          //Serial.println(comando);
          tramaCorr= true;
          cont = 0;
        }
      }
  
    }    
  }
}
