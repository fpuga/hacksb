#include "OneWire.h"
#include "DallasTemperature.h"
#include <Wire.h>
#include <VirtualWire.h>
#include <SoftwareSerial.h>
#include <avr/sleep.h>
#include <avr/power.h>


SoftwareSerial mySerial(10, 11); // RX, Tx
// Data wire is plugged into pin 2 on the Arduino
 
// Setup a oneWire instance to communicate with any OneWire devices 
// (not just Maxim/Dallas temperature ICs)
#define ONE_WIRE_BUS 2
#define BTREARME 5
#define BTENVIO  7  
#define sH1      A0
#define sH2      A1
#define LED_RELE 4
#define RFREC    12

OneWire oneWire(ONE_WIRE_BUS);
 
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensors(&oneWire);


double sensorH1 = 0.0;
double sensorH2 = 600.0; 
double umbralH  = 100.0;
double umbralT  = 25.0;

double sensorT1 = 0.0;
double sensorT2 = 15.5;

char *controller;
char location[14];
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

int tInactivo;
bool bPararEnvio;
bool bEnvioCorrecto;
//GESTION WATCHDOG
volatile int f_wdt=1;

bool leemos1 = false;
bool leemos2 = false;

ISR(WDT_vect){
  if(f_wdt == 0)
  {
    f_wdt = 1;
  }
  else
  {
    Serial.println("WDTO APAGANDO POR INACTIVIDAD");
    bEnvioCorrecto = true;
    //f_wdt  = 0;
    //dormirSistema();
  }
}


void enviarFrecuencia(){
  char location[14] = {'4', '2', '.', '2', '2', ' ', '-', '8', '.', '8', '6', '5', '4', '6'};
  vw_send((uint8_t *)location, 14);
 
  vw_wait_tx(); // Wait until the whole message is gone
  
  digitalWrite(RFREC,1);
  //delay(2000);
  digitalWrite(RFREC,0);
  bEnvioCorrecto = true;
  Serial.println("Mensaje Enviado");
  //delay(2000);
}


void despertar(void)
{
  /* This will bring us back from sleep. */
  
  /* We detach the interrupt to stop it from 
   * continuously firing while the interrupt pin
   * is low.
   */
  detachInterrupt(0);
}


void dormirSistema(void)
{
  Serial.println("Durmiendo sistema");
  delay(100);    
 set_sleep_mode(SLEEP_MODE_PWR_DOWN);   // O usar SLEEP_MODE_PWR_DOWN para menor consumo
  sleep_enable();
  
  // Dormir
  sleep_mode();
  
  // Programa continua aquí luego del WDT Overrun
  sleep_disable(); // Impt prioridad deshabilitar sleep
  
  // Re-habilitar peripherals
  power_all_enable(); 
  bEnvioCorrecto = false;
  delay(100);
}


void leerSerie(){
  char str;
  
  //Serial.print("LEYENDO");
  
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
            if((contComa == 2) && (str == 'V')){
                leemos1 = false;
                leemos2=false;
                comp = 0;
                cont = 0;
                tramaCorr = false;
                contComa = 0;
                //tramaOK = true;         
            }
            if(str ==','){
                contComa ++;
            }
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


void setup(void){
  pinMode(LED_RELE,OUTPUT);
  pinMode(RFREC,OUTPUT);
  pinMode(BTREARME,INPUT);
  pinMode(BTENVIO,INPUT);
  bPararEnvio = false;
  
  vw_set_ptt_inverted(true); //
  vw_set_tx_pin(12);
  vw_setup(4000);// speed of data transfer Kbps
  
  //BAJO CONSUMO
  tInactivo = 0; 
  // Configurar WDT
  
  // Clear reset flag
  MCUSR &= ~(1<<WDRF);
  
  // Para cambiar WDE o el precaver, debemos set WDCE
  // Esto permite updates por 4 ciclos
  WDTCSR |= (1<<WDCE) | (1<<WDE);

  // Configurar nuevo watchdog-timeout prescalar
  WDTCSR = 1<<WDP0 | 1<<WDP3; /* 8.0 segundos */
  
  // Habilitar WD interrupt (note no reset)
  WDTCSR |= _BV(WDIE);
  
  
  
  //NEW SERIAL
  mySerial.begin(9600);
  // start serial port
  Serial.begin(9600);
  //Serial.println("Dallas Temperature IC Control Library Demo");
  
  // Start up the library
  sensors.begin();
  Serial.flush();
  Serial.println("Sistema Activo");
  bEnvioCorrecto = false;
}
 
 
void loop(void){
  Serial.print("...");
 // call sensors.requestTemperatures() to issue a global temperature
  // request to all devices on the bus
    // You can have more than one IC on the same bus. 
    // 0 refers to the first IC on the wire
  sensorH1 = analogRead(sH1);
  //sensorH2 = analogRead(sH2);  
  //Serial.print("Humedad es: ");
  //Serial.print(sensorH1);
  
  
  sensors.requestTemperatures(); // Send the command to get temperatures
  
  sensorT1 = sensors.getTempCByIndex(0);
  //sensorT2 = sensors.getTempCByIndex(0);
  
  //Serial.print("\tTemperature for Device 1 is: ");
  
 // Serial.println(sensorT1); // Why "byIndex"? 
  
  if(digitalRead(BTENVIO) == HIGH){
    enviarFrecuencia();
  }
  
  if(digitalRead(BTREARME) == HIGH){
    bPararEnvio = true;
    Serial.println("ORDEN DE PARO");
  }
  //detector umbrales
  if( (sensorT1 < umbralT && sensorT2 < umbralT) && (sensorH1 > umbralH && sensorH2 > umbralH) ){
    digitalWrite(LED_RELE,HIGH);
   // Serial.println("ALARMAAAA");
   //ENVIAR TRAMA GPS POR RADIO FRECUENCIA
    if(!bPararEnvio){
      enviarFrecuencia();
    }
  }
  else{
    digitalWrite(LED_RELE,LOW);
  }
  
 leerSerie();
 
 //EVALUACION PARA DORMIR
 if(bEnvioCorrecto){
   if(f_wdt == 1){ 
      f_wdt  = 0;
      dormirSistema();
   }
 }
}
