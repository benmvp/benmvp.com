---
layout: post
title:  "Manajemen Data"
date:   2015-08-03 11:57:08
categories: manajemen data
author: Edwin Lunando
author_t: edwinlunando
permalink: manajemen-data
description: manajemen data dengan metode backup 3 2 1
---

Hampir setiap tahunnya, saya selalu mendengar cerita terkait orang yang kehilangan datanya. Entah itu kelilangan komputer, ponsel, ataupun melakukan operasi mengakibatkan kehilangan data. Data-data yang hilang pun sangat beragam seperti berkas pekerjaan, skripsi, dan berkas penting personal. Saya juga pernah merasakan pahitnya kehilangan data yang penting. Kesal, sebal, dan sedih pun menjadi satu padu. Oleh karena itu, saya akan membagikan pengalaman saya dalam mengatur data saya supaya kalau terkena musibah, kehilangannya bisa diminimalisir atau bahkan tidak ada.

## Aturan Backup

Sebenarnya, supaya data kita tetap aman dan tidak hilang, konsep utama dari manajemen data adalah mempunyai *backup* yang tersedia dengan baik. Dengan manajemen backup yang baik, dalam kondisi normal data Anda akan tetap aman. Hidup Anda tidak akan pernah aman jika tidak mempunyai backup.

Salah satu konsep backup yang terkenal adalah dengan aturan 3-2-1 yang berarti:

1. mininal 3 backup
2. disimpan pada 2 format yang berbeda
3. 1 offsite backup

## Media Backup

Tentunya, ada begitu banyak media yang dapat digunakan untuk menyimpan backup. Saya membaginya berdasarkan 2 kategori yaitu online dan offline. Untuk media online, ada banyak servis yang menawarkan tempat penyimpanan data dari yang gratis hingga yang berbayar. Biasanya, servis online tersebut menyediakan tempat gratis terbatas untuk menyimpan data. Untuk dokumen-dokumen penting saja, yang versi gratis sudah cukup kok. Kalau Anda membutuhkan tempat yang besar untuk berkas yang besar seperti gambar, audio, dan video, Anda perlu membayar lebih. Untuk media online, saya menggunakan [Google Drive][1] dan [Dropbox][2]. Enaknya menggunakan servis penyimpanan online adalah, **data backup Anda akan selalu pada versi terbaru karena kedua aplikasi tersebut akan selalu melakukan sinkronisasi data jika ada data lokal yang bertambah, berubah, atau hilang**. Permasalahan dengan media backup online adalah, jika jumlah berkas Anda besar dan banyak, membutuhkan waktu yang cukup lama untuk mengunduhnya.

Untuk offline backup, terdapat juga beberapa jenis pilihan yang dapat digunakan. Yang pertama adalah bawaan sistem operasi. Fitur pembuatan backup sudah menjadi fitur standar dalam hampir setiap sistem operasi. Untuk Windows, di bagian *System and Maintenance*, Anda dapat menyiapkan backup. Untuk Mac, Anda dapat menggunakan *Time Machine*. Untuk Linux, sayangnya, saya belum menemukan aplikasi native yang sudah disiapkan langsung.

Masalah utamanya adalah, **fitur backup tidak diaktifkan by default**. Jika Anda baru menggunakan komputer baru atau baru instal ulang, Anda harus menyalakan fitur backup tersebut. Untuk offline backup, saya menyarankan untuk menaruh datanya di media eksternal seperti HDD atau SSD external. Untuk Mac, Anda bisa menggunakan [Time Capsule][0](agak mahal). Kenapa harus taruh di luar komputer, tentu saja karena esensi dari backup adalah tempat penyimpanan data di tempat yang berbeda.

Saran saya dalam pemilihan media penyimpanan untuk backup adalah gunakan 1 yang online dan 1 yang offline. Saya sendiri menggunakan Google Drive + Dropbox + 1 HDD. Ada beberapa orang yang berpendapat kalau tempat penyimpanan online itu bukan menjadi tempat backup yang baik karena rentan hilang dan kita tidak mempunyai kendali atas kondisi tersebut. Menurut saya, HDD saya lebih berpotensi hilang daripada server Google atau Dropbox terkena musibah. :)

## Offsite backup

Offite backup menjadi penting untuk perlindungan jika terjadi musibah non-digital seperti perampokan atau kebakaran. Beberapa pilihan offsite backup adalah kotak brankas, rumah orang lain(seperti rumah orang tua atau saudara), dan jasa penyimpanan barang berharga(deposit box) di bank. Untuk data personal, saya sendiri menaruh HDD saya di rumah orang tua saya karena terlalu overkill jika sampai menggunakan brankas atau jasa penyimpanan barang berharga. Mungkin tunggu data personal saya menjadi sangat penting. XD.

## Pertimbangan Harga

Selain keamanan, tentu saja kita perlu mempertimbangkan harga yang perlu kita bayarkan. Idealnya, kita menemukan posisi yang seimbang antara keamanan yang kita butuhkan dengan budget. Google Drive dan Dropbox nenawarkan beberapa belas GB secara gratis(Dropbox awal 2 GB tapi ada mekanisme penambahan). Jika berkas Anda hanya dokumen, seharusnya yang versi gratis pun cukup. Saya sendiri masih pakai versi gratis. Untuk yang berbayar, Google Drive dan Dropbox menawarkan 9.99$ per bulan untuk 1 TB.

Jika mengukur nilai efisiensi, harga HDD external sekitar 500K-1M untuk 500GB-1TB. Harga brankas bervariasi 500K-10M tergantung ukuran brankas. Untuk deposit bank, ini biasanya yang paling mahal, biasanya dibayar per tahun atau per 6 bulan dan biayanya sangat tergantung bank. Dari yang paling murah ratusan ribu hingga puluhan juta tergantung ukuran deposit box. Silahkan sesuaikan dengan kebutuhan keamanan Anda sendiri. Saya sendiri masih cukup dengan HDD.

## Kesimpulan

Jadi, untuk setelan saya, saya mempunyai 3 macam backup dengan 2 for yang berbeda dan 1 di offsite(Google Drive + Dropbox + 1 HDD di rumah orang tua). Saran saya setelah menyiapkan backup, **selalu coba untuk mengambalikan(*restore*) data tersebut pada komputer Anda untuk uji coba**. Permasalahannya adalah, backup selalu berhasil, tetapi mengembalikan data dari backup sering kali gagal. Selamat memanajemen data Anda! Jika Anda mempunyai solusi lain untuk manajemen data dari yang saya jelaskan, saya senang untuk mendengarkan. :)

[0]:    https://www.apple.com/airport-time-capsule/
[1]:    https://www.google.com/drive/
[2]:    http://www.dropbox.com/
