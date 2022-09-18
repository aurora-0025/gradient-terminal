#!/usr/bin/env node

import ansiRegex from "ansi-regex";
import tinycolor from "tinycolor2";
import { applyGradient } from "./gradient.js";

let args;
let gradientColors;

if (process.stdin.isTTY) {
    console.log(`\x1b[1;31;4mMissing Pipe Command\x1b[0m`)
    console.log(`\x1b[1musage: \x1b[1;31;4;1m<command>\x1b[24;0m | gterm <color1 color2 ...>\x1b[0m`);
} else {
    process.stdin.resume();
    // Gather all data
    process.stdin.on("data", function (chunk) {
        let data = chunk.toString("utf8");
        main(data);
    });

    // Save when finished
    process.stdin.on("end", function () {
        /* It resets the color of the terminal. */
        process.stdout.write("\x1b[0m");
    });
}

const main = (data) => {
    let invalidColors = [];
    /* Getting the arguments */
    [, , ...args] = process.argv;
    gradientColors = args;
    /* Checking if the user has provided any colors. If not, it will print the usage. */
    if (!gradientColors[0]) {
        console.log(`\x1b[1;31;4mMissing Colors\x1b[0m`)
        console.log(`\x1b[1musage: <command> | gterm \x1b[1;31;4;1m<color1 color2 ...>\x1b[0m`);
        return;
    }

    /* If the user only provides one color, it will duplicate it so that the gradient can be applied. */
    if (gradientColors.length == 1) {
        gradientColors.push(gradientColors[0]);
    }

    /* Checking if the colors are valid. */
    for (const color of gradientColors) {
        if (!tinycolor(color).isValid()) {
            invalidColors.push(color);
        }
    }
    if (invalidColors.length != 0) {
        console.log(`\x1b[1;31;4mInvalid Colors\x1b[0m`)
        console.log(`\x1b[1m${invalidColors.join(" ")}\x1b[0m`);
        return;
    }

    let lines = data.split("\n");
    /* Getting the length of the longest line. */
    let max_length = Math.max(
        ...lines.map((el) => {
            el = el.replace(ansiRegex(), "");
            return el.length;
        })
    );

    for (let i = 0; i < lines.length; i++) {
        /* Applying the gradient to the line. */
        let line = applyGradient(gradientColors, lines[i], max_length);
        process.stdout.write(line);
        if (i != lines.length - 1) process.stdout.write("\n");
    }
}
