#include <Wire.h>
#include <VirtualWire.h>



char *controller;
void setup() 
{
  pinMode(13,OUTPUT);
  vw_set_ptt_inverted(true); //
  vw_set_tx_pin(12);
  vw_setup(4000);// speed of data transfer Kbps
}

void loop()
{  
  char location[14] = {'4', '2', '.', '2', '2', ' ', '-', '8', '.', '8', '6', '5', '4', '6'};
  vw_send((uint8_t *)location, 14);
  
  vw_wait_tx(); // Wait until the whole message is gone
   
  digitalWrite(13,1);
  delay(2000);
  digitalWrite(13,0);
  delay(2000);
}
