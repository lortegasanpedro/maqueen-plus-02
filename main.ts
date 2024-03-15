let direction
let VELOCIDAD = 50
maqueenPlusV2.I2CInit()
basic.forever(function () {
    serial.writeLine("Luz: " + input.lightLevel())
    // } else {
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD / 2)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, VELOCIDAD / 2)
    // basic.pause(500)
    // }
    if (input.lightLevel() > 100) {
        let VELOCIDAD_FORWARD = 0
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD_FORWARD)
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Open)
        maqueenPlusV2.ledBlank()
    } else if (input.lightLevel() > 50 && input.lightLevel() < 100) {
        // direction = randint(1, 2)
        // if (direction == 1) {
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, VELOCIDAD / 2)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD / 2)
        // basic.pause(500)
        let luzEncontrada = buscarLuz(1, 0)
        //if (!luzEncontrada) {
        //    buscarLuz(, 0)
       // }
        /*
        

        for (let index = 0; index <= 10; index++) {
            serial.writeLine("Mov: " + input.lightLevel())
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, VELOCIDAD / 2)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD / 2)
            basic.pause(150)
            if (input.lightLevel() > 70) {
                serial.writeLine("MovEx: " + index)
                break;
            }
        }*/
    } else if (input.lightLevel() < 50) {
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Close)
        maqueenPlusV2.ledRainbow(1, 360)
    }
})

function buscarLuz(leftMotor=1, rightMotor=0) {
    for (let index = 0; index <= 10; index++) {
        serial.writeLine("Mov: " + input.lightLevel())
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, leftMotor, VELOCIDAD / 2)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, rightMotor, VELOCIDAD / 2)
        basic.pause(150)
        if (input.lightLevel() > 70) {
            serial.writeLine("MovEx: " + index)
            return true
        }
    }
    leftMotor=0
    rightMotor=1
    // Volver a la posicion
    for (let index = 0; index <= 10; index++) {
        serial.writeLine("Mov: " + input.lightLevel())
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, leftMotor, VELOCIDAD / 2)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, rightMotor, VELOCIDAD / 2)
        basic.pause(150)
        if (input.lightLevel() > 70) {
            serial.writeLine("MovEx: " + index)
            return true
        }
    }
    return false
}