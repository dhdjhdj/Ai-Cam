namespace AiCam {

/**
* AI识别模式
*/
export enum Mode {
    //% block="人脸识别"
    Face = 0,

    //% block="颜色识别"
    Color = 1,

    //% block="二维码识别"
    QR = 2,

    //% block="卡片识别"
    Card = 3
}

// =========================
// 数据缓存
// =========================

let faceXValue = 0
let faceYValue = 0
let faceValid = false

let colorValue = ""
let qrValue = ""
let cardValue = ""


// =========================
// 数据解析
// =========================
function parseLine(line: string): void {

    if (line.length == 0) {
        return
    }

    let parts = line.split(":")

    if (parts.length < 3) {
        return
    }

    let mode = parts[1]
    let data = parts[2]

    if (mode == "FACE") {

        let xy = data.split(",")

        if (xy.length >= 2) {

            faceXValue = parseInt(xy[0])
            faceYValue = parseInt(xy[1])

            faceValid = true
        }

    } else if (mode == "COLOR") {
        colorValue = data
    } else if (mode == "QR") {
        qrValue = data
    } else if (mode == "CARD") {
        cardValue = data
    }
}

// =========================
// 初始化
// =========================
//% block="初始化AI摄像头 TX %tx RX %rx 波特率 %baud"
//% tx.defl=SerialPin.P2
//% rx.defl=SerialPin.P8
export function begin(
    tx: SerialPin,
    rx: SerialPin,
    baud: number
): void {
    serial.redirect(
        tx,
        rx,
        baud
    )
    basic.pause(25)
    let strVal = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    parseLine(strVal)
    basic.pause(25)
}


/**
* 设置AI模式
*/
//% block="设置AI模式 %mode"
//% group="基础"
//% weight=90
export function setMode(mode: Mode): void {
    let i = 0
    switch (mode) {
        case Mode.Face:
            for (; i < 3; i++) {
                serial.writeLine("MODE:FACE")
                basic.pause(50)
            }
            break

        case Mode.Color:
            for (; i < 3; i++) {
                serial.writeLine("MODE:COLOR")
                basic.pause(50)
            }
            break

        case Mode.QR:
            for (; i < 3; i++) {
                serial.writeLine("MODE:QR")
                basic.pause(50)
            }
            break

        case Mode.Card:
            for (; i < 3; i++) {
                serial.writeLine("MODE:CARD")
                basic.pause(50)
            }
            break
    }

        // basic.pause(50)
}

/**
* 检测到人脸
*/
//% block="检测到人脸"
//% group="人脸"
//% weight=80
export function faceDetected(): boolean {
    return faceValid
}

/**
* 人脸X坐标
*/
//% block="人脸X坐标"
//% group="人脸"
//% weight=70
export function faceX(): number {
    return faceXValue
}

/**
 * 人脸Y坐标
*/
//% block="人脸Y坐标"
//% group="人脸"
//% weight=60
export function faceY(): number {
    return faceYValue
}

/**
* 颜色结果
*/
//% block="颜色结果"
//% group="颜色"
//% weight=50
export function color(): string {
    return colorValue
}

/**
* 二维码内容
*/
//% block="二维码内容"
//% group="二维码"
//% weight=40
export function qr(): string {
    return qrValue
}

/**
* 卡片内容"
*/
//% block="卡片内容"
//% group="卡片"
//% weight=30
export function card(): string {
    return cardValue
}

}