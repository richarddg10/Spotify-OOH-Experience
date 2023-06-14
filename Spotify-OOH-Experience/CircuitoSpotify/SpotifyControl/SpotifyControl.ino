const int PinButtonJoystick= 12;
const int PinJoystickX = A0;
const int PinJoystickY = A1;

const int PinButtonOptions = 7;
const int PinButtonCapture = 8;

int xJoystick;
int yJoystick;

int captureButtonState;
int optionsButtonState;
// bool inicialButtonState = false;

void setup() {
  Serial.begin(9600);
  Serial.println("hola inicio");

  pinMode(PinButtonJoystick, INPUT_PULLUP);
  pinMode(PinButtonOptions, INPUT);
  pinMode(PinButtonCapture, INPUT);
}

void loop() {
  joystick();
  buttonCapture();
  buttonOptions();
  // delay(10000);
}

void joystick() {
  yJoystick = analogRead(PinJoystickX);
  xJoystick = analogRead(PinJoystickY);
  // buttonState = digitalRead(PinButtonJoystick);

  Serial.print("X: ");
  Serial.println(xJoystick);
  // delay(100);
  Serial.print("Y: ");
  Serial.println(yJoystick);
  // delay(100);
  // Serial.print("Button: ");
  // Serial.println(buttonState);
  delay(10);
}

void buttonCapture() {
  captureButtonState = digitalRead(PinButtonCapture);
  Serial.print("Button Capture: ");
  Serial.println(captureButtonState);
  delay(100);
}

void buttonOptions() {
  optionsButtonState = digitalRead(PinButtonOptions);
  Serial.print("Button Options: ");
  Serial.println(optionsButtonState);
  delay(100);
}