let direction
let VELOCIDAD = 50
maqueenPlusV2.I2CInit()
basic.forever(function () {
    // serial.writeLine("Luz: " + input.lightLevel())
    if (input.lightLevel() > 100) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD)
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Open)
        maqueenPlusV2.ledBlank()
    } else if (input.lightLevel() > 60 && input.lightLevel() < 100) {
        direction = randint(1, 2)
        if (direction == 1) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, VELOCIDAD)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD)
            basic.pause(100)
        } else {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, VELOCIDAD)
            basic.pause(100)
        }
    } else if (input.lightLevel() < 60) {
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Close)
        maqueenPlusV2.ledRainbow(1, 360)
    }
})
