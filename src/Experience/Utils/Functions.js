export function random(min, max)
{
    return Math.random() * (max - min) + min;
}

export function clamp(value, min, max)
{
    return Math.min(Math.max(value, min), max);
}

export const range = (value, inMin, inMax, outMin, outMax) =>
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
