const cekBulat = (n) => Number.isInteger(n);

const cekBilKuadrat = (n) => typeof n === 'number' && n >= 0 && cekBulat(Math.sqrt(n));

// Copyright (c) 2011 Alexei Kourbatov, www.JavaScripter.net 

// function FaktorTerkecil(n) returns:
// * the smallest prime that divides n
// * NaN if n is NaN or Infinity
// *  0  if n is 0
// *  1  if n=1, n=-1, or n is not an integer

const faktorPrimaTerkecil = (n) => {
    // 1. Validasi awal: tolak jika bukan angka atau bernilai tak terhingga (Infinity)
    if (typeof n !== 'number' || !Number.isFinite(n)) return NaN;

    // 2. Gunakan nilai absolut agar fungsi tetap bekerja untuk bilangan negatif (misal -49 menjadi 49)
    n = Math.abs(n);

    // 3. Tolak angka desimal, dan atur batasan untuk 0 dan 1
    if (!Number.isInteger(n) || n === 0) return 0; 
    if (n === 1) return 1;

    // 4. Cek faktor prima dasar (2, 3, 5)
    if (n % 2 === 0) return 2;  
    if (n % 3 === 0) return 3;  
    if (n % 5 === 0) return 5;  

    // 5. Wheel Factorization (Lompatan 30)
    const m = Math.sqrt(n);
    for (let i = 7; i <= m; i += 30) {
        if (n % i === 0) return i;
        if (n % (i + 4) === 0) return i + 4;
        if (n % (i + 6) === 0) return i + 6;
        if (n % (i + 10) === 0) return i + 10;
        if (n % (i + 12) === 0) return i + 12;
        if (n % (i + 16) === 0) return i + 16;
        if (n % (i + 22) === 0) return i + 22;
        if (n % (i + 24) === 0) return i + 24;
    }

    // 6. Jika tidak bisa dibagi apapun, maka angka tersebut adalah bilangan prima itu sendiri
    return n;
};
   

   
   // function cekPrima(n) returns:
   // - false if n is NaN or not a finite integer
   // - true  if n is prime
   // - false otherwise
   
const cekPrima = (n) => {
    // 1. Tolak otomatis jika bukan bilangan bulat, atau jika kurang dari 2
    if (!Number.isInteger(n) || n < 2) {
        return false;
    }
    
    // 2. Kembalikan hasil perbandingan (true jika sama, false jika beda)
    return n === faktorPrimaTerkecil(n);
};
   
   // function faktorisasiPrima(n) returns:
   // * a string containing the prime factorization of n
   // * n.toString() if the factrization cannot be found
   
const faktorisasiPrima = (n) => {
    // 1. Validasi: tolak jika bukan bilangan bulat, atau jika nilainya 0, 1, atau -1
    if (!Number.isInteger(n) || n === 0 || Math.abs(n) === 1) {
        return n.toString();
    }
    
    // 2. Tangani bilangan negatif secara rekursif
    if (n < 0) {
        return `-${faktorisasiPrima(-n)}`;
    }
    
    // 3. Dapatkan faktor prima terkecil
    const minFactor = faktorPrimaTerkecil(n);
    
    // 4. Base case (Berhenti jika n adalah bilangan prima itu sendiri)
    if (n === minFactor) {
        return n.toString();
    }
    
    // 5. Rangkai string menggunakan Template Literals dan lanjutkan rekursi
    return `${minFactor}*${faktorisasiPrima(n / minFactor)}`;
};
   
   // function primaBerikutnya(n) returns:
   // * the smallest prime greater than n
   // * NaN if this prime is not a representable integer
   
const primaBerikutnya = (n) => {
    // 1. Validasi tipe data dan pastikan nilainya terhingga
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        return NaN;
    }
    
    // 2. Bilangan prima terkecil adalah 2
    if (n < 2) {
        return 2;
    }
    
    // 3. Bulatkan ke bawah untuk menangani input desimal (misal 2.5 menjadi 2)
    n = Math.floor(n);
    
    // 4. Tentukan titik mulai (selalu cari bilangan ganjil berikutnya)
    // Jika n=2 (genap) -> 2 + 0 + 1 = 3
    // Jika n=3 (ganjil) -> 3 + 1 + 1 = 5
    const nilaiAwal = n + (n % 2) + 1;
    
    // 5. Looping hanya mengecek bilangan ganjil sampai batas aman integer JavaScript
    for (let i = nilaiAwal; i <= Number.MAX_SAFE_INTEGER; i += 2) {
        if (cekPrima(i)) {
            return i;
        }
    }
    
    // 6. Mengembalikan NaN jika tidak ditemukan dalam batas aman
    return NaN;
};
   
/**
 * Menentukan anggota terkecil dari pasangan Bilangan Prima Kembar (Twin Primes) 
 * berikutnya yang bernilai lebih besar dari n.
 * * Pasangan prima kembar adalah dua bilangan prima yang memiliki selisih tepat 2 
 * (contoh: 3 & 5, 5 & 7, 11 & 13).
 * Algoritma ini menggunakan sifat matematis di mana semua bilangan prima 
 * (selain 2 dan 3) pasti terletak di sekitar kelipatan 6 (yaitu 6k - 1 dan 6k + 1).
 */
const primaKembarBerikutnya = (n) => {
    // 1. Validasi tipe data dan batas terhingga
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        return NaN; 
    }

    // 2. Tangani kasus dasar (Pasangan Prima Kembar terkecil adalah 3 & 5)
    // Jika n kurang dari 3, anggota kembar terkecil berikutnya adalah 3
    if (n < 3) return 3;
    // Jika n kurang dari 5, anggota kembar terkecil berikutnya adalah 5
    if (n < 5) return 5;

    // 3. Bulatkan nilai n ke bawah agar aman dari angka desimal
    n = Math.floor(n);

    // 4. Cari titik mulai pada kelipatan 6 terdekat
    const nilaiAwal = 6 * Math.ceil((n + 2) / 6);

    // 5. Looping dengan lompatan 6
    for (let i = nilaiAwal; i <= Number.MAX_SAFE_INTEGER; i += 6) {
        // Cek apakah angka sebelum (i-1) dan sesudah (i+1) kelipatan 6 adalah prima
        if (cekPrima(i - 1) && cekPrima(i + 1)) {
            return i - 1; // Mengembalikan anggota terkecil dari pasangan tersebut
        }
    }

    return NaN;
};
   
   // function primaKuadratBerikutnya(n) returns:
   // * the smallest prime in the next prime quadruplet greater than n
   // * NaN if such a prime is not a representable integer
   
   function primaKuadratBerikutnya(n) {
    if (isNaN(n) || !isFinite(n)) return NaN; 
    if (n<11) return 11;
    for (let i=30*Math.ceil(Math.floor(n-10)/30); i<9007199254740880; i+=30) {
     if (pscreen(i+11) && pscreen(i+13) && pscreen(i+17) && pscreen(i+19)
      && cekPrima(i+11) && cekPrima(i+13) && cekPrima(i+17) && cekPrima(i+19))
       return i+11;
    }
    return NaN;
   }
   
/**
 * Menentukan anggota pertama dari kelompok Bilangan Prima Kuadruplet 
 * (Prime Quadruplet) berikutnya yang bernilai lebih besar dari n.
 * * * Prima Kuadruplet adalah konstelasi empat bilangan prima berdekatan 
 * dengan jarak tetap yaitu {p, p+2, p+6, p+8}.
 * * Semua kuadruplet (kecuali yang dimulai dengan angka 5) secara matematis 
 * selalu berada pada posisi {30k+11, 30k+13, 30k+17, 30k+19}.
 */
const primaKuadrupletBerikutnya = (n) => {
    // 1. Validasi tipe data dan pastikan nilainya terhingga
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        return NaN; 
    }

    // 2. Tangani basis kasus untuk kuadruplet spesial pertama dan kedua
    // Kuadruplet terkecil di dunia matematika adalah {5, 7, 11, 13}
    if (n < 5) return 5;
    // Kuadruplet kedua adalah {11, 13, 17, 19}
    if (n < 11) return 11;

    // 3. Bulatkan ke bawah agar aman dari input desimal
    n = Math.floor(n);

    // 4. Hitung titik mulai kelipatan 30. 
    // Rumus ini memastikan i + 11 akan selalu lebih besar dari n
    const nilaiAwal = 30 * Math.ceil((n - 10) / 30);

    // 5. Looping pencarian dengan lompatan 30
    for (let i = nilaiAwal; i <= Number.MAX_SAFE_INTEGER; i += 30) {
        // Cek keempat titik kuadruplet. 
        // Karena fungsi cekPrima sudah menggunakan Wheel Factorization yang sangat cepat,
        // kita tidak perlu lagi menggunakan fungsi bantuan pscreen().
        if (
            cekPrima(i + 11) && 
            cekPrima(i + 13) && 
            cekPrima(i + 17) && 
            cekPrima(i + 19)
        ) {
            return i + 11; // Kembalikan angka pertama dari kuadruplet yang ditemukan
        }
    }

    // Mengembalikan NaN jika tidak ditemukan dalam batas komputasi JavaScript
    return NaN;
};

const faktorial = (n) => {
    // 1. Validasi yang sama kuatnya
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        return NaN;
    }

    if (n === 0 || n === 1) return 1;

    // 2. Gunakan perulangan (looping) alih-alih rekursi
    let hasil = 1;
    for (let i = 2; i <= n; i++) {
        hasil *= i;
    }
    
    return hasil;
};

const daftarFaktorPrima = (n) => {
    // 1. Validasi standar MATEMATIKIN
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
        throw new Error("Input harus berupa bilangan bulat positif (>= 1)");
    }

    // 2. Siapkan array kosong untuk menampung hasil
    let hasil = [];

    // 3. Eksekusi pencarian berulang (looping)
    while (n !== 1) {
        // Panggil fungsi faktorPrimaTerkecil yang sudah kita buat sebelumnya
        let faktor = faktorPrimaTerkecil(n);
        
        // Masukkan faktor yang ditemukan ke dalam array
        hasil.push(faktor);
        
        // Bagi n dengan faktor tersebut untuk melanjutkan pencarian
        n /= faktor;
    }

    return hasil;
};

// ==========================================
// FUNGSI HELPER (Tidak dipanggil oleh user)
// ==========================================

const _fpbDuaAngka = (a, b) => {
    // Ubah ke nilai absolut untuk menangani angka negatif
    a = Math.abs(a);
    b = Math.abs(b);
    
    // Algoritma Euclidean super cepat
    while (b !== 0) {
        let sisa = a % b;
        a = b;
        b = sisa;
    }
    return a;
};

const _kpkDuaAngka = (a, b) => {
    // KPK yang melibatkan angka 0 selalu 0
    if (a === 0 || b === 0) return 0;
    
    // Rumus mutlak: (A x B) / FPB
    return Math.abs(a * b) / _fpbDuaAngka(a, b);
};


// ==========================================
// FUNGSI UTAMA MATEMATIKIN (Bisa diekspor)
// ==========================================

const fpb = (...angka) => {
    // Deteksi otomatis: apakah user memasukkan Array fpb([12,24]) 
    // atau parameter berjejer fpb(12, 24, 36)
    const deretAngka = Array.isArray(angka[0]) ? angka[0] : angka;
    
    // Cegah error jika input kosong
    if (deretAngka.length === 0) return NaN;
    
    // Validasi ketat: semua angka wajib bilangan bulat
    if (!deretAngka.every(n => typeof n === 'number' && Number.isInteger(n))) {
        throw new Error("MATEMATIKIN: Semua input FPB harus berupa bilangan bulat.");
    }

    // Terapkan reduce menggunakan helper
    return deretAngka.reduce((hasilSementara, n) => _fpbDuaAngka(hasilSementara, n));
};

const kpk = (...angka) => {
    const deretAngka = Array.isArray(angka[0]) ? angka[0] : angka;
    
    if (deretAngka.length === 0) return NaN;
    
    if (!deretAngka.every(n => typeof n === 'number' && Number.isInteger(n))) {
        throw new Error("MATEMATIKIN: Semua input KPK harus berupa bilangan bulat.");
    }

    return deretAngka.reduce((hasilSementara, n) => _kpkDuaAngka(hasilSementara, n));
};

const faktorKuadratTerbesar = (n) => {
    // 1. Validasi: Pastikan input adalah bilangan bulat positif yang valid
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
        return NaN;
    }

    // 2. Tentukan titik mulai dari akar kuadrat tertinggi yang mungkin
    let k = Math.floor(Math.sqrt(n));

    // 3. Looping menurun untuk mencari faktor kuadrat terbesar pertama yang cocok
    while (k > 1) {
        // Menggunakan (k * k) jauh lebih cepat daripada Math.pow(k, 2)
        if (n % (k * k) === 0) {
            break; // Langsung berhenti begitu ditemukan
        }
        k--; // Kurangi nilai k jika belum membagi habis
    }

    // 4. Mengembalikan nilai akar dari faktor kuadrat tersebut (atau 1 jika tidak ada)
    return k;
};

const diskriminan = (a, b, c) => {
    // 1. Validasi: Pastikan semua input adalah angka (termasuk desimal, karena koefisien bisa berupa desimal)
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
        return NaN;
    }

    // 2. Validasi nilai terhingga
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
        return NaN;
    }

    // 3. Syarat mutlak persamaan kuadrat: 'a' tidak boleh 0
    if (a === 0) {
        throw new Error("MATEMATIKIN: Nilai koefisien 'a' tidak boleh 0 pada persamaan kuadrat.");
    }

    // 4. Eksekusi rumus D = b^2 - 4ac
    return (b * b) - (4 * a * c);
};
  
  //memilih bilangan bulat dari 0 hingga n
const bilBulatAcak = (n) => {
    // 1. Validasi: Pastikan input adalah angka dan tidak bernilai negatif
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0) {
        return NaN;
    }

    // 2. Bulatkan n ke bawah untuk berjaga-jaga jika ada input desimal
    n = Math.floor(n);

    // 3. Kalikan dengan (n + 1) agar rentang acaknya mencakup angka n
    return Math.floor(Math.random() * (n + 1));
};

/**
 * Menghitung determinan dari sebuah matriks persegi (N x N)
 * Menggunakan metode Ekspansi Kofaktor sepanjang baris pertama
 */
const determinan = (matriks) => {
    // 1. Validasi: Pastikan input adalah array dan tidak kosong
    if (!Array.isArray(matriks) || matriks.length === 0) {
        throw new Error("MATEMATIKIN: Input harus berupa matriks (array 2D).");
    }

    const n = matriks.length;

    // 2. Validasi: Pastikan matriks berbentuk persegi (N x N)
    const isPersegi = matriks.every(baris => Array.isArray(baris) && baris.length === n);
    if (!isPersegi) {
        throw new Error("MATEMATIKIN: Matriks harus berbentuk persegi (jumlah baris = jumlah kolom).");
    }

    // 3. Basis Kasus (Base Cases) untuk menghentikan rekursi
    if (n === 1) {
        return matriks[0][0]; // Determinan matriks 1x1 adalah angkanya itu sendiri
    }
    if (n === 2) {
        // Rumus matriks 2x2: (ad - bc)
        return (matriks[0][0] * matriks[1][1]) - (matriks[0][1] * matriks[1][0]); 
    }

    // 4. Ekspansi Kofaktor untuk matriks 3x3 ke atas
    let hasil = 0;
    
    // Kita selalu melakukan ekspansi sepanjang baris pertama (indeks 0)
    for (let i = 0; i < n; i++) {
        // Tentukan tanda: genap = positif, ganjil = negatif
        // Ini jauh lebih cepat daripada menggunakan Math.pow(-1, i)
        const tanda = (i % 2 === 0) ? 1 : -1;
        
        // Buat sub-matriks secara fungsional (Sangat Cepat & Hemat Memori)
        const subMatriks = matriks
            .slice(1) // Ambil semua baris di bawah baris pertama
            .map(baris => baris.filter((_, indeksKolom) => indeksKolom !== i)); // Hapus kolom ke-i

        // Eksekusi rekursi dan tambahkan ke total hasil
        hasil += tanda * matriks[0][i] * determinan(subMatriks);
    }

    return hasil;
};

/**
 * Menghasilkan Matriks Minor dari sebuah matriks persegi.
 * Setiap elemen pada posisi (i, j) digantikan oleh determinan sub-matriks
 * setelah baris ke-i dan kolom ke-j dihilangkan.
 */
const matriksMinor = (matriks) => {
    // 1. Validasi Matriks Persegi
    if (!Array.isArray(matriks) || matriks.length === 0) {
        throw new Error("MATEMATIKIN: Input harus berupa matriks (array 2D).");
    }
    const n = matriks.length;
    const isPersegi = matriks.every(baris => Array.isArray(baris) && baris.length === n);
    if (!isPersegi) {
        throw new Error("MATEMATIKIN: Matriks harus berbentuk persegi untuk mencari minor.");
    }

    // 2. Kasus Khusus Matriks 1x1
    // Secara definisi matematis standar, minor dari matriks 1x1 dianggap 1
    if (n === 1) {
        return [[1]]; 
    }

    // 3. Proses Pembentukan Matriks Minor
    // Menggunakan dua lapis .map() untuk iterasi baris (i) dan kolom (j)
    return matriks.map((baris, i) => {
        return baris.map((_, j) => {
            
            // a. Ciptakan sub-matriks (coret baris ke-i dan kolom ke-j)
            const subMatriks = matriks
                .filter((_, indeksBaris) => indeksBaris !== i) // Buang baris ke-i
                .map(b => b.filter((_, indeksKolom) => indeksKolom !== j)); // Buang kolom ke-j
            
            // b. Hitung determinan dari sub-matriks tersebut dan jadikan nilai elemen baru
            return determinan(subMatriks);
        });
    });
};

/**
 * Menghasilkan Matriks Kofaktor dari sebuah matriks persegi.
 * Merupakan hasil kali elemen Matriks Minor dengan pola tanda (-1)^(i+j).
 */
const matriksKofaktor = (matriks) => {
    // 1. Dapatkan matriks minor menggunakan fungsi yang sudah kita buat sebelumnya
    const minor = matriksMinor(matriks);

    // 2. Modifikasi setiap elemen dengan pola tanda (checkerboard pattern)
    return minor.map((baris, i) => {
        return baris.map((nilai, j) => {
            
            // Penentuan tanda: Jika jumlah indeks (i+j) genap = 1, jika ganjil = -1
            const tanda = ((i + j) % 2 === 0) ? 1 : -1;
            
            // Kalikan nilai minor dengan tanda
            let kofaktor = nilai * tanda;
            
            // Trik JavaScript: Bersihkan anomali angka -0 menjadi 0 murni
            if (kofaktor === -0) kofaktor = 0;
            
            return kofaktor;
        });
    });
};

/**
 * Melakukan Transpose pada matriks (mengubah baris menjadi kolom dan sebaliknya).
 * Mendukung matriks persegi (N x N) maupun persegi panjang (M x N).
 */
const transpose = (matriks) => {
    // 1. Validasi: Pastikan input adalah matriks (array 2D) yang valid dan tidak kosong
    if (!Array.isArray(matriks) || matriks.length === 0 || !Array.isArray(matriks[0])) {
        throw new Error("MATEMATIKIN: Input harus berupa matriks (array 2D) yang tidak kosong.");
    }

    // 2. Proses Transpose dengan pendekatan fungsional
    // matriks[0].map(...) -> Iterasi berdasarkan jumlah kolom yang ada
    return matriks[0].map((_, indeksKolom) => {
        
        // matriks.map(...) -> Ambil nilai dari setiap baris pada posisi indeksKolom
        return matriks.map(baris => baris[indeksKolom]);
        
    });
};

/**
 * Menghasilkan Matriks Adjoin (Adjugate) dari sebuah matriks persegi.
 * Adjoin adalah transpose dari matriks kofaktor.
 */
const adjoin = (matriks) => {
    // 1. Validasi Input
    if (!Array.isArray(matriks) || matriks.length === 0) {
        throw new Error("MATEMATIKIN: Input harus berupa matriks yang valid.");
    }

    const n = matriks.length;

    // 2. Optimasi untuk Matriks 2x2 (Rumus Cepat)
    // Ini jauh lebih cepat daripada menghitung minor, kofaktor, lalu transpose.
    if (n === 2) {
        return [
            [matriks[1][1], -matriks[0][1]],
            [-matriks[1][0], matriks[0][0]]
        ];
    }

    // 3. Rumus Umum untuk Matriks 3x3 ke atas
    // Adjoin(A) = Transpose(Kofaktor(A))
    return transpose(matriksKofaktor(matriks));
};

/**
 * Melakukan operasi perkalian pada matriks.
 * Mendukung dua mode:
 * 1. Skalar x Matriks (a dikali M)
 * 2. Matriks x Matriks (A dikali B)
 */
const kaliMatriks = (pengali, matriks) => {
    // 1. MODE PERKALIAN SKALAR (Skalar x Matriks)
    if (typeof pengali === 'number') {
        if (!Array.isArray(matriks) || matriks.length === 0) {
            throw new Error("MATEMATIKIN: Parameter kedua harus berupa matriks.");
        }
        // Kalikan setiap elemen matriks dengan skalar menggunakan .map()
        return matriks.map(baris => baris.map(elemen => pengali * elemen));
    }

    // 2. MODE PERKALIAN MATRIKS (Matriks x Matriks)
    if (Array.isArray(pengali) && Array.isArray(matriks)) {
        const barisA = pengali.length;
        const kolomA = pengali[0].length;
        const barisB = matriks.length;
        const kolomB = matriks[0].length;

        // Validasi Syarat Mutlak Perkalian Matriks
        if (kolomA !== barisB) {
            throw new Error("MATEMATIKIN: Jumlah kolom matriks pertama harus sama dengan jumlah baris matriks kedua.");
        }

        // Proses Perkalian Matriks dengan gaya fungsional (Sangat Elegan)
        return pengali.map(baris => 
            // Iterasi sepanjang jumlah kolom matriks B
            matriks[0].map((_, j) => 
                // Kalkulasi Dot Product (Baris A x Kolom B)
                baris.reduce((total, elemenA, k) => total + (elemenA * matriks[k][j]), 0)
            )
        );
    }

    // Jika input tidak dikenali
    throw new Error("MATEMATIKIN: Tipe data pengali tidak valid (harus angka atau matriks).");
};

const invers = (matriks) => {
    const det = determinan(matriks);
    
    // Jika determinan adalah 0, matriks tidak memiliki invers (singular)
    if (det === 0) {
        throw new Error("MATEMATIKIN: Matriks tidak memiliki invers karena determinannya 0.");
    }

    const adj = adjoin(matriks);

    // Kalikan 1/det dengan setiap elemen di matriks Adjoin
    return adj.map(baris => baris.map(elemen => elemen / det));
};

function invMat2(matriks){
    let dete = determinan(matriks);
    return [[fraksi(matriks[1][1],dete),fraksi(-matriks[0][1],dete)],[fraksi(-matriks[1][0],dete),fraksi(matriks[0][0],dete)]]
}

//Bentuk matriks
/**
 * Mengubah array 2D matriks menjadi string kode LaTeX format pmatrix.
 * Sangat ideal untuk menjembatani output data dengan visualizer (seperti MathJax).
 */
const bentukMatriks = (matriks) => {
    // 1. Validasi: Pastikan input valid agar tidak error saat di-map
    if (!Array.isArray(matriks) || matriks.length === 0) return "";

    // 2. Eksekusi penggabungan string
    const isiLatex = matriks
        .map(baris => baris.join(' & ')) // Gabungkan tiap elemen baris dengan ' & '
        .join(' \\\\ ');                 // Gabungkan hasil tiap baris dengan ' \\ '

    // 3. Rangkai dengan template literal (backtick) standar
    return `\\begin{pmatrix} ${isiLatex} \\end{pmatrix}`;
};

/**
 * Menjumlahkan serangkaian angka.
 * Mendukung input berupa array ( misal: [1, 2, 3] ) 
 * maupun parameter berjejer ( misal: 1, 2, 3 ).
 */
const jumlah = (...angka) => {
    // 1. Deteksi apakah input berupa array atau angka berjejer
    const deretAngka = Array.isArray(angka[0]) ? angka[0] : angka;

    // 2. Kembalikan 0 jika tidak ada angka yang dimasukkan
    if (deretAngka.length === 0) return 0;

    // 3. Validasi ketat: Pastikan semua elemen adalah angka terhingga (bukan teks/NaN)
    if (!deretAngka.every(n => typeof n === 'number' && Number.isFinite(n))) {
        throw new Error("MATEMATIKIN: Semua elemen yang dijumlahkan harus berupa angka yang valid.");
    }

    // 4. Eksekusi penjumlahan dengan reduce dan nilai awal 0
    return deretAngka.reduce((akumulator, nilaiSaatIni) => akumulator + nilaiSaatIni, 0);
};
  
/**
 * Menghitung jumlah kuadrat dari serangkaian angka.
 * Mendukung input berupa array maupun parameter berjejer.
 */
const jumlahKuadrat = (...angka) => {
    // 1. Fleksibilitas input (mendukung array tunggal atau angka berjejer)
    const deretAngka = Array.isArray(angka[0]) ? angka[0] : angka;

    // 2. Kembalikan 0 jika tidak ada input
    if (deretAngka.length === 0) return 0;

    // 3. Validasi ketat untuk menghindari error komputasi
    if (!deretAngka.every(n => typeof n === 'number' && Number.isFinite(n))) {
        throw new Error("MATEMATIKIN: Semua elemen harus berupa angka yang valid.");
    }

    // 4. Eksekusi reduce yang benar: akumulator HANYA ditambah, nilaiSaatIni yang dikuadratkan
    return deretAngka.reduce((akumulator, nilaiSaatIni) => {
        return akumulator + (nilaiSaatIni * nilaiSaatIni);
    }, 0); // Nilai awal akumulator wajib 0
};

/**
 * Menghitung panjang (magnitudo) dari sebuah vektor n-dimensi.
 * Mendukung input array [x, y, z] maupun angka berjejer (x, y, z).
 */
const panjangVektor = (...vektor) => {
    // 1. Deteksi format input
    const elemenVektor = Array.isArray(vektor[0]) ? vektor[0] : vektor;

    // 2. Kembalikan 0 jika vektor kosong
    if (elemenVektor.length === 0) return 0;

    // 3. Eksekusi perhitungan menggunakan fungsi bawaan MATEMATIKIN
    return Math.sqrt(jumlahKuadrat(elemenVektor));
};

/**
 * Menghitung Perkalian Titik (Dot Product) dari dua vektor.
 * Mengembalikan sebuah nilai skalar (angka tunggal).
 */
const dotVektor = (vektor1, vektor2) => {
    // 1. Validasi Input: Pastikan keduanya adalah Array
    if (!Array.isArray(vektor1) || !Array.isArray(vektor2)) {
        throw new Error("MATEMATIKIN: Kedua input harus berupa array vektor.");
    }

    // 2. Validasi Syarat Mutlak: Dimensi (panjang) harus sama
    if (vektor1.length !== vektor2.length) {
        throw new Error("MATEMATIKIN: Operasi Dot Product gagal. Kedua vektor harus memiliki dimensi yang sama.");
    }

    // 3. Kembalikan 0 jika vektor kosong
    if (vektor1.length === 0) return 0;

    // 4. Eksekusi menggunakan reduce untuk gaya fungsional yang elegan
    return vektor1.reduce((total, nilaiSaatIni, indeks) => {
        // Kalikan elemen vektor1 dengan elemen vektor2 pada indeks yang sama
        return total + (nilaiSaatIni * vektor2[indeks]);
    }, 0);
};

/**
 * Menghitung Perkalian Silang (Cross Product) dari dua buah vektor 3D.
 * Mengembalikan array vektor baru yang tegak lurus terhadap kedua vektor input.
 */
const crossVektor = (vektor1, vektor2) => {
    // 1. Validasi Input: Pastikan keduanya adalah Array
    if (!Array.isArray(vektor1) || !Array.isArray(vektor2)) {
        throw new Error("MATEMATIKIN: Kedua input harus berupa array vektor.");
    }

    // 2. Validasi Syarat Mutlak: Harus Vektor 3D
    if (vektor1.length !== 3 || vektor2.length !== 3) {
        throw new Error("MATEMATIKIN: Operasi Cross Product hanya berlaku untuk vektor 3 dimensi (terdiri dari komponen x, y, z).");
    }

    // 3. Eksekusi Rumus Eksplisit (Sangat Cepat & Tanpa Looping)
    return [
        (vektor1[1] * vektor2[2]) - (vektor1[2] * vektor2[1]), // Komponen i (Sumbu X)
        (vektor1[2] * vektor2[0]) - (vektor1[0] * vektor2[2]), // Komponen j (Sumbu Y)
        (vektor1[0] * vektor2[1]) - (vektor1[1] * vektor2[0])  // Komponen k (Sumbu Z)
    ];
};

/**
 * Menghitung Proyeksi Vektor Ortogonal dari vektor asal ke vektor tujuan.
 * Mengembalikan array vektor baru.
 */
const proyeksiVektor = (vektorAsal, vektorTujuan) => {
    // 1. Validasi Input
    if (!Array.isArray(vektorAsal) || !Array.isArray(vektorTujuan)) {
        throw new Error("MATEMATIKIN: Input harus berupa array vektor.");
    }
    if (vektorAsal.length !== vektorTujuan.length) {
        throw new Error("MATEMATIKIN: Dimensi kedua vektor harus sama.");
    }

    // 2. Hitung kuadrat dari panjang vektor tujuan (Penyebut)
    // Menggunakan dotVektor(B, B) jauh lebih cepat dan presisi daripada Math.pow(panjang, 2)
    const penyebut = dotVektor(vektorTujuan, vektorTujuan);

    // 3. Validasi pembagian dengan nol
    // Jika vektor tujuan adalah vektor nol (0, 0, 0), proyeksi tidak terdefinisi
    if (penyebut === 0) {
        throw new Error("MATEMATIKIN: Vektor tujuan tidak boleh berupa vektor nol.");
    }

    // 4. Hitung konstanta skalar (Pembilang / Penyebut)
    const skalar = dotVektor(vektorAsal, vektorTujuan) / penyebut;

    // 5. Kalikan vektor tujuan dengan konstanta skalar menggunakan .map()
    return vektorTujuan.map(elemen => skalar * elemen);
};

/**
 * Menghitung Proyeksi Skalar Ortogonal (panjang proyeksi) dari vektor asal ke vektor tujuan.
 * Mengembalikan sebuah angka (skalar).
 */
const proyeksiSkalar = (vektorAsal, vektorTujuan) => {
    const panjangTujuan = panjangVektor(vektorTujuan);
    
    // Cegah pembagian dengan nol
    if (panjangTujuan === 0) {
        throw new Error("MATEMATIKIN: Vektor tujuan tidak boleh berupa vektor nol.");
    }
    
    // Langsung manfaatkan fungsi dotVektor yang sudah ada
    return dotVektor(vektorAsal, vektorTujuan) / panjangTujuan;
};

/**
 * Menghitung besar sudut yang dibentuk oleh dua vektor.
 * Mengembalikan hasil dalam satuan derajat (0 hingga 180).
 */
const sudutVektor = (vektor1, vektor2) => {
    const mag1 = panjangVektor(vektor1);
    const mag2 = panjangVektor(vektor2);
    
    if (mag1 === 0 || mag2 === 0) {
        throw new Error("MATEMATIKIN: Sudut tidak dapat dihitung jika ada vektor nol.");
    }
    
    // Hitung nilai cosinus
    const cosTheta = dotVektor(vektor1, vektor2) / (mag1 * mag2);
    
    // Keamanan ekstra: JavaScript terkadang menghasilkan angka seperti 1.0000000002 
    // akibat inakurasi floating-point, yang membuat Math.acos() menjadi NaN.
    // Kita batasi rentangnya murni dari -1 hingga 1.
    const cosAman = Math.max(-1, Math.min(1, cosTheta));
    
    // Cari sudut dalam radian, lalu konversi ke derajat
    const sudutRadian = Math.acos(cosAman);
    return (sudutRadian * 180) / Math.PI; 
};

/**
 * Mencari Vektor Satuan dari sebuah vektor.
 * Mengembalikan array vektor baru dengan panjang 1.
 */
const vektorSatuan = (vektor) => {
    const elemenVektor = Array.isArray(vektor[0]) ? vektor[0] : vektor;
    const panjang = panjangVektor(elemenVektor);
    
    if (panjang === 0) {
        throw new Error("MATEMATIKIN: Vektor nol tidak memiliki vektor satuan.");
    }
    
    // Bagi setiap komponen vektor dengan panjang totalnya
    return elemenVektor.map(komponen => komponen / panjang);
};

/**
 * Menjumlahkan atau mengurangkan komponen dari dua vektor.
 * Parameter operasi menerima string: 'tambah' (default) atau 'kurang'.
 */
const aritmetikaVektor = (vektor1, vektor2, operasi = 'tambah') => {
    if (!Array.isArray(vektor1) || !Array.isArray(vektor2) || vektor1.length !== vektor2.length) {
        throw new Error("MATEMATIKIN: Input harus berupa array vektor dengan dimensi yang sama.");
    }
    
    return vektor1.map((komponen, indeks) => {
        return operasi === 'kurang' 
            ? komponen - vektor2[indeks] 
            : komponen + vektor2[indeks];
    });
};

/**
 * Menyederhanakan bentuk akar (sqrt(n)) menjadi bentuk a\sqrt{b}.
 * Mengembalikan string dalam format LaTeX.
 */
const sederhanakanAkar = (n) => {
    // 1. Validasi Input: Pastikan angka adalah bilangan bulat positif atau nol
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error("MATEMATIKIN: Input harus berupa bilangan bulat positif atau nol.");
    }

    // Kasus khusus untuk angka 0
    if (n === 0) return "0";

    // 2. Panggil fungsi yang sudah kita buat sebelumnya!
    const a = faktorKuadratTerbesar(n);
    const b = n / (a * a);

    // 3. Format output LaTeX secara langsung
    
    // Basis Kasus 1: Kuadrat Sempurna (contoh: akar 36 -> "6")
    if (b === 1) {
        return `${a}`;
    }

    // Basis Kasus 2: Tidak bisa disederhanakan (contoh: akar 7 -> "\sqrt{7}")
    if (a === 1) {
        return `\\sqrt{${n}}`;
    }

    // Basis Kasus 3: Bisa disederhanakan (contoh: akar 12 -> "2\sqrt{3}")
    return `${a}\\sqrt{${b}}`;
};

/**
 * Menghasilkan bilangan bulat acak di antara dua nilai (inklusif).
 * Sangat berguna untuk menghasilkan angka soal yang bervariasi.
 */
const acakAntara = (min = 0, max = 1) => {
    // 1. Validasi: Pastikan kedua input adalah angka
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error("MATEMATIKIN: Batas minimum dan maksimum harus berupa angka.");
    }

    // 2. Bulatkan ke bawah untuk berjaga-jaga jika ada input desimal
    min = Math.floor(min);
    max = Math.floor(max);

    // 3. Keamanan Ekstra (Auto-Swap): 
    // Jika pengguna memasukkan posisi terbalik (misal max, min), 
    // fungsi Math.min dan Math.max akan otomatis mengaturnya ke posisi yang benar.
    const batasBawah = Math.min(min, max);
    const batasAtas = Math.max(min, max);

    // 4. Eksekusi pengacakan (inklusif: menyertakan batas bawah dan batas atas)
    return Math.floor(Math.random() * (batasAtas - batasBawah + 1)) + batasBawah;
};

/**
 * Memberikan tanda positif atau negatif secara acak pada sebuah angka.
 * Jika tidak ada angka yang dimasukkan, secara default akan mengembalikan 1 atau -1.
 * Sangat berguna untuk generator soal variabel/aljabar acak.
 */
const acakTanda = (n = 1) => {
    // 1. Validasi Input: Pastikan n adalah angka
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        throw new Error("MATEMATIKIN: Input harus berupa angka.");
    }

    // 2. Logika Probabilitas 50/50 (Sangat Cepat!)
    // Math.random() menghasilkan desimal antara 0 hingga 0.99...
    // Peluang angkanya di bawah 0.5 adalah persis 50%.
    return Math.random() < 0.5 ? n : -n;
};

/**
 * Menyederhanakan pecahan dan mengonversinya menjadi format LaTeX \dfrac.
 * Otomatis menangani penempatan tanda negatif yang proporsional.
 */
const pecahan = (pembilang, penyebut) => {
    // 1. Validasi Input: Pastikan keduanya adalah bilangan bulat
    if (!Number.isInteger(pembilang) || !Number.isInteger(penyebut)) {
        throw new Error("MATEMATIKIN: Pembilang dan penyebut harus berupa bilangan bulat.");
    }

    // 2. Cegah Pembagian dengan Nol
    if (penyebut === 0) {
        throw new Error("MATEMATIKIN: Penyebut pecahan tidak boleh bernilai nol.");
    }

    // 3. Kasus Khusus: Jika pembilang 0, langsung kembalikan string "0"
    if (pembilang === 0) return "0";

    // 4. Deteksi Tanda Negatif 
    // Jika hanya salah satu yang negatif, maka pecahan tersebut bernilai negatif
    const apakahNegatif = (pembilang < 0) !== (penyebut < 0);

    // 5. Gunakan nilai absolut murni untuk proses penyederhanaan
    const absPem = Math.abs(pembilang);
    const absPen = Math.abs(penyebut);
    
    // Panggil fungsi FPB yang sudah kita asah kecepatannya sebelumnya
    const faktor = fpb(absPem, absPen);

    // 6. Sederhanakan angka
    const pemSederhana = absPem / faktor;
    const penSederhana = absPen / faktor;

    // 7. Siapkan tanda minus untuk ditempelkan di depan pecahan (bukan di dalam)
    const tanda = apakahNegatif ? "-" : "";

    // 8. Output Final
    // Jika penyebutnya 1 (berarti bilangan bulat utuh), tidak perlu format dfrac
    if (penSederhana === 1) {
        return `${tanda}${pemSederhana}`;
    }

    // Kembalikan format LaTeX yang sudah bersih dan terstandarisasi
    return `${tanda}\\dfrac{${pemSederhana}}{${penSederhana}}`;
};

/**
 * Memformat angka koefisien aljabar agar sesuai standar penulisan matematika.
 * Mengubah 1 menjadi kosong (""), dan -1 menjadi tanda minus murni ("-").
 * Selalu mengembalikan tipe data String.
 */
const koefisien = (n = 0) => {
    // 1. Validasi: Pastikan input adalah angka
    if (typeof n !== 'number' || !Number.isFinite(n)) {
        throw new Error("MATEMATIKIN: Input koefisien harus berupa angka.");
    }

    // 2. Format standar aljabar
    if (n === 1) {
        return "";
    }
    
    if (n === -1) {
        // Menggunakan tanda strip standar untuk kompatibilitas LaTeX/MathJax
        return "-"; 
    }

    // 3. Pastikan angka selain 1 dan -1 dikembalikan sebagai String
    return String(n);
};

/**
 * Memformat suku konstanta (angka tanpa variabel) di ujung persamaan.
 * Pengganti dari fungsi tanda1() dan tanda4().
 */
const formatKonstanta = (n = 0) => {
    // Validasi dan hilangkan jika n adalah 0
    if (typeof n !== 'number' || !Number.isFinite(n) || n === 0) return "";
    
    // Jika negatif, otomatis membawa tanda '-'. Jika positif, tambahkan '+'
    return n < 0 ? `${n}` : `+${n}`;
};

/**
 * Memformat koefisien untuk suku lanjutan (yang menempel pada variabel).
 * Pengganti dari fungsi tanda2().
 */
const formatSuku = (n = 0) => {
    // Validasi dan hilangkan seluruh suku jika n adalah 0
    if (typeof n !== 'number' || !Number.isFinite(n) || n === 0) return "";
    
    // Kasus khusus koefisien 1 dan -1 (angka 1 disembunyikan)
    if (n === 1) return "+ ";
    if (n === -1) return "- ";
    
    // Selain itu, cetak tanda dan angkanya secara proporsional
    return n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`;
};

/**
 * Menghasilkan deret angka (array) dari batas minimum hingga maksimum.
 * Secara otomatis membuang angka 0 dari dalam deret.
 * Sangat cocok sebagai bank angka koefisien variabel.
 */
const deretTanpaNol = (min = -9, max = 9) => {
    // 1. Validasi Input
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error("MATEMATIKIN: Batas minimum dan maksimum harus berupa angka.");
    }

    // 2. Pastikan batas bawah dan atas tidak terbalik
    const batasBawah = Math.min(min, max);
    const batasAtas = Math.max(min, max);

    // 3. Generate deret angka menggunakan Array.from, lalu buang nilai 0 dengan filter
    return Array.from(
        { length: batasAtas - batasBawah + 1 }, 
        (_, i) => batasBawah + i
    ).filter(angka => angka !== 0);
};

/**
 * Membungkus angka negatif dengan tanda kurung. Sangat penting untuk 
 * menampilkan operasi substitusi aljabar agar tidak ambigu.
 * Selalu mengembalikan tipe data String.
 */
const kurungNegatif = (angka = 0) => {
    // Validasi input
    if (typeof angka !== 'number' || !Number.isFinite(angka)) return "";

    // Jika negatif, bungkus dengan kurung. Jika positif/nol, ubah ke teks biasa.
    return angka < 0 ? `(${angka})` : String(angka);
};

/**
 * Menghasilkan tanda minus "-" atau kosong "" dengan probabilitas 50:50.
 * Sangat ideal untuk mengacak tanda pada suku paling depan dari sebuah polinomial.
 */
const acakMinus = () => {
    // Manfaatkan fungsi acakTanda() yang sudah kita buat sebelumnya
    // Jika acakTanda() menghasilkan -1, kembalikan "-", jika tidak kosong ""
    return acakTanda() === -1 ? "-" : "";
};

/**
 * Menghasilkan array berisi deret bilangan bulat berurutan.
 * Otomatis menangani posisi batas bawah dan atas yang terbalik.
 */
const deretBilBul = (batasBawah = 0, batasAtas = 1) => {
    // 1. Validasi Input: Pastikan keduanya adalah bilangan bulat
    if (!Number.isInteger(batasBawah) || !Number.isInteger(batasAtas)) {
        throw new Error("MATEMATIKIN: Batas bawah dan atas harus berupa bilangan bulat.");
    }

    // 2. Keamanan Ekstra (Auto-Swap)
    // Jika input terbalik (misal batasBawah 10, batasAtas 5), fungsi ini 
    // otomatis mengurutkannya menjadi rentang 5 hingga 10.
    const min = Math.min(batasBawah, batasAtas);
    const max = Math.max(batasBawah, batasAtas);

    // 3. Eksekusi fungsional satu baris dengan Array.from
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

/**
 * 1. MESIN UTAMA: Mengacak urutan array dengan algoritma Fisher-Yates murni.
 * Menggunakan pendekatan Imutabel (mengembalikan array baru tanpa merusak array asli).
 */
const acakArray = (arr) => {
    if (!Array.isArray(arr)) throw new Error("MATEMATIKIN: Input harus berupa array.");
    
    // Gandakan array agar array soal/data asli siswa tidak ikut rusak
    const salinan = [...arr]; 
    
    for (let i = salinan.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [salinan[i], salinan[j]] = [salinan[j], salinan[i]];
    }
    return salinan;
};

/**
 * 2. Memilih sebagian elemen, lalu POSISINYA DIACAK.
 * Sangat aman meskipun di dalam array ada nilai kembar/duplikat.
 */
const pilihAcak = (arr, num = 1) => {
    if (!Array.isArray(arr) || num <= 0) return [];
    
    // Langsung acak seluruh elemen, lalu potong (slice) sebanyak yang diminta
    return acakArray(arr).slice(0, num);
};

/**
 * 3. Memilih sebagian elemen, dengan urutan TETAP TERJAGA seperti aslinya.
 */
const pilihSebagian = (arr, num = 1) => {
    if (!Array.isArray(arr) || num <= 0) return [];
    if (num >= arr.length) return [...arr];

    // Buat deret indeks (0, 1, ..., n), acak indeksnya, potong sebanyak num
    const semuaIndeks = Array.from({ length: arr.length }, (_, i) => i);
    const indeksTerpilih = acakArray(semuaIndeks).slice(0, num);
    
    // Urutkan kembali indeks yang terpilih dari kecil ke besar
    indeksTerpilih.sort((a, b) => a - b);
    
    // Tarik nilai asli berdasarkan indeks yang sudah berurutan
    return indeksTerpilih.map(indeks => arr[indeks]);
};

/**
 * 4. DERANGEMENT: Mengacak total sehingga TIDAK ADA elemen di posisi awalnya.
 * Dilengkapi "Sabuk Pengaman" agar browser tidak crash jika kondisinya mustahil.
 */
const acakDerangement = (arr) => {
    if (!Array.isArray(arr) || arr.length < 2) {
        throw new Error("MATEMATIKIN: Derangement butuh minimal 2 elemen.");
    }
    
    // Cek kemustahilan: Jika semua elemen nilainya sama persis
    if (arr.every(val => val === arr[0])) {
        throw new Error("MATEMATIKIN: Derangement mustahil untuk elemen yang identik semua.");
    }

    let batasLooping = 0;
    const batasMaksimal = 1000; // Mencegah Infinite Loop

    while (batasLooping < batasMaksimal) {
        let hasilAcak = acakArray(arr);
        
        // Pengecekan sukses: pastikan tidak ada yang posisinya sama dengan array awal
        if (hasilAcak.every((val, i) => val !== arr[i])) {
            return hasilAcak;
        }
        batasLooping++;
    }
    
    throw new Error("MATEMATIKIN: Gagal menemukan kombinasi acak total. Formasi array mungkin tidak mendukung.");
};



/**
 * Helper internal untuk menetralisir anomali floating-point JavaScript.
 * Membulatkan angka ke 10 angka di belakang koma.
 */
const _presisiTrigo = (nilai) => {
    return Math.round(nilai * 1e10) / 1e10;
};

/**
 * Menghitung nilai Sinus dari sudut dalam satuan derajat.
 */
const sin = (derajat = 0) => {
    if (typeof derajat !== 'number' || !Number.isFinite(derajat)) throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    return _presisiTrigo(Math.sin(derajat * Math.PI / 180));
};

/**
 * Menghitung nilai Cosinus dari sudut dalam satuan derajat.
 */
const cos = (derajat = 0) => {
    if (typeof derajat !== 'number' || !Number.isFinite(derajat)) throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    return _presisiTrigo(Math.cos(derajat * Math.PI / 180));
};

/**
 * Menghitung nilai Tangen dari sudut dalam satuan derajat.
 * Dilengkapi pengaman untuk sudut yang tidak terdefinisi (90, 270, dst).
 */
const tan = (derajat = 0) => {
    if (typeof derajat !== 'number' || !Number.isFinite(derajat)) throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    
    // Syarat mutlak Tangen: sudut tidak boleh kelipatan ganjil dari 90 derajat
    // (misal 90, 270, -90, 450)
    if (Math.abs(derajat % 180) === 90) {
        throw new Error(`MATEMATIKIN: Nilai Tangen untuk sudut ${derajat} derajat tidak terdefinisi (Infinity).`);
    }

    return _presisiTrigo(Math.tan(derajat * Math.PI / 180));
};
/**
 * Menghitung Cosecan (1 / sin).
 * Tidak terdefinisi pada kelipatan 180 derajat (0, 180, 360, dst).
 */
const csc = (derajat = 0) => {
    if (typeof derajat !== 'number') throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    if (derajat % 180 === 0) {
        throw new Error(`MATEMATIKIN: Cosecan untuk sudut ${derajat} derajat tidak terdefinisi (Infinity).`);
    }
    return _presisiTrigo(1 / Math.sin(derajat * Math.PI / 180));
};

/**
 * Menghitung Secan (1 / cos).
 * Tidak terdefinisi pada sudut ganjil kelipatan 90 derajat (90, 270, dst).
 */
const sec = (derajat = 0) => {
    if (typeof derajat !== 'number') throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    if (Math.abs(derajat % 180) === 90) {
        throw new Error(`MATEMATIKIN: Secan untuk sudut ${derajat} derajat tidak terdefinisi (Infinity).`);
    }
    return _presisiTrigo(1 / Math.cos(derajat * Math.PI / 180));
};

/**
 * Menghitung Cotangen (cos / sin).
 * Tidak terdefinisi pada kelipatan 180 derajat (0, 180, 360, dst).
 */
const ctg = (derajat = 0) => {
    if (typeof derajat !== 'number') throw new Error("MATEMATIKIN: Sudut harus berupa angka.");
    if (derajat % 180 === 0) {
        throw new Error(`MATEMATIKIN: Cotangen untuk sudut ${derajat} derajat tidak terdefinisi (Infinity).`);
    }
    // Rasio cos/sin lebih kebal error dibandingkan 1/tan
    const rad = derajat * Math.PI / 180;
    return _presisiTrigo(Math.cos(rad) / Math.sin(rad));
};
/**
 * Menghitung Arcsinus (mencari sudut dari nilai Sinus).
 * Input wajib berada di antara -1 hingga 1.
 */
const arcsin = (nilai) => {
    if (typeof nilai !== 'number') throw new Error("MATEMATIKIN: Input harus berupa angka.");
    if (nilai < -1 || nilai > 1) {
        throw new Error("MATEMATIKIN: Domain Arcsin (nilai sinus) harus berada di rentang -1 hingga 1.");
    }
    // Math.asin menghasilkan radian, kita kalikan (180 / PI) untuk menjadi derajat
    return _presisiTrigo(Math.asin(nilai) * 180 / Math.PI);
};

/**
 * Menghitung Arccosinus (mencari sudut dari nilai Cosinus).
 * Input wajib berada di antara -1 hingga 1.
 */
const arccos = (nilai) => {
    if (typeof nilai !== 'number') throw new Error("MATEMATIKIN: Input harus berupa angka.");
    if (nilai < -1 || nilai > 1) {
        throw new Error("MATEMATIKIN: Domain Arccos (nilai cosinus) harus berada di rentang -1 hingga 1.");
    }
    return _presisiTrigo(Math.acos(nilai) * 180 / Math.PI);
};

/**
 * Menghitung Arctangen (mencari sudut dari nilai Tangen).
 * Bisa menerima angka berapapun (dari negatif tak hingga sampai tak hingga).
 */
const arctan = (nilai) => {
    if (typeof nilai !== 'number') throw new Error("MATEMATIKIN: Input harus berupa angka.");
    return _presisiTrigo(Math.atan(nilai) * 180 / Math.PI);
};

  //membuat tabel dari array
  function buattabelsoal(arr=[],tempattabel="",opsi={}){
    let bykbaris = arr.length;
    let bykkolom = arr[0].length;
    let teks = String.raw`<table class='w3-table-all tengah'>
        <thead>
            <th>NO</th><th>SOAL</th><th>SOLUSI</th>
        </thead>
        <tbody>`;
    for (let i = 0; i < arr.length; i++) {
        teks += String.raw`<tr><td class="w3-deep-orange" style="font-size: 40px; text-align: left">${i+1}</td><td style="text-align: justify">${arr[i][0]}</td><td><div id="qrc${i}"></div><div style="text-align: center">${arr[i][1]}</div></td></tr>`;
    };
    teks += String.raw`</tbody></table>`;
    document.getElementById(tempattabel).innerHTML = teks;
    let lebarqr = opsi.lebarqr || 100;
    let tinggiqr = opsi.tinggiqr || 100;
    let warnaqr = opsi.warnaqr || "#000000";
    let qrkode = [];
    for (let i = 0; i < arr.length; i++) {
        qrkode[i]=new QRCode("qrc"+i, {
        text: String.raw`https://n9.cl/${arr[i][1]}`,
        width: lebarqr,
        height: tinggiqr,
        colorDark : warnaqr,
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
      }
  }

/**
 * Membuat array dengan formasi "Bukit" (Menaik sampai tengah, lalu menurun).
 * Total dari seluruh elemen dijamin sama persis dengan parameter 'jumlah'.
 */
const arrayBukit = (banyakBilangan, jumlah) => {
    // 1. Validasi Input Mutlak
    if (banyakBilangan <= 0 || jumlah <= 0) {
        throw new Error("MATEMATIKIN: banyakBilangan dan jumlah harus lebih dari 0.");
    }
    if (jumlah < banyakBilangan) {
        throw new Error("MATEMATIKIN: 'jumlah' minimal harus sama dengan 'banyakBilangan' agar tidak ada angka 0/negatif.");
    }

    // 2. Distribusi dasar yang aman (menjaga total tetap akurat)
    let arr = Array(banyakBilangan).fill(Math.floor(jumlah / banyakBilangan));
    let sisa = jumlah % banyakBilangan;

    // 3. Sebarkan sisa pembagian secara acak
    while (sisa > 0) {
        arr[Math.floor(Math.random() * banyakBilangan)]++;
        sisa--;
    }

    // 4. Berikan sedikit variasi acak agar angkanya tidak monoton 
    // (Bongkar-pasang nilai antar elemen agar totalnya TETAP SAMA)
    for (let i = 0; i < banyakBilangan; i++) {
        let idx1 = Math.floor(Math.random() * banyakBilangan);
        let idx2 = Math.floor(Math.random() * banyakBilangan);
        // Pindahkan nilai 1 poin dari idx1 ke idx2 (syarat idx1 > 1 agar tidak jadi 0)
        if (arr[idx1] > 1 && idx1 !== idx2) {
            arr[idx1]--;
            arr[idx2]++;
        }
    }

    // 5. Tahap Formasi Bukit: Urutkan array dari yang terkecil ke terbesar
    arr.sort((a, b) => a - b);

    // 6. Gunakan teknik Two Pointers untuk menyusun formasi Naik-Turun
    let hasil = new Array(banyakBilangan);
    let kiri = 0;                     // Penunjuk indeks dari kiri
    let kanan = banyakBilangan - 1;   // Penunjuk indeks dari kanan

    for (let i = 0; i < banyakBilangan; i++) {
        // Angka secara bergiliran diletakkan di sisi kiri, lalu di sisi kanan
        if (i % 2 === 0) {
            hasil[kiri] = arr[i];
            kiri++;
        } else {
            hasil[kanan] = arr[i];
            kanan--;
        }
    }

    return hasil;
};

/**
 * Membuat array dengan formasi "Lembah" (Menurun sampai tengah, lalu menaik).
 * Total dari seluruh elemen dijamin sama persis dengan parameter 'jumlah'.
 */
const arrayLembah = (banyakBilangan, jumlah) => {
    // 1. Validasi Input Mutlak
    if (banyakBilangan <= 0 || jumlah <= 0) {
        throw new Error("MATEMATIKIN: banyakBilangan dan jumlah harus lebih dari 0.");
    }
    if (jumlah < banyakBilangan) {
        throw new Error("MATEMATIKIN: 'jumlah' minimal harus sama dengan 'banyakBilangan'.");
    }

    // 2. Distribusi dasar yang aman
    let arr = Array(banyakBilangan).fill(Math.floor(jumlah / banyakBilangan));
    let sisa = jumlah % banyakBilangan;

    while (sisa > 0) {
        arr[Math.floor(Math.random() * banyakBilangan)]++;
        sisa--;
    }

    // 3. Variasi acak agar tidak monoton
    for (let i = 0; i < banyakBilangan; i++) {
        let idx1 = Math.floor(Math.random() * banyakBilangan);
        let idx2 = Math.floor(Math.random() * banyakBilangan);
        if (arr[idx1] > 1 && idx1 !== idx2) {
            arr[idx1]--;
            arr[idx2]++;
        }
    }

    // 4. PERUBAHAN KUNCI: Urutkan array dari Terbesar ke Terkecil (Descending)
    arr.sort((a, b) => b - a);

    // 5. Teknik Two Pointers untuk menyusun formasi Lembah
    let hasil = new Array(banyakBilangan);
    let kiri = 0;                     
    let kanan = banyakBilangan - 1;   

    for (let i = 0; i < banyakBilangan; i++) {
        if (i % 2 === 0) {
            hasil[kiri] = arr[i];
            kiri++;
        } else {
            hasil[kanan] = arr[i];
            kanan--;
        }
    }

    return hasil;
};

/**
 * Memformat angka menjadi standar ribuan dan desimal Indonesia.
 * Otomatis menggunakan titik (.) untuk ribuan dan koma (,) untuk desimal.
 */
const formatRibuan = (angka = 0) => {
    // 1. Validasi Input Mutlak
    if (typeof angka !== 'number' || !Number.isFinite(angka)) {
        throw new Error("MATEMATIKIN: Input harus berupa angka yang valid.");
    }

    // 2. Eksekusi format lokalisasi Indonesia ('id-ID')
    return angka.toLocaleString('id-ID');
};

  /**
 * Menghitung panjang garis (jarak) antara dua titik koordinat.
 * Mendukung geometri 2D, 3D, hingga n-dimensi secara otomatis.
 */
const panjangGaris = (titik1, titik2) => {
    // 1. Fleksibilitas Input: 
    // Mendeteksi jika pengguna memasukkan data dalam format nested array [[x1, y1], [x2, y2]]
    if (Array.isArray(titik1) && titik1.length === 2 && Array.isArray(titik1[0]) && titik2 === undefined) {
        titik2 = titik1[1];
        titik1 = titik1[0];
    }

    // 2. Validasi Syarat Mutlak: Kedua titik harus memiliki dimensi yang sama
    if (!Array.isArray(titik1) || !Array.isArray(titik2) || titik1.length !== titik2.length) {
        throw new Error("MATEMATIKIN: Input harus berupa dua koordinat titik dengan dimensi yang sama.");
    }

    // 3. Cari selisih jarak pada masing-masing sumbu (dx, dy, dz, dst.)
    const selisihSumbu = titik1.map((koordinat, indeks) => koordinat - titik2[indeks]);

    // 4. Eksekusi dengan Math.hypot (Menghitung akar dari jumlah kuadrat secara instan)
    // Operator spread (...) akan mengeluarkan isi array menjadi argumen individual
    return Math.hypot(...selisihSumbu);
};

/**
 * Menghitung titik potong antara dua buah garis.
 * Menggunakan metode Determinan untuk menghindari jebakan garis vertikal (Infinity).
 * Mengembalikan koordinat [x, y].
 */
const titikPotong = (garis1, garis2) => {
    // 1. Destrukturisasi Array (Membuat variabel lebih rapi tanpa [0][1] yang membingungkan)
    const [[x1, y1], [x2, y2]] = garis1;
    const [[x3, y3], [x4, y4]] = garis2;

    // 2. Hitung Penyebut (Determinan Utama)
    const penyebut = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    // 3. Validasi Mutlak: Garis Sejajar atau Berimpit
    // Jika penyebut 0, kedua garis berjalan sejajar dan tidak akan pernah berpotongan
    if (penyebut === 0) {
        throw new Error("MATEMATIKIN: Garis sejajar atau berimpit, tidak memiliki titik potong.");
    }

    // 4. Kalkulasi Pembilang
    const t1 = (x1 * y2) - (y1 * x2);
    const t2 = (x3 * y4) - (y3 * x4);

    // 5. Eksekusi Hasil Akhir
    const xPotong = (t1 * (x3 - x4) - (x1 - x2) * t2) / penyebut;
    const yPotong = (t1 * (y3 - y4) - (y1 - y2) * t2) / penyebut;

    return [xPotong, yPotong];
};

/**
 * Mencari koordinat titik yang membagi garis dari titik1 ke titik2 dengan perbandingan m : n.
 * Secara otomatis mendukung koordinat 2D, 3D, hingga n-dimensi.
 */
const titikBagiGaris = (titik1, titik2, m = 1, n = 1) => {
    // 1. Validasi Mutlak: Memastikan dimensi (panjang array) kedua titik sama
    if (!Array.isArray(titik1) || !Array.isArray(titik2) || titik1.length !== titik2.length) {
        throw new Error("MATEMATIKIN: Input harus berupa array koordinat dengan dimensi yang sama.");
    }
    
    // 2. Proteksi Matematika: Mencegah pembagian dengan nol
    if (m + n === 0) {
        throw new Error("MATEMATIKIN: Jumlah rasio perbandingan (m + n) tidak boleh bernilai nol.");
    }

    // 3. Eksekusi fungsional untuk seluruh sumbu (X, Y, Z, dst)
    // Rumus Baku: (m * X2 + n * X1) / (m + n)
    return titik1.map((koordinat1, indeks) => {
        return (m * titik2[indeks] + n * koordinat1) / (m + n);
    });
};

/**
 * Mencari titik tengah di antara dua koordinat.
 */
const titikTengah = (titik1, titik2) => {
    // Terapkan prinsip DRY dengan mendelegasikan tugas ke titikBagiGaris
    // Titik tengah adalah titik yang membagi garis dengan rasio mutlak 1 : 1
    return titikBagiGaris(titik1, titik2, 1, 1);
};

/**
 * Mencari titik pusat lingkaran yang melewati 3 titik koordinat (Titik Pusat Lingkaran Luar).
 * Mengembalikan array koordinat [x, y].
 */
const pusatLingkaran3Titik = (titik1, titik2, titik3) => {
    // 1. Destrukturisasi Modern (Bersih dan Ringkas)
    const [x1, y1] = titik1;
    const [x2, y2] = titik2;
    const [x3, y3] = titik3;

    // 2. Kalkulasi Vektor Skalar
    const a = x2 - x1;
    const b = y2 - y1;
    const c = x3 - x2;
    const d = y3 - y2;

    const e = (a * (x1 + x2)) + (b * (y1 + y2));
    const f = (c * (x2 + x3)) + (d * (y2 + y3));
    
    // Determinan
    const g = 2 * ((a * (y3 - y2)) - (d * (x2 - x3)));

    // 3. Validasi Titik Kolinier
    if (g === 0) {
        throw new Error("MATEMATIKIN: Ketiga titik sejajar (kolinier), tidak dapat membentuk lingkaran.");
    }

    const centerX = ((d * e) - (b * f)) / g;
    const centerY = ((a * f) - (c * e)) / g;

    return [centerX, centerY];
};

/**
 * Mencari panjang jari-jari lingkaran yang melewati 3 titik koordinat.
 * Memanfaatkan Teorema Heron dan fungsi panjangGaris.
 */
const jariLingkaran3Titik = (titik1, titik2, titik3) => {
    // 1. Manfaatkan fungsi panjangGaris yang sudah kita buat sebelumnya (Prinsip DRY!)
    const sisiA = panjangGaris(titik1, titik2);
    const sisiB = panjangGaris(titik2, titik3);
    const sisiC = panjangGaris(titik3, titik1);
    
    // 2. Setengah keliling segitiga (Semi-perimeter)
    const s = (sisiA + sisiB + sisiC) / 2; 
    
    // 3. Hitung Luas dengan Teorema Heron
    // Math.max(0, ...) digunakan sebagai pelindung ekstra terhadap inakurasi floating-point
    // yang kadang menghasilkan angka negatif sangat kecil (misal -0.0000000001)
    const luasSegitiga = Math.sqrt(Math.max(0, s * (s - sisiA) * (s - sisiB) * (s - sisiC))); 
    
    // 4. Validasi Luas Nol (Titik Kolinier)
    if (luasSegitiga === 0) {
        throw new Error("MATEMATIKIN: Ketiga titik sejajar, luas segitiga 0 sehingga jari-jari tak terhingga.");
    }
    
    // 5. Eksekusi Rumus Jari-jari Lingkaran Luar (R = abc / 4L)
    return (sisiA * sisiB * sisiC) / (4 * luasSegitiga);
};

/**
 * Menghitung gradien (kemiringan) dari sebuah garis yang melalui dua titik.
 * Mendukung format nested array [[x1, y1], [x2, y2]] atau dua parameter ([x1, y1], [x2, y2]).
 * Mengembalikan Infinity untuk garis vertikal, dan NaN untuk titik yang sama.
 */
const gradien = (titik1, titik2) => {
    // 1. Fleksibilitas Input: Mendukung dua gaya penulisan koordinat
    if (Array.isArray(titik1) && titik1.length === 2 && Array.isArray(titik1[0]) && titik2 === undefined) {
        titik2 = titik1[1];
        titik1 = titik1[0];
    }

    // 2. Validasi Mutlak: Pastikan input valid
    if (!Array.isArray(titik1) || !Array.isArray(titik2)) {
        throw new Error("MATEMATIKIN: Input harus berupa dua titik koordinat.");
    }

    // 3. Destrukturisasi Modern (Sangat ringkas)
    const [x1, y1] = titik1;
    const [x2, y2] = titik2;

    // 4. Kalkulasi Delta (Selisih)
    const dx = x2 - x1;
    const dy = y2 - y1;

    // 5. Penanganan Kondisi Ekstrem (Edge Cases)
    if (dx === 0) {
        // Jika dy juga 0 (titik yang sama), kembalikan NaN. Jika tidak, Infinity (garis vertikal)
        return dy === 0 ? NaN : Infinity;
    }

    // 6. Eksekusi Rumus Utama
    return dy / dx;
};

//kasih garis pendek pada tengah segmen penanda sama panjang
function tandaSamaPanjang(titikA, titikB, p=1,opsi={}) {
    let tbl = opsi.tebalgaris || 1;
    let warna = opsi.warna || "black";
    let dash = opsi.dash || "";
    let tampakgaris = opsi.tampakgaris || 1;
    // Menghitung titik tengah garis AB
    let midPoint = {x: (titikA[0] + titikB[0]) / 2, y: (titikA[1] + titikB[1]) / 2};
    // Menghitung gradien garis AB
    let gradientAB = (titikB[1] - titikA[1]) / (titikB[0] - titikA[0]);
    let titikC = [];
    let titikD = []
    if(gradientAB!=0){
        // Gradien garis yang tegak lurus dengan garis AB adalah -1 / gradientAB
    let gradientPerpendicular = -1 / gradientAB;
    // Menghitung perubahan x dan y berdasarkan panjang p dan gradien
    let dx = p / Math.sqrt(1 + Math.pow(gradientPerpendicular, 2));
    let dy = gradientPerpendicular * dx;
    // Menghitung koordinat titik C dan D
    titikC = [midPoint.x + dx, midPoint.y + dy];
    titikD = [midPoint.x - dx, midPoint.y - dy];
    
    }
    if(gradientAB==0){
    titikC = [midPoint.x,midPoint.y-p/2];
    titikD = [midPoint.x,midPoint.y+p/2];
    }
    return String.raw`<line x1="${titikC[0]}" y1="${titikC[1]}"
    x2="${titikD[0]}" y2="${titikD[1]}"
    stroke="${warna}"
    stroke-width="${tbl}" stroke-dasharray="${dash}" stroke-opacity="${tampakgaris}"/>`
    }

    function tandaSamaPanjang2(titikA, titikB, p=1,opsi={}) {
        let tbl = opsi.tebalgaris || 1;
        let warna = opsi.warna || "black";
        let dash = opsi.dash || "";
        let tampakgaris = opsi.tampakgaris || 1;
        let jarak = opsi.jarak || 1;
        // Menghitung titik tengah garis AB
        let midPoint = {x: (titikA[0] + titikB[0]) / 2, y: (titikA[1] + titikB[1]) / 2};
        let midPoint1 = {x: midPoint.x-(jarak*(titikB[0]-titikA[0]))/panjanggaris([titikA,titikB]), y: midPoint.y-(jarak*(titikB[1]-titikA[1]))/panjanggaris([titikA,titikB])};
        let midPoint2 = {x: midPoint.x+(jarak*(titikB[0]-titikA[0]))/panjanggaris([titikA,titikB]), y: midPoint.y+(jarak*(titikB[1]-titikA[1]))/panjanggaris([titikA,titikB])};
        // Menghitung gradien garis AB
        let gradientAB = (titikB[1] - titikA[1]) / (titikB[0] - titikA[0]);
        let titikC = [];
        let titikD = [];
        let titikE = [];
        let titikF = [];
        if(gradientAB!=0){
            // Gradien garis yang tegak lurus dengan garis AB adalah -1 / gradientAB
        let gradientPerpendicular = -1 / gradientAB;
        // Menghitung perubahan x dan y berdasarkan panjang p dan gradien
        let dx = p / Math.sqrt(1 + Math.pow(gradientPerpendicular, 2));
        let dy = gradientPerpendicular * dx;
        // Menghitung koordinat titik C dan D
        titikC = [midPoint1.x + dx, midPoint1.y + dy];
        titikD = [midPoint1.x - dx, midPoint1.y - dy];
        titikE = [midPoint2.x + dx, midPoint2.y + dy];
        titikF = [midPoint2.x - dx, midPoint2.y - dy];
        }
        if(gradientAB==0){
        titikC = [midPoint1.x,midPoint1.y-p/2];
        titikD = [midPoint1.x,midPoint1.y+p/2];
        titikE = [midPoint2.x,midPoint2.y-p/2];
        titikF = [midPoint2.x,midPoint2.y+p/2];
        }
        return String.raw`<line x1="${titikC[0]}" y1="${titikC[1]}"
        x2="${titikD[0]}" y2="${titikD[1]}"
        stroke="${warna}"
        stroke-width="${tbl}" stroke-dasharray="${dash}" stroke-opacity="${tampakgaris}"/>
        <line x1="${titikE[0]}" y1="${titikE[1]}"
        x2="${titikF[0]}" y2="${titikF[1]}"
        stroke="${warna}"
        stroke-width="${tbl}" stroke-dasharray="${dash}" stroke-opacity="${tampakgaris}"/>`
        }

/**
 * Mencari titik berat (centroid) dari segitiga yang dibentuk oleh 3 titik.
 * Mendukung koordinat 2D maupun 3D (X, Y, Z).
 */
const titikBerat = (...titik) => {
    // 1. Validasi Input: Pastikan ada 3 titik
    if (titik.length !== 3) {
        throw new Error("MATEMATIKIN: Fungsi titikBerat membutuhkan tepat 3 titik koordinat.");
    }

    // 2. Validasi Dimensi: Pastikan semua titik memiliki jumlah dimensi yang sama
    const dimensi = titik[0].length;
    if (!titik.every(t => t.length === dimensi)) {
        throw new Error("MATEMATIKIN: Semua titik harus memiliki dimensi yang sama (2D atau 3D).");
    }

    // 3. Eksekusi Fungsional: Menjumlahkan setiap sumbu lalu membaginya dengan 3
    // Kita menggunakan .reduce untuk menjumlahkan koordinat, lalu .map untuk membaginya
    return titik[0].map((_, indeks) => {
        const jumlahSumbu = titik.reduce((total, t) => total + t[indeks], 0);
        return jumlahSumbu / 3;
    });
};

/**
 * Menghitung Kombinasi (nCr). 
 * Menggunakan algoritma iteratif untuk mencegah error 'Infinity' pada angka besar.
 */
const kombinasi = (n, r) => {
    // 1. Validasi Matematis
    if (typeof n !== 'number' || typeof r !== 'number') return 0;
    if (n < 0 || r < 0 || r > n) return 0; 
    
    // Basis kasus
    if (r === 0 || r === n) return 1;

    // 2. Optimasi Simetri: nCr = nC(n-r). 
    // Contoh: C(100, 98) akan dihitung sebagai C(100, 2) agar jauh lebih cepat.
    r = Math.min(r, n - r);
    
    // 3. Eksekusi Iteratif (Tanpa Faktorial!)
    let hasil = 1;
    for (let i = 1; i <= r; i++) {
        hasil = hasil * (n - i + 1) / i;
    }
    
    return Math.round(hasil);
};

// Cukup buat ALIAS agar fungsi C tidak memakan memori ganda
const C = kombinasi;

/**
 * Menjabarkan perhitungan faktorial menjadi format string LaTeX.
 * Contoh output untuk n=4: "4 \cdot 3 \cdot 2 \cdot 1"
 */
const jabarFaktorial = (n) => {
    // Validasi
    if (!Number.isInteger(n) || n <= 0) return "";
    
    // Array.from mencetak array [n, n-1, ..., 1], lalu join merangkainya dengan \cdot
    return Array.from({ length: n }, (_, i) => n - i).join(" \\cdot ");
};
 
/**
 * Membulatkan bilangan desimal hingga 'n' digit di belakang koma secara presisi absolut.
 */
const bulatkanDesimal = (angka, desimal = 2) => {
    if (typeof angka !== 'number') {
        throw new Error("MATEMATIKIN: Input harus berupa angka.");
    }
    
    // Menggunakan trik manipulasi string eksponensial (e) 
    // untuk mencegah inakurasi floating-point pada angka berakhiran 5.
    return Number(Math.round(angka + "e" + desimal) + "e-" + desimal);
};

/**
 * Menghitung nilai rata-rata (Mean) dari sekumpulan data.
 * Otomatis membulatkan hasil ke 2 digit desimal untuk kerapian laporan.
 */
const mean = (arr) => {
    // Validasi: Pastikan input adalah array dan tidak kosong
    if (!Array.isArray(arr) || arr.length === 0) return 0;

    // Jumlahkan semua elemen
    const total = arr.reduce((akumulator, nilai) => akumulator + nilai, 0);
    
    // Rata-rata = Total / Banyak Data
    // Kita gunakan fungsi bulatkanDesimal dari ekosistem MATEMATIKIN sebelumnya
    return bulatkanDesimal(total / arr.length, 2);
};

/**
 * Mencari nilai tengah (Median).
 * Otomatis menangani jumlah data ganjil (mengambil nilai tengah) 
 * maupun genap (rata-rata dari dua nilai tengah).
 */
const median = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return 0;

    // Gandakan array agar data aslinya tidak rusak, lalu urutkan (Kecil -> Besar)
    const dataUrut = [...arr].sort((a, b) => a - b);
    const titikTengah = Math.floor(dataUrut.length / 2);

    // Jika jumlah data genap
    if (dataUrut.length % 2 === 0) {
        const nilaiTengahGenap = (dataUrut[titikTengah - 1] + dataUrut[titikTengah]) / 2;
        return bulatkanDesimal(nilaiTengahGenap, 2);
    } 
    
    // Jika jumlah data ganjil
    return dataUrut[titikTengah];
};

/**
 * Mencari nilai yang paling sering muncul (Modus).
 * Mampu mengembalikan lebih dari satu nilai jika terjadi seri (bimodal/multimodal).
 * Mengembalikan array kosong [] jika semua data frekuensinya sama (tidak ada modus).
 */
const modus = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return [];

    const frekuensi = {};
    let frekuensiTertinggi = 0;

    // Peta frekuensi kemunculan setiap angka
    arr.forEach(angka => {
        frekuensi[angka] = (frekuensi[angka] || 0) + 1;
        if (frekuensi[angka] > frekuensiTertinggi) {
            frekuensiTertinggi = frekuensi[angka];
        }
    });

    // Tarik semua angka yang mencapai frekuensi tertinggi
    const daftarModus = Object.keys(frekuensi)
        .filter(kunci => frekuensi[kunci] === frekuensiTertinggi)
        .map(Number); // Ubah kembali dari string (kunci object) menjadi angka

    // Jika semua angka memiliki frekuensi yang sama, berarti TIDAK ADA modus
    if (daftarModus.length === Object.keys(frekuensi).length) {
        return [];
    }

    // Urutkan array modus dari kecil ke besar agar rapi saat dicetak ke soal
    return daftarModus.sort((a, b) => a - b);
};

/**
 * Menghitung Simpangan Baku / Standar Deviasi (Populasi).
 * Sangat berguna untuk mengetahui seberapa jauh nilai menyimpang dari rata-rata kelas.
 */
const simpanganBaku = (arr) => {
    if (!Array.isArray(arr) || arr.length < 2) return 0;

    // 1. Cari nilai rata-rata (mean)
    const rataRata = mean(arr);

    // 2. Hitung jumlah kuadrat dari selisih setiap nilai dengan rata-rata
    const jumlahKuadratSelisih = arr.reduce((total, angka) => {
        return total + Math.pow(angka - rataRata, 2);
    }, 0);

    // 3. Cari Varians (Ragam)
    const varians = jumlahKuadratSelisih / arr.length;

    // 4. Simpangan baku adalah akar dari Varians
    return bulatkanDesimal(Math.sqrt(varians), 2);
};

/**
 * Menghasilkan opsi pilihan ganda (A, B, C, D, E) dengan distraktor otomatis.
 * Output berupa array objek lengkap dengan status kebenaran (isBenar) untuk grading.
 */
const buatOpsiGanda = (jawabanBenar, toleransi = 1, jumlahOpsi = 5) => {
    // 1. Validasi Input
    if (typeof jawabanBenar !== 'number' || !Number.isFinite(jawabanBenar)) {
        throw new Error("MATEMATIKIN: Jawaban benar harus berupa angka agar distraktor dapat dihitung.");
    }
    
    // 2. Inisialisasi keranjang dengan jawaban benar sudah berada di dalamnya
    const kumpulanOpsi = [jawabanBenar];
    const batasLoop = 100; // Pengaman agar browser tidak hang jika gagal mencari angka unik
    let iterasi = 0;

    // 3. Mesin Pembuat Pengecoh (Distraktor)
    while (kumpulanOpsi.length < Math.min(jumlahOpsi, 26) && iterasi < batasLoop) {
        // Mengundi arah selisih: bisa ke atas (+) atau ke bawah (-) 
        // Rentang pengali: -3, -2, -1, 1, 2, 3 (0 dibuang)
        let pengaliAcak = Math.floor(Math.random() * 7) - 3;
        if (pengaliAcak === 0) pengaliAcak = 4; // Ganti 0 agar tidak menghasilkan jawaban ganda
        
        // Buat angka pengecoh berdasarkan jarak toleransi
        const pengecoh = jawabanBenar + (pengaliAcak * toleransi);

        // Pastikan angka ini belum ada di dalam keranjang opsi
        if (!kumpulanOpsi.includes(pengecoh)) {
            kumpulanOpsi.push(pengecoh);
        }
        iterasi++;
    }

    // 4. Tahap Pengacakan Posisi (Algoritma Fisher-Yates Murni)
    for (let i = kumpulanOpsi.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [kumpulanOpsi[i], kumpulanOpsi[j]] = [kumpulanOpsi[j], kumpulanOpsi[i]];
    }

    // 5. Pemetaan Abjad (A, B, C, D, E, dst.) dan Format Akhir
    const abjad = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    return kumpulanOpsi.map((nilai, indeks) => {
        return {
            opsi: abjad[indeks],
            nilai: nilai, // Bisa dipadukan dengan formatRibuan() jika nilainya besar
            isBenar: nilai === jawabanBenar
        };
    });
};

/**
 * 1. FORMATTER RUPIAH
 * Mengonversi angka mentah menjadi format mata uang Rupiah resmi (EYD).
 * Otomatis membuang desimal ",00" jika angkanya adalah bilangan bulat.
 */
const formatRupiah = (angka = 0) => {
    if (typeof angka !== 'number' || !Number.isFinite(angka)) return "Rp0";

    // Menggunakan Intl.NumberFormat bawaan mesin JavaScript
    // Jauh lebih cepat dan aman daripada menggunakan Regex manual
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Hilangkan desimal jika tidak perlu
        maximumFractionDigits: 2  // Maksimal 2 digit desimal (misal untuk sen)
    }).format(angka);
};

/**
 * 2. FORMATTER SATUAN (SIAP MATHJAX)
 * Menggabungkan angka dengan satuan pengukurannya.
 * Otomatis mendeteksi angka di akhir teks (misal: m2, cm3) dan 
 * mengubahnya menjadi pangkat (superscript) berstandar LaTeX.
 */
const formatSatuan = (angka = 0, satuan = "") => {
    if (typeof angka !== 'number' || !Number.isFinite(angka)) return "";
    
    // Gunakan formatRibuan() yang sudah kita buat sebelumnya
    // agar angkanya rapi sebelum digabung dengan satuan
    const angkaRapi = angka.toLocaleString('id-ID');

    if (!satuan) return angkaRapi;

    // Regex Cerdas: Mencari angka di ujung string dan menambahkan simbol pangkat LaTeX
    // Contoh: "cm2" -> "cm^{2}", "dm3" -> "dm^{3}"
    const satuanBerpangkat = satuan.replace(/(\d+)$/, '^{$1}');
    
    // \text{} digunakan agar huruf satuan berdiri tegak (tidak miring seperti variabel aljabar)
    return `${angkaRapi} \\text{ ${satuanBerpangkat}}`;
};

//membuat koordinat cartesius
function kocabuat(idtempatSVG="",intervalSumbuX=[],intervalSumbuY=[],opsi={}){
    let warnaSemua = opsi.warnaSemua || "black";
    let warnaSumbu = opsi.warnaSumbu || warnaSemua;
    let warnaTik = opsi.warnaTik || warnaSemua; 
    let warnaLabel = opsi.warnaLabel || warnaSemua;
    let warnaGrid = opsi.warnaGrid || warnaSemua;
    let warnaLabelSumbu = opsi.warnaLabelSumbu || warnaSemua;
    let warnaLabelTik = opsi.warnaLabelTik || warnaSemua;
    let vertAlign = opsi.vertAlign || "middle";
    let xMin = intervalSumbuX[0];
    let xMax = intervalSumbuX[1];
    let yMin = intervalSumbuY[0];
    let yMax = intervalSumbuY[1];
    //rasio jarak antar tik
    let rTik = opsi.rTik || 1;
    //rasio jarak antar tik sumbu x
    let rTikX = opsi.rTikX || rTik;
    //rasio jarak antar tik sumbu y
    let rTikY = opsi.rTikY || rTik;
    //Interval di sumbu x
    let intervalX = opsi.intervalX || 1;
    //interval di sumbu y
    let intervalY = opsi.intervalY || 1;
    //jarak antar tik real
    let jarakTik = opsi.jarakTik || 30;
    let jarakTikX = opsi.jarakTikX || jarakTik*intervalX;
    let jarakTikY = opsi.jarakTikY || jarakTik*intervalY;
    let panjangTik = opsi.panjangTik || 7;
    let banyakTikKiri = 0;
    let banyakTikKanan = 0;
    let banyakTikBawah = 0;
    let banyakTikAtas = 0;
    let ukuranAngkaSumbu = opsi.ukuranAngkaSumbu || 1;
    let margin = opsi.margin || 0;
    let lebarKiri = 1;
    let lebarKanan = 1;
    let batasKiri = xMin-1;
    let batasKanan = xMax+1;
    let batasBawah = yMin-1;
    let batasAtas = yMax+1;
    if(rTikX!=1){
        jarakTikX=jarakTikX*rTikX
    }
    if(rTikY!=1){
        jarakTikY=jarakTikY*rTikY
    }
    if(xMin<0){
        banyakTikKiri = Math.floor(Math.abs(xMin)/intervalX)
        lebarKiri = (Math.floor(Math.abs(xMin)/intervalX)+1)*jarakTikX
        batasKiri = -(banyakTikKiri+1)*intervalX
    }else{lebarKiri = jarakTikX;
    batasKiri = -1};
    if(xMax>0){
        banyakTikKanan = Math.floor(xMax/intervalX);
        lebarKanan = (Math.floor(xMax/intervalX)+1)*jarakTikX
        //batasKanan = (banyakTikKanan+1)*intervalX
    }else{lebarKanan = jarakTikX;
    batasKanan = 1};
    let lebar = lebarKiri+lebarKanan;
    let banyakTikX = banyakTikKiri+banyakTikKanan+1;
    let tinggiBawah = 1;
    let tinggiAtas = 1;
    if(yMin<0){
        banyakTikBawah = Math.floor(Math.abs(yMin)/intervalY)
        tinggiBawah = (Math.floor(Math.abs(yMin)/intervalY)+1)*jarakTikY
        batasBawah = -(banyakTikBawah+1)*intervalY
    }else{tinggiBawah = jarakTikY;
    batasBawah = -1};
    if(yMax>0){
        banyakTikAtas = Math.floor(yMax/intervalY);
        tinggiAtas = (Math.floor(yMax/intervalY)+1)*jarakTikY
        batasAtas = (banyakTikAtas+1)*intervalY
    }else{tinggiAtas = jarakTikY;
    batasAtas = 1};
    let banyakTikY = banyakTikBawah+banyakTikAtas+1;
    let tinggi = tinggiBawah+tinggiAtas;
    let kodeTikX = "";
    let kodeTikY = "";
    for(let i=0;i<banyakTikX;i++){
        kodeTikX += svggaris([[(i+1)*jarakTikX,tinggiAtas],[(i+1)*jarakTikX,tinggiAtas+panjangTik]],{warna: warnaTik});
        if(i-banyakTikKiri!=0){
            kodeTikX += svglabeltitik([(i+1)*jarakTikX,tinggiAtas+panjangTik],(i-banyakTikKiri)*intervalX,{anchor: "middle", baseline: "hanging",yplus: 2,ukuran: ukuranAngkaSumbu, warna: warnaLabelTik})
        }
    }
    for(let i=0;i<banyakTikY;i++){
        kodeTikY += svggaris([[lebarKiri,(i+1)*jarakTikY],[lebarKiri-panjangTik,(i+1)*jarakTikY]])
        if(i-banyakTikAtas!=0){
            kodeTikY += svglabeltitik([lebarKiri-panjangTik,(i+1)*jarakTikY],(banyakTikAtas-i)*intervalY,{anchor: "end", baseline: "central",xplus: -2,ukuran: ukuranAngkaSumbu, warna: warnaLabelTik})
        }

    }
    let skalaX = lebar/(batasKanan-batasKiri);
    let skalaY = tinggi/(batasAtas-batasBawah);
    let tepiKiri = -lebarKiri*intervalX/jarakTikX;
    let tepiKanan = lebarKanan*intervalX/jarakTikX;
    let tepiBawah = -tinggiBawah*intervalY/jarakTikY;
    let tepiAtas = tinggiAtas*intervalY/jarakTikY;
    document.getElementById(idtempatSVG).innerHTML = String.raw`<svg xmlns='http://www.w3.org/2000/svg' style='max-width: ${lebar+2*margin}px; max-height: ${tinggi+2*margin}px; vertical-align: ${vertAlign}' viewbox='${-margin} ${-margin} ${lebar+2*margin} ${tinggi+2*margin}'>
    <g id='${idtempatSVG}_svg'></g>
    ${svggaris([[0,tinggiAtas],[lebar,tinggiAtas]],{kepalapanah: {lebar: 10},warna: warnaSumbu})}
    ${svggaris([[lebarKiri,tinggi],[lebarKiri,0]],{kepalapanah: {lebar: 10},warna: warnaSumbu})}
    ${kodeTikX}${kodeTikY}
    ${svglabeltitik([lebar,tinggiAtas],"X",{anchor: "end", baseline: "hanging",yplus: 8, warna: warnaLabelSumbu})}
    ${svglabeltitik([lebarKiri,0],"Y",{anchor: "end", baseline: "hanging",xplus: -8, warna: warnaLabelSumbu})}
    </svg>`
    return {id: idtempatSVG+'_svg',sumbux: intervalSumbuX, sumbuy: intervalSumbuY,jarakTikX: jarakTikX,jarakTikY: jarakTikY,lebarKiri: lebarKiri, lebarKanan: lebarKanan, lebar: lebar,tinggiBawah: tinggiBawah, tinggiAtas: tinggiAtas,tinggi: tinggi,banyakTikKiri: banyakTikKiri, banyakTikKanan: banyakTikKanan, banyakTikBawah: banyakTikBawah, banyakTikAtas: banyakTikAtas, banyakTikX:banyakTikX, banyakTikY: banyakTikY,margin: margin, intervalX: intervalX, intervalY: intervalY, batasAtas: batasAtas, batasBawah:batasBawah, batasKanan:batasKanan, batasKiri:batasKiri,skalaX:skalaX,skalaY:skalaY,tepiKiri:tepiKiri,tepiBawah:tepiBawah,tepiKanan:tepiKanan,tepiAtas:tepiAtas,warnaSemua:warnaSemua,warnaSumbu:warnaSumbu,warnaTik:warnaTik,warnaLabel:warnaLabel,warnaGrid:warnaGrid,warnaLabelSumbu:warnaLabelSumbu,warnaLabelTik:warnaLabelTik}
}

//koca Segmen
function kocaSegmen(variabelKoca,garis=[],opsi={}){
    let tbl = opsi.tebalgaris || 1;
    let x1 = garis[0][0];
    let y1 = garis[0][1];
    let x2 = garis[1][0];
    let y2 = garis[1][1];
    let warna = opsi.warna || "black";
    let dash = opsi.dash || "";
    let tampakgaris = opsi.tampakgaris || 1;
    document.getElementById(variabelKoca.id).innerHTML += String.raw`<line x1="${variabelKoca.lebarKiri+variabelKoca.jarakTikX*x1/variabelKoca.intervalX}" y1="${variabelKoca.tinggiBawah+variabelKoca.jarakTikY*y1/variabelKoca.intervalY}"
    x2="${variabelKoca.lebarKiri+variabelKoca.jarakTikX*x2/variabelKoca.intervalX}" y2="${variabelKoca.tinggiBawah+variabelKoca.jarakTikY*y2/variabelKoca.intervalY}"
    stroke="${warna}"
    stroke-width="${tbl}" stroke-dasharray="${dash}" stroke-opacity="${tampakgaris}" transform="translate(0,${variabelKoca.tinggi}) scale(1,-1)"/>`
    return {titik1: garis[0],titik2: garis[1],panjang: Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))}
}

function kocaLingkaran(variabelKoca,titikPusat=[],jarijari=0,opsi={}){
    let cx = titikPusat[0];
    let cy = titikPusat[1];
    let tebal = opsi.tebal || 1;
    let warnagaris = opsi.warnagaris || "black";
    let isi = opsi.isi || "none";
    let kala = opsi.skala || variabelKoca.lebar/(variabelKoca.batasKanan-variabelKoca.batasKiri);
    let isikode = String.raw`<ellipse cx="${variabelKoca.lebarKiri+variabelKoca.jarakTikX*cx/variabelKoca.intervalX}" cy="${variabelKoca.tinggiBawah+variabelKoca.jarakTikY*cy/variabelKoca.intervalY}" rx="${variabelKoca.jarakTikX*jarijari/variabelKoca.intervalX}" fill="${isi}" stroke="${warnagaris}" ry="${variabelKoca.jarakTikY*jarijari/variabelKoca.intervalY}" transform="translate(0,${variabelKoca.tinggi}) scale(1,-1)"  />`;
    document.getElementById(variabelKoca.id).innerHTML += isikode;
}

//koca Segi Banyak
function kocaSegi(variabelKoca,kumpulantitik=[],opsi={}){
    let listtitik = `${variabelKoca.lebarKiri+variabelKoca.jarakTikX*kumpulantitik[0][0]/variabelKoca.intervalX},${variabelKoca.tinggiBawah+variabelKoca.jarakTikY*kumpulantitik[0][1]/variabelKoca.intervalY} `;
    for (var i = 1; i < kumpulantitik.length; i++) {
        listtitik += String.raw`${variabelKoca.lebarKiri+variabelKoca.jarakTikX*kumpulantitik[i][0]/variabelKoca.intervalX},${variabelKoca.tinggiBawah+variabelKoca.jarakTikY*kumpulantitik[i][1]/variabelKoca.intervalY} `;
      }
      let warnagaris = opsi.warnagaris || "black";
      let isi = opsi.isi || "none";
      let transparanisi = opsi.tampakisi || 1;
      let tampakgaris = opsi.tampakgaris || 1;
      let tebalgaris = opsi.tebalgaris || 1;
      let join = opsi.join || "miter";
      document.getElementById(variabelKoca.id).innerHTML += String.raw`<polygon points="${listtitik}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; fill:${isi}; opacity:${transparanisi}; stroke-opacity:${tampakgaris}; stroke-linejoin:${join}" transform="translate(0,${variabelKoca.tinggi}) scale(1,-1)"/>`;
      return {kumpulantitik: kumpulantitik}
}

function dfung(f,x,opsi={}){
    let j = opsi.h || 1;
    let f_2 = f(x-2*j);
    let f_1 = f(x-j);
    let f1 = f(x+j);
    let f2 = f(x+2*j);
    return (-f2+8*f1-8*f_1+f_2)/(12*j);
}
function kocaGrafung(variabelKoca,f,opsi={}){
    let metode = opsi.metode || 1;
    let iterasi = opsi.iterasi || 100;
    let xterkecil = opsi.xterkecil || variabelKoca.tepiKiri;
    let xmax = opsi.xmax || variabelKoca.tepiKanan;
    let tbl = opsi.tebalgaris || 1;
    let warna = opsi.warna || variabelKoca.warnaSemua;
    let delta = (xmax-xterkecil)/iterasi;
    let titikfungsi = [];
    let grad = [];
    let titikKontrol = [];
    let titikKontrol2 = [];
    for(let i=0;i<iterasi+1;i++){
        titikfungsi.push([xterkecil+delta*i,f(xterkecil+delta*i)]);
        grad.push(dfung(f,xterkecil+delta*i));
    }
    
    for(let i=0;i<iterasi;i++){
        let x1 = titikfungsi[i][0];
        let y1 = titikfungsi[i][1];
        let x2 = titikfungsi[i+1][0];
        let y2 = titikfungsi[i+1][1];
        let m1 = grad[i];
        let m2 = grad[i+1];
        let c1 = -(y1-y2-x1*m1+x2*m2)/(m1-m2);
        let c2 = -(-y2*m1+y1*m2-x1*m1*m2+x2*m1*m2)/(m1-m2);
        if(m1==m2){
            c1 = (x1+x2)/2;
            c2 = (y1+y2)/2;
        }
        titikKontrol.push([c1,c2])
        titikKontrol2.push([(c1-variabelKoca.batasKiri),(-c2+variabelKoca.batasAtas)])
    }
    let titikfungsi2 = []
    for(let i=0;i<titikfungsi.length;i++){
        let x = titikfungsi[i][0];
        let y = titikfungsi[i][1];
        titikfungsi2.push([variabelKoca.lebarKiri+variabelKoca.jarakTikX*x/variabelKoca.intervalX,variabelKoca.tinggiBawah+variabelKoca.jarakTikY*y/variabelKoca.intervalY])
    }
    let kode = String.raw`M ${variabelKoca.lebarKiri+variabelKoca.jarakTikX*xterkecil/variabelKoca.intervalX} ${variabelKoca.tinggiBawah+variabelKoca.jarakTikY*f(xterkecil)/variabelKoca.intervalY} `;
    let kode0 = kode;
    for(let i=0;i<iterasi;i++){
        kode+=String.raw`Q ${titikKontrol2[i][0]} ${titikKontrol2[i][1]} ${titikfungsi2[i+1][0]} ${titikfungsi2[i+1][1]}`;
        kode0+=String.raw`L ${titikfungsi2[i+1][0]} ${titikfungsi2[i+1][1]} `;
    }
    if(metode==2){document.getElementById(variabelKoca.id).innerHTML += String.raw` <path d="${kode}" stroke="${warna}" fill="transparent" stroke-width="${tbl}" transform="translate(${-variabelKoca.batasKiri*variabelKoca.jarakTikX/variabelKoca.intervalX} ${variabelKoca.batasAtas*variabelKoca.jarakTikY/variabelKoca.intervalY}) scale(1 -1)"/>`}
    else if(metode==1){
        document.getElementById(variabelKoca.id).innerHTML += String.raw` <path d="${kode0}" stroke="${warna}" fill="transparent" stroke-width="${tbl}"  transform="translate(0,${variabelKoca.tinggi}) scale(1,-1)"/>`
    }
    
    return {titikfungsi: titikfungsi,xmin:xterkecil,xmax:xmax,grad:grad,titikKontrol:titikKontrol,titikfungsi2:titikfungsi2,delta:delta,titikKontrol2:titikKontrol2,metode:metode}
}

//koca label titik
function kocaLabelTitik(variabelKoca,titik=[],namalabel="",opsi={}){
    let ukuran = opsi.ukuran || 1;
    let anchor = opsi.anchor || "start";
    let baseline = opsi.baseline || "auto";
    let xplus = opsi.xplus || 0;
    let yplus = opsi.yplus || 0;
    let font = opsi.font || `'Times New Roman', Times, serif`
    document.getElementById(variabelKoca.id).innerHTML += String.raw`<text x="${variabelKoca.lebarKiri+variabelKoca.jarakTikX*(titik[0]+xplus)/variabelKoca.intervalX}"  y="${variabelKoca.tinggi+-(variabelKoca.tinggiBawah+variabelKoca.jarakTikY*(titik[1]+yplus)/variabelKoca.intervalY)}" text-anchor="${anchor}" dominant-baseline="${baseline}" style="font-family:${font}; font-size:${ukuran}em">${namalabel}</text>`;
    return {titik:titik,label:namalabel,ukuran:ukuran,font:font}
}

function geomBuat(id="",lebar=0,tinggi=0,opsi={}){
    const {rasio = 1, margin = 0} = opsi;
    const adjustedWidth = rasio * (lebar + 2 * margin);
    const adjustedHeight = rasio * (tinggi + 2 * margin);
    document.getElementById(id).innerHTML = String.raw`<svg id="${id}_svg" xmlns='http://www.w3.org/2000/svg' style='max-width: ${adjustedWidth}px; max-height: ${adjustedHeight}px;' viewBox='${-rasio*margin} ${-rasio*margin} ${adjustedWidth} ${adjustedHeight}'></svg>`;
    return {id,lebar,tinggi,rasio,margin}
}
function appendToSVG(geom, element) {
    document.getElementById(`${geom.id}_svg`).innerHTML += element;
}

function geomSegmen(variabelGeom,kumTitik,opsi={}){
    const [p1, p2] = kumTitik;
    let titik1 = kumTitik[0];
    let titik2 = kumTitik[1];
    let x1 = titik1[0];
    let y1 = titik1[1];
    let x2 = titik2[0];
    let y2 = titik2[1];
    const { warna = "black", tebal = 1, dash = "", tampak = 1 } = opsi;
    appendToSVG(variabelGeom, `
        <line x1="${p1[0] * variabelGeom.rasio}" y1="${p1[1] * variabelGeom.rasio}" 
              x2="${p2[0] * variabelGeom.rasio}" y2="${p2[1] * variabelGeom.rasio}" 
              stroke="${warna}" stroke-width="${tebal}" 
              stroke-dasharray="${dash}" stroke-opacity="${tampak}" />
    `);
        return {kumTitik:kumTitik,warna:warna,tebal:tebal}
}

function geomSegi(variabelGeom,kumTitik,opsi={}){
    const listtitik = kumTitik.map(p => `${p[0] * variabelGeom.rasio},${p[1] * variabelGeom.rasio}`).join(" ");
    const { warnaGaris = "black", isi = "none", tampakIsi = 1, tampakGaris = 1, tebal = 1, join = "miter", dash="" } = opsi;
    appendToSVG(variabelGeom, `
        <polygon points="${listtitik}" style="stroke:${warnaGaris}; stroke-width:${tebal};
            fill:${isi}; opacity:${tampakIsi}; stroke-opacity:${tampakGaris}; stroke-linejoin:${join}" stroke-dasharray="${dash}"/>
    `);
    return {kumTitik:kumTitik,warnaGaris,isi,tampakIsi,tampakGaris,tebal,join}
}

function geomLing(variabelGeom,titikPusat=[],jarijari=0,opsi={}){
    let xp = titikPusat[0];
    let yp = titikPusat[1];
    let warnagaris = opsi.warnagaris || "black";
    let tebalgaris = opsi.tebalgaris || 1;
    let isi = opsi.isi || "none";
    let transparanisi = opsi.tampakisi || 1;
    let tampakgaris = opsi.tampakgaris || 1;
    document.getElementById(variabelGeom.id+"_svg").innerHTML += String.raw`<circle r="${jarijari*variabelGeom.rasio}" cx="${xp*variabelGeom.rasio}" cy="${yp*variabelGeom.rasio}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; fill:${isi}; opacity:${transparanisi}; stroke-opacity:${tampakgaris};"/>`;
    return {titikPusat:titikPusat,jarijari:jarijari}
}

function geomBusur(variabelGeom,titikPusat=[],titikAwal=[],titikAkhir=[],opsi={}){
    let xp = titikPusat[0];
    let yp = titikPusat[1];
    let x1 = titikAwal[0];
    let y1 = titikAwal[1];
    let radius = Math.sqrt(Math.pow(x1-xp,2)+Math.pow(y1-yp,2));
    let x2 = titikAkhir[0];
    let y2 = titikAkhir[1];
    let busurbesar = opsi.busurbesar || 0;
    let arahrotasi = opsi.arahrotasi || 0;
    let tertutup = opsi.tertutup || 0;
    let sweep = opsi.sweep || 0;
    let kodeTutup = "";
    if(tertutup){
        kodeTutup = "Z"
    }
    let warnagaris = opsi.warnagaris || "black";
    let tebalgaris = opsi.tebalgaris || 1;
    let isi = opsi.isi || "none";
    let transparanisi = opsi.tampakisi || 1;
    let tampakgaris = opsi.tampakgaris || 1;
    let join = opsi.join || "mitter";
    let isid = `M ${x1*variabelGeom.rasio} ${y1*variabelGeom.rasio} A ${radius*variabelGeom.rasio} ${radius*variabelGeom.rasio} ${arahrotasi} ${busurbesar} ${sweep} ${x2*variabelGeom.rasio} ${y2*variabelGeom.rasio} ${kodeTutup}`;
    document.getElementById(variabelGeom.id+"_svg").innerHTML += String.raw`<path d="${isid}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; fill:${isi}; opacity:${transparanisi}; stroke-opacity:${tampakgaris}; stroke-linejoin:${join}"/>`;
    return {titikPusat:titikPusat,titikAwal:titikAwal,titikAkhir:titikAkhir,r:radius}
}

function geomSetengahLing(variabelGeom,titikPusat=[],titikAwal=[],opsi={}){
    let xp = titikPusat[0];
    let yp = titikPusat[1];
    let x1 = titikAwal[0];
    let y1 = titikAwal[1];
    let radius = Math.sqrt(Math.pow(x1-xp,2)+Math.pow(y1-yp,2));
    let x2 = 2*xp-x1;
    let y2 = 2*yp-y1;
    let busurbesar = opsi.busurbesar || 1;
    let arahrotasi = opsi.arahrotasi || 1;
    let tertutup = opsi.tertutup || 0;
    let sweep = opsi.sweep || 1;
    let kodeTutup = "";
    if(tertutup){
        kodeTutup = "Z"
    }
    let warnagaris = opsi.warnagaris || "black";
    let tebalgaris = opsi.tebalgaris || 1;
    let isi = opsi.isi || "none";
    let transparanisi = opsi.tampakisi || 1;
    let tampakgaris = opsi.tampakgaris || 1;
    let join = opsi.join || "mitter";
    let isid = `M ${x1*variabelGeom.rasio} ${y1*variabelGeom.rasio} A ${radius*variabelGeom.rasio} ${radius*variabelGeom.rasio} ${arahrotasi} ${busurbesar} ${sweep} ${x2*variabelGeom.rasio} ${y2*variabelGeom.rasio} ${kodeTutup}`;
    document.getElementById(variabelGeom.id+"_svg").innerHTML += String.raw`<path d="${isid}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; fill:${isi}; opacity:${transparanisi}; stroke-opacity:${tampakgaris}; stroke-linejoin:${join}"/>`;
    return {titikPusat:titikPusat,r:radius}
}

function geomLabelTitik(variabelGeom,titik=[0,0],label="",opsi={}){
    let ukuran = opsi.ukuran || 1;
    let anchor = opsi.anchor || "start";
    let baseline = opsi.baseline || "auto";
    let xplus = opsi.xplus || 0;
    let yplus = opsi.yplus || 0;
    let warna = opsi.warna || "black"
    document.getElementById(variabelGeom.id+"_svg").innerHTML += String.raw`<text x="${variabelGeom.rasio*(titik[0]+xplus)}"  y="${variabelGeom.rasio*(titik[1]+yplus)}" text-anchor="${anchor}" dominant-baseline="${baseline}" style="font-family:'Times New Roman', Times, serif; font-size:${ukuran}em; fill:${warna}">${label}</text>`;
    return {titik:titik,label:label,ukuran:ukuran,warna:warna}
}

function geomLabelGaris(variabelGeom,kumTitik,label="",opsi={}){
    let ukuran = opsi.ukuran || 1;
    let anchor = opsi.anchor || "start";
    let baseline = opsi.baseline || "auto";
    let xplus = opsi.xplus || 0;
    let yplus = opsi.yplus || 0;
    let warna = opsi.warna || "black";
    document.getElementById(variabelGeom.id+"_svg").innerHTML += String.raw`<text x="${variabelGeom.rasio*((kumTitik[0][0]+kumTitik[1][0])/2+xplus)}"  y="${variabelGeom.rasio*((kumTitik[0][1]+kumTitik[1][1])/2+yplus)}" text-anchor="${anchor}" dominant-baseline="${baseline}" style="font-family:'Times New Roman', Times, serif; font-size:${ukuran}em; fill:${warna}">${label}</text>`;
    return {kumTitik:kumTitik,label:label}
}

function geomSudut(variabelGeom,kumTitik,opsi={}){
    let r = opsi.r || 1;
    let tebalgaris = opsi.tebalgaris || 1;
    let warnagaris = opsi.warnagaris || "black";
    let isi = opsi.isi || "none";
    let tampakisi = opsi.tampakisi || 1;
    let tampakgaris = opsi.tampakgaris || 1;
    let rotasi = opsi.rotasi || 0;
    let busurbesar = opsi.busurbesar || 0;
    let arah = opsi.arah || 1;
    document.getElementById(variabelGeom.id+"_svg").innerHTML += String.raw`<path d="M ${variabelGeom.rasio*kumTitik[1][0]} ${variabelGeom.rasio*kumTitik[1][1]} L ${variabelGeom.rasio*(kumTitik[1][0]+r*(kumTitik[0][0]-kumTitik[1][0])/panjanggaris([kumTitik[0],kumTitik[1]]))} ${variabelGeom.rasio*(kumTitik[1][1]+r*(kumTitik[0][1]-kumTitik[1][1])/panjanggaris([kumTitik[0],kumTitik[1]]))} A ${variabelGeom.rasio*r} ${variabelGeom.rasio*r} ${rotasi} ${busurbesar} ${arah} ${variabelGeom.rasio*(kumTitik[1][0]+r*(kumTitik[2][0]-kumTitik[1][0])/panjanggaris([kumTitik[2],kumTitik[1]]))} ${variabelGeom.rasio*(kumTitik[1][1]+r*(kumTitik[2][1]-kumTitik[1][1])/panjanggaris([kumTitik[2],kumTitik[1]]))} z" stroke="${warnagaris}" fill="${isi}" fill-opacity="${tampakisi}" stroke-width="${tebalgaris}" stroke-opacity="${tampakgaris}"/>`;
    return {kumTitik:kumTitik,r:r,warnagaris:warnagaris,tebalgaris:tebalgaris,isi:isi,tampakisi:tampakisi,tampakgaris:tampakgaris,rotasi,rotasi,busurbesar:busurbesar,arah:arah}
}

function geomSiku(variabelGeom,kumTitik=[],opsi={}){
    let r = opsi.r || 1;
    let tebalgaris = opsi.tebalgaris || 1;
    let warnagaris = opsi.warnagaris || "black";
    let isi = opsi.isi || "none";
    let tampakisi = opsi.tampakisi || 1;
    let tampakgaris = opsi.tampakgaris || 1;
    let ti1x = kumTitik[0][0];
    let ti1y = kumTitik[0][1];
    let ti2x = kumTitik[1][0];
    let ti2y = kumTitik[1][1];
    let ti3x = kumTitik[2][0];
    let ti3y = kumTitik[2][1];
    let pjg1 = panjanggaris([kumTitik[0],kumTitik[1]]);
    let pjg2 = panjanggaris([kumTitik[2],kumTitik[1]]);
    let tiawal = [ti2x+r*(ti1x-ti2x)/pjg1,ti2y+r*(ti1y-ti2y)/pjg1];
    let tiakh = [ti2x+r*(ti3x-ti2x)/pjg2,ti2y+r*(ti3y-ti2y)/pjg2];
    let titeng = [(tiawal[0]+tiakh[0])/2,(tiawal[1]+tiakh[1])/2];
    let tilu = [2*titeng[0]-kumTitik[1][0],2*titeng[1]-kumTitik[1][1]]
    document.getElementById(variabelGeom.id+"_svg").innerHTML += String.raw`<polygon points="${variabelGeom.rasio*ti2x},${variabelGeom.rasio*ti2y} ${variabelGeom.rasio*tiawal[0]},${variabelGeom.rasio*tiawal[1]} ${variabelGeom.rasio*tilu[0]},${variabelGeom.rasio*tilu[1]} ${variabelGeom.rasio*(kumTitik[1][0]+r*(kumTitik[2][0]-kumTitik[1][0])/panjanggaris([kumTitik[2],kumTitik[1]]))},${variabelGeom.rasio*(kumTitik[1][1]+r*(kumTitik[2][1]-kumTitik[1][1])/panjanggaris([kumTitik[2],kumTitik[1]]))}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; fill:${isi}; opacity:${tampakisi}; stroke-opacity:${tampakgaris}"/>`;
  }
