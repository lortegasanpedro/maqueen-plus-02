
// Buscar LuzRight
// si  el nivel de luz es mayor de 70 para de buscar y retorna true
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
// Buscar Luz
// Dependiendo del paramtero direccion busca la luz en Left o en Right
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
// Buscar LuzLeft
// si  el nivel de luz es mayor de 70 para de buscar y retorna true
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
 
 // Velocidad para cuando el robot gira para buscar la luz
let VELOCIDAD = 0

// let direccion Si el valor es 1 busca primero en Right, si es 2 busca primero en Left
let direccion: number

maqueenPlusV2.I2CInit()

basic.forever(function () {
    // serial.writeLine("Luz: " + input.lightLevel())
    if (input.lightLevel() > 100) {
        let VELOCIDAD_FORWARD = 0
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, VELOCIDAD_FORWARD)
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Open)
        maqueenPlusV2.ledBlank()
    } else if (input.lightLevel() > 80 && input.lightLevel() < 100) {
        direccion = randint(1, 2)
        // serial.writeLine("Direccion: " + direccion)
        buscarLuz(direccion)
    } else if (input.lightLevel() < 50) {
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Close)
        maqueenPlusV2.ledRainbow(1, 360)
    }
})
