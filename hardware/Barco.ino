#include <Wire.h>
#include <VirtualWire.h>
#include <LiquidCrystal_I2C.h>


#include <avr/io.h>
#include <avr/wdt.h>
#include <simpletimer.h>

int timerId;

SimpleTimer timer;
LiquidCrystal_I2C lcd(0x27, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE);  // Set the LCD I2C address

void setup()
{
  vw_set_ptt_inverted(true); // Required for DR3100
  vw_set_rx_pin(12);
  vw_setup(4000);  // Bits per sec
  pinMode(11, OUTPUT);
  pinMode(13, OUTPUT);

  vw_rx_start();       // Start the receiver PLL running

  Serial.begin(9600);
  lcd.begin(16,2);
  timerId = timer.setInterval(10000, repeatMe);

}

// a function to be executed periodically
void repeatMe()
{
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Emergencia - 23");
  digitalWrite(11, HIGH);
  delay(1000);
  digitalWrite(11, LOW);
  lcd.clear();
}

void loop()
{
  uint8_t buf[VW_MAX_MESSAGE_LEN];
  uint8_t buflen = VW_MAX_MESSAGE_LEN;
  
  timer.run();

  lcd.setCursor(0,0);
  lcd.print("Barco");
  delay(500);
  lcd.clear();

  if (vw_have_message() == true)
  {
    timer.restartTimer(timerId); 
  }

  if (vw_get_message(buf, &buflen)) // Non-blocking
  {
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Marinero 23 - Ok");
    lcd.setCursor(0,1);
    int i;  
    for (i = 0; i < buflen; i++)
    {
      Serial.println(buf[i]);
      delay(200);
    }
    delay(500);
    lcd.clear();
  }
}
