/**
 * It takes a list of colors, a string, and a max length, and returns a string with the colors applied
 * to the string
 * @param colors - An array of colors.
 * @param data - The string you want to apply the gradient to
 * @param max_length - The maximum length of the string you want to apply the gradient to.
 * @returns A string with ANSI escape codes.
 */

import tinygradient from "tinygradient";
import tinycolor from "tinycolor2";
import ansiRegex from "ansi-regex";

export const applyGradient = (colors, data, max_length) => {
    let out = [];
    let rgb = [];
 
    /* Returning an empty string if the max_length is 0. */
    if (max_length == 0) return "";

    /* Checking if the length of the colors array is greater than the max_length. If it is, it is slicing
    the colors array to the max_length. */
    if (colors.length > max_length) {
        colors = colors.slice(0, max_length);
    }

    /* Checking if the max_length is 1. If it is, it is setting the rgb array to the rgb values of the
    first color. If it isn't, it is creating a gradient from the colors, and then it is mapping the rgb
    values of the gradient to the rgb array. */
    if (max_length == 1) rgb[0] = [tinycolor(colors[0])._r, tinycolor(colors[0])._g, tinycolor(colors[0])._b];
    else {
      let gradient = tinygradient(colors);
      let hsv = gradient.hsv(max_length, "short");
      rgb = hsv.map((color) => [color._r, color._g, color._b]);
    }
    let withoutAnsi = data.replace(ansiRegex(), "%^placeholder^%");
    let matchedAnsi = data.match(ansiRegex());
    if (!matchedAnsi) matchedAnsi = [];
    withoutAnsi = withoutAnsi.split("%^placeholder^%");
    let line = [];
    let val = 0;
    for (let i = 0; i < withoutAnsi.length; i++) {
        if (matchedAnsi[i - 1]) {
            let match = matchedAnsi[i - 1].match(
                new RegExp(/(\d+;+(?!(\dH)))|(\d+m)/g)
            );
            let cursor = matchedAnsi[i - 1].match(
                new RegExp(/(\d+$)|[A-Z]+$/g)
            );
            if (cursor) {
                line.push(matchedAnsi[i - 1]);
            }
            if (match) {
                for (let i = 0; i < match.length; i++) {
                    match[i] = match[i].replace(new RegExp(/(?=\d)*m/g), ";");
                }
                withoutAnsi[i].split("").forEach((char) => {
                    let r = Math.round(rgb[val][0]);
                    let g = Math.round(rgb[val][1]);
                    let b = Math.round(rgb[val][2]);
                    out.push(
                        `\x1b[${match.join(
                            ""
                        )}38;2;${r};${g};${b}m${char}\x1b[0m`
                    );
                    val += 1;
                });
            } else {
                withoutAnsi[i].split("").forEach((char) => {
                    let r = Math.round(rgb[val][0]);
                    let g = Math.round(rgb[val][1]);
                    let b = Math.round(rgb[val][2]);
                    out.push(`\x1b[${""}38;2;${r};${g};${b}m${char}\x1b[0m`);
                    val += 1;
                });
            }
        } else {
            withoutAnsi[i].split("").forEach((char) => {
                let r = Math.round(rgb[val][0]);
                let g = Math.round(rgb[val][1]);
                let b = Math.round(rgb[val][2]);
                out.push(`\x1b[${""}38;2;${r};${g};${b}m${char}\x1b[0m`);
                val += 1;
            });
        }
    }
    out = out.join("");
    return out;
}
