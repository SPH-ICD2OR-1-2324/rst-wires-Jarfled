namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function UpdateCursor () {
    // Updates the cursor so when up or down is pressed the cursor updates its position
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function _4Wire () {
    RedCount = 0
    for (let value of WireList) {
        if (value == 0) {
            RedCount += 1
        }
    }
    BlueCount = 0
    for (let value of WireList) {
        if (value == 2) {
            BlueCount += 1
        }
    }
    YellowCount = 0
    for (let value of WireList) {
        if (value == 3) {
            YellowCount += 1
        }
    }
    if (SerialNumber % 2 == 1) {
        SNO = true
    }
    if (RedCount > 1 && SNO == true) {
        game.splash("Cut The Last Red Wire")
    } else if (RedCount == 0 && WireList[3] == 3) {
        game.splash("Cut The First Wire")
    } else if (BlueCount == 1) {
        game.splash("Cut The First Wire")
    } else if (YellowCount > 1) {
        game.splash("Cut The Last Wire")
    } else {
        game.splash("Cut The Second Wire")
    }
}
function startPhase () {
    // asks the user for wire amount. If count is lower than 3 or higher than 6, don't move on
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
// functions activate based on wire count
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (wireCount == 3) {
        _3Wire()
    }
    if (wireCount == 4) {
        _4Wire()
    } else if (wireCount == 5) {
        _5Wire()
    } else if (wireCount == 6) {
        _6Wire()
    } else {
    	
    }
})
function InitSerial () {
    // The computer asks the user to enter the serial number.
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function InitColours () {
    // List of colours:
    // -Red = 2
    // -White = 1
    // -Blue = 8
    // -Yellow = 5
    // -Black = 15
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function _5Wire () {
    RedCount = 0
    // Counts how much red wires are there in the 5 wire list.
    for (let value of WireList) {
        if (value == 0) {
            RedCount += 1
        }
    }
    YellowCount = 0
    // Counts how much yellow wires are there in the 5 wire list.
    for (let value of WireList) {
        if (value == 3) {
            YellowCount += 1
        }
    }
    BlackCount = 0
    // Counts how much black wires are there in the 5 wire list.
    for (let value of WireList) {
        if (value == 4) {
            BlackCount += 1
        }
    }
    // setting a serial number condition
    if (SerialNumber % 2 == 1) {
        SNO = true
    }
    if (WireList[4] == 4 && SNO == true) {
        game.splash("Cut The Fourth Wire")
    } else if (RedCount == 1 && YellowCount > 1) {
        game.splash("Cut The First Wire")
    } else if (BlackCount == 0) {
        game.splash("Cut The Second Wire")
    } else {
        game.splash("Cut The First Wire")
    }
}
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function _3Wire () {
    BlueCount = 0
    for (let value of WireList) {
        if (value == 2) {
            BlueCount += 1
        }
    }
    if (WireList[0] != 0 && (WireList[1] != 0 && WireList[2] != 0)) {
        game.splash("Cut The Second Wire")
    } else if (WireList[2] == 1) {
        game.splash("Cut The Last Wire")
    } else if (BlueCount > 1) {
        game.splash("Cut The Last Blue Wire")
    } else {
        game.splash("Cut The Last Wire")
    }
}
function _6Wire () {
    YellowCount = 0
    for (let value of WireList) {
        if (value == 3) {
            YellowCount += 1
        }
    }
    WhiteCount = 0
    for (let value of WireList) {
        if (value == 1) {
            WhiteCount += 1
        }
    }
    RedCount = 0
    for (let value of WireList) {
        if (value == 0) {
            RedCount += 1
        }
    }
    if (SerialNumber % 2 == 1) {
        SNO = true
    }
    if (YellowCount == 0 && SNO == true) {
        game.splash("Cut The Third Wire")
    } else if (YellowCount == 1 && WhiteCount > 1) {
        game.splash("Cut The Fourth Wire")
    } else if (RedCount == 0) {
        game.splash("Cut The Last Wire")
    } else {
        game.splash("Cut The Fourth Wire")
    }
}
let WhiteCount = 0
let BlackCount = 0
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let SNO = false
let SerialNumber = 0
let YellowCount = 0
let BlueCount = 0
let WireList: number[] = []
let RedCount = 0
let Ratio = 0
let cursor: Sprite = null
let cursorPos = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(14)
InitWirePhase()
