
import time 

import digitalio 

import board 

import usb_hid 

from adafruit_hid.keyboard import Keyboard 

from adafruit_hid.keycode import Keycode 



boton1_pin = board.GP28

boton2_pin = board.GP2

boton3_pin = board.GP5

boton4_pin = board.GP27

boton5_pin = board.GP11

boton6_pin = board.GP7

boton7_pin = board.GP19

boton8_pin = board.GP17

boton9_pin = board.GP14



teclado = Keyboard(usb_hid.devices)

boton1= digitalio.DigitalInOut(boton1_pin)

boton1.direction = digitalio.Direction.INPUT

boton1.pull = digitalio.Pull.DOWN



boton2= digitalio.DigitalInOut(boton2_pin)

boton2.direction = digitalio.Direction.INPUT

boton2.pull = digitalio.Pull.DOWN



boton3= digitalio.DigitalInOut(boton3_pin)

boton3.direction = digitalio.Direction.INPUT

boton3.pull = digitalio.Pull.DOWN



boton4= digitalio.DigitalInOut(boton4_pin)

boton4.direction = digitalio.Direction.INPUT

boton4.pull = digitalio.Pull.DOWN



boton5= digitalio.DigitalInOut(boton5_pin)

boton5.direction = digitalio.Direction.INPUT

boton5.pull = digitalio.Pull.DOWN



boton6= digitalio.DigitalInOut(boton6_pin)

boton6.direction = digitalio.Direction.INPUT

boton6.pull = digitalio.Pull.DOWN



boton7= digitalio.DigitalInOut(boton7_pin)

boton7.direction = digitalio.Direction.INPUT

boton7.pull = digitalio.Pull.DOWN



boton8= digitalio.DigitalInOut(boton8_pin)

boton8.direction = digitalio.Direction.INPUT

boton8.pull = digitalio.Pull.DOWN



boton9= digitalio.DigitalInOut(boton9_pin)

boton9.direction = digitalio.Direction.INPUT

boton9.pull = digitalio.Pull.DOWN

