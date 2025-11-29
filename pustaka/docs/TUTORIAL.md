# Tutorial Jawakrama

Sugeng rawuh ing tutorial Jawakrama! Ing kene kita bakal sinau dhasar-dhasar pemrograman nggunakake Basa Jawa Krama.

## 1. Persiapan

Pastikan sampeyan wis nginstal Node.js lan Jawakrama.

```bash
npm install -g jawakrama
```

## 2. Program Pertama: Sugeng Rawuh

Gawe file anyar kanthi jeneng `sugeng.jwa` lan tulis kode ing ngisor iki:

```javascript
serat("Sugeng Rawuh ing Jawakrama!");
```

Jalanake kanthi printah:

```bash
jawa sugeng.jwa
```

## 3. Variabel

Ing Jawakrama, kita nggunakake `damel` (let), `tetep` (const), lan `wonten` (var).

```javascript
damel asma = "Budi";
tetep yuswa = 20;

serat("Asma kula " + asma);
serat("Yuswa kula " + yuswa);
```

## 4. Percabangan (If-Else)

Gunakake `menawi` (if) lan `sanesipun` (else).

```javascript
damel biji = 80;

menawi (biji >= 75) {
    serat("Lulus!");
} sanesipun {
    serat("Sinau malih nggih.");
}
```

## 5. Perulangan (Loop)

Gunakake `kagem` (for) utawa `salami` (while).

```javascript
kagem (damel i = 0; i < 5; i++) {
    serat("Angka: " + i);
}
```

## 6. Fungsi

Gunakake `karya` (function).

```javascript
karya salam(jeneng) {
    wangsul "Sugeng Enjang, " + jeneng;
}

serat(salam("Siti"));
```

Selamat! Sampeyan wis sinau dhasar Jawakrama.

## 7. Pengolahan Data (Array Methods)

Jawakrama ndhukung metode array modern kanthi jeneng Jawa.

- `peta` (map)
- `saring` (filter)
- `uda` (reduce)
- `pados` (find)
- `gabung` (join)
- `wonten_ing` (includes)

```javascript
damel angka = [1, 2, 3, 4, 5];

// Ngitung kuadrat
damel kuadrat = angka.peta(x => x * x);
serat(kuadrat.gabung(", ")); // Output: 1, 4, 9, 16, 25

// Nyaring angka genap
damel genap = angka.saring(x => x % 2 == 0);
serat(genap); // Output: [2, 4]
```

## 8. Pustaka Standar (Standard Library)

Jawakrama nyedhiyakake pustaka standar sing siap digunakake.

### Wicalan (Matematika)
```javascript
serat(Wicalan.pi);       // 3.14...
serat(Wicalan.akar(25)); // 5
serat(Wicalan.acak());   // Angka acak 0-1
```

### Serat (String)
```javascript
damel teks = "sugeng enjang";
serat(Serat.ageng(teks)); // SUGENG ENJANG
serat(Serat.alit("KABAR")); // kabar
```

### Wekdal (Waktu)
```javascript
serat(Wekdal.sapunika()); // Wektu saiki
serat(Wekdal.taun());     // Taun saiki
```

## 9. REPL (Mode Interaktif)

Sampeyan bisa nyoba kode Jawakrama langsung ing terminal tanpa nggawe file. Cukup ketik `jawa` utawa `jawakrama` ing terminal.

```bash
$ jawa
Sugeng Rawuh ing Jawakrama REPL (v1.0.0)
Ketik 'kendel' utawi Ctrl+C kangge medal.

jawa> serat("Halo");
Halo
jawa> 1 + 1
2
```
