function buscarLuzRight (leftRight: boolean) {
    for (let index = 0; index <= 10; index++) {
        // serial.writeLine("Mov1: " + input.lightLevel())
        if (leftRight) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD / 2)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, VELOCIDAD / 2)
        } else {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, VELOCIDAD / 2)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD / 2)
        }
        basic.pause(150)
        if (input.lightLevel() > 70) {
            // serial.writeLine("MovEx1: " + index)
            return true
        }
    }
    return false
}
function buscarLuz (direccion: number) {
    if (direccion == 1) {
        if (!(buscarLuzRight(true))) {
            if (!(buscarLuzRight(false))) {
                if (!(buscarLuzLeft(true))) {
                    buscarLuzLeft(false)
                }
            }
        }
    } else {
        if (!(buscarLuzLeft(true))) {
            if (!(buscarLuzLeft(false))) {
                if (!(buscarLuzRight(true))) {
                    buscarLuzRight(false)
                }
            }
        }
    }
}
function buscarLuzLeft (leftRight: boolean) {
    for (let index2 = 0; index2 <= 10; index2++) {
        // serial.writeLine("Mov1: " + input.lightLevel())
        if (leftRight) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, VELOCIDAD / 2)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD / 2)
        } else {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD / 2)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, VELOCIDAD / 2)
        }
        basic.pause(150)
        if (input.lightLevel() > 100) {
            // serial.writeLine("MovEx1: " + index2)
            maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
            return true
        }
    }
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    return false
}
let VELOCIDAD = 0
VELOCIDAD = 80
let VELOCIDAD_FORWARD = 50
let direccion: number
maqueenPlusV2.I2CInit()
basic.forever(function () {
    // serial.writeLine("Luz: " + input.lightLevel())
    if (input.lightLevel() > 100) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD_FORWARD)
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Open)
        maqueenPlusV2.ledBlank()
    } else if (input.lightLevel() > 80 && input.lightLevel() < 100) {
        direccion = randint(1, 2)
        buscarLuz(direccion)
    } else if (input.lightLevel() < 50) {
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Close)
        maqueenPlusV2.ledRainbow(1, 360)
    }
})
