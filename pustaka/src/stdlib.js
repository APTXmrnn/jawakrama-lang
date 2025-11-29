/**
 * Jawakrama Standard Library
 */

const Wicalan = {
    pi: Math.PI,
    pangkat: Math.pow,
    akar: Math.sqrt,
    acak: Math.random,
    bunder: Math.round,
    andhap: Math.floor,
    inggil: Math.ceil,
    maks: Math.max,
    min: Math.min
};

const Serat = {
    ageng: (s) => s.toUpperCase(),
    alit: (s) => s.toLowerCase(),
    pisah: (s, sep) => s.split(sep),
    gantos: (s, a, b) => s.replace(a, b),
    trim: (s) => s.trim()
};

const Wekdal = {
    sapunika: () => new Date(),
    dinten: () => new Date().getDay(),
    wulan: () => new Date().getMonth(),
    taun: () => new Date().getFullYear()
};

module.exports = { Wicalan, Serat, Wekdal };
