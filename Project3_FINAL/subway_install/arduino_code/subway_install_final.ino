#include "Arduino_SensorKit.h"

int temp;
int humid;
int light_sensor = A3;

int sensors[3];

void setup() {
  Serial.begin(9600);
  Environment.begin();

}

void loop() {
  
  temp = (Environment.readTemperature());
  sensors[0] = temp;

  humid = (Environment.readHumidity());
  sensors[1] = humid;

  int raw_light = analogRead(light_sensor);
int light = map(raw_light, 0, 1023, 0, 100);

sensors[2] = light;

for (int thisSensor = 0; thisSensor < 3; thisSensor++){
  int sensorValue = sensors[thisSensor];

Serial.print(sensorValue);
if (thisSensor == 2) {
  Serial.println();
} else {
  Serial.print(",");
}
}
delay (100);
}
