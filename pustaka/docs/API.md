# Dokumentasi API Jawakrama

Jawakrama nyedhiyakake API sing bisa digunakake ing proyek Node.js.

## Instalasi

```bash
npm install jawakrama
```

## Penggunaan

```javascript
const jawakrama = require('jawakrama');
```

## Fungsi

### `run(command, arg)`

Fungsi utama kanggo mbukak file Jawakrama utawa printah liyane.

- **Parameter:**
  - `command` (string): Path menyang file `.jwa` utawa printah (`init`).
  - `arg` (string, opsional): Argumen tambahan (contone jeneng proyek kanggo `init`).

- **Conto:**

  ```javascript
  // Mbukak file
  jawakrama.run('conto.jwa');

  // Nggawe proyek anyar
  jawakrama.run('init', 'proyek_anyar');
  ```

### `transpile(sourceCode)`

Fungsi kanggo ngowahi kode Jawakrama dadi JavaScript.

- **Parameter:**
  - `sourceCode` (string): Kode sumber Jawakrama.
- **Wangsulan:**
  - (string): Kode JavaScript asil transpilasi.

- **Conto:**

  ```javascript
  const { transpile } = require('jawakrama/pustaka/transpiler');
  
  const kodeJawa = 'serat("Sugeng Enjang");';
  const kodeJS = transpile(kodeJawa);
  console.log(kodeJS); // Output: console.log("Sugeng Enjang");
  ```
