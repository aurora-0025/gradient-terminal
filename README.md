# GRADIENT-TERMINAL
![](https://i.imgur.com/1Samqwu.png)

>A CLI progam to display teminal outputs as gradients.

---
## Requirements
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download/)

>For Installation, you will only need Node.js.
---
## Install
   ### Installing From npmjs
    $ npm install -g gradient-terminal
    
   ### Installing From Source
    $ git clone https://github.com/aurora-0025/gradient-terminal.git
    $ cd gradient-terminal
    $ npm install -g .
---
## Usage

### Open Terminal

```
 <command> | gterm "<color1>" "<color2>" ... 
```

### Example

```
ls | gterm red blue
```

![](https://i.imgur.com/8KsaCcA.png)

## Accepted Color Formats

| `Hex, 8-digit (RGBA) Hex`| `RGB, RGBA`           | `HSL, HSLA`             | `HSV, HSVA`              |
| :-----------------------:|:---------------------:|:-----------------------:|:------------------------:|
| "#000"                   | "rgb (255, 0, 0)"     | "hsl(0, 100%, 50%)"     | "hsv(0, 100%, 100%)"     |
| "000"                    | "rgb 255 0 0"         | "hsla(0, 100%, 50%, .5)"| "hsva(0, 100%, 100%, .5)"|
| "#369C"                  | "rgba (255, 0, 0, .5)"| "hsl(0, 100%, 50%)"     | "hsv (0 100% 100%)"      |
| "369C"                   |                       | "hsl 0 1.0 0.5"         | "hsv 0 1 1"              |
| "#f0f0f6"                |                       |                         |                          |
| "f0f0f6"                 |                       |                         |                          |
| "#f0f0f688"              |                       |                         |                          |
| "f0f0f688"               |                       |                         |                          |

## Dependencies

- [tinygradient](https://github.com/mistic100/tinygradient) - Generate gradients
- [ansi-regex](https://github.com/chalk/ansi-regex) - Regular expression for matching ANSI escape codes
