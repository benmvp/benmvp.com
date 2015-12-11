---
layout: post
title:  "Cara Menyimpan Password yang Baik"
date:   2015-01-16 11:57:08
categories: basis-data password
author: Edwin Lunando
author_t: edwinlunando
permalink: password
description: cara menyimpan password yang baik
---

Sudah beberapa kali dari satu tahun ke belakang ini saya mulai mengerjakan beberapa proyek yang berbeda yang sudah dikerjakan oleh orang lain sebelumnya. Jadi, tugas saya adalah mengembangkan aplikasinya lebih lanjut sesuai dengan kebutuhan klien. Pada saat mengerjakan proyek tersebut, saya menemukan masalah sangat dasar, namun sangat fatal yaitu, **aplikasi tersebut menyimpan password pengguna dengan teks murni atau di-hash dengan fungsi MD5**. Saya mau nangis kalau lihat aplikasi dengan metode penyimpanan password seperti ini. :(

Masih begitu banyak pengembang aplikasi di Indonesia yang meremehkan metode penyimpanan password. Saya pun pernah menjalani masa tersebut, tapi setelah saya tahu apa yang peretas dapat lakukan dengan password tersebut, saya ketakutan. **Oleh karena itu, saya berprinsip, di saat saya meminta pengguna aplikasi saya menyimpan password, saya bertanggung jawab terhadap password tersebut.**

Idealnya, password itu hanya boleh diketahui oleh pengguna. Bahkan yang bikin aplikasinya pun tidak boleh tahu detil teks murni dari passwordnya. Dengan menyimpan password berbentuk teks murni, tentunya dari sisi internal pengembang aplikasi bisa tahu password-password penggunanya. Sedangkan jika menggunakan hash MD5, sudah banyak riset yang membuktikan bahwa fungsi [MD5 mudah dicari collision-nya][0] atau dengan menggunakan [rainbow table][1]. Dari sisi keamanan, tentunya penyimpanan password dengan teks dan MD5 tentunya sangat membahayakan data pengguna. Sekalinya jebol, langsung dapat dipastikan sang penjebol mendapatkan akses ke begitu banyak password. Apalagi kalau tahu banyak pengguna yang menggunakan password yang sama untuk setiap aplikasi. Horor!

Fungsi hash merupakan sebuah fungsi yang mempunyai input data digital dengan hasil data yang terlihat seperti data acak, di mana perubahan data masukan sedikit saja memberikan perubahan yang sangat besar pada hasil. Berikut merupakan hasil dari fungsi hash [SHA-1][2] pada nilai 1 dan 2.

    1 => 356a192b7913b04c54574d18c28d46e6395428ab
    2 => da4b9237bacccdf19c0760cab7aec4a8359010b0

Fungsi hash yang direkomendasikan untuk digunakan sekarang adalah [PBKDF2][3]. Tujuan dari fungsi hash yang kuat adalah supaya pengembang aplikasi pun tidak bisa tahu password dari setiap pengguna dan jika terjadi kebocoran data, pencuri data tetap tidak bisa tahu password dari pengguna. Fungsi PBKDF2 sudah [terbukti][4] kuat terhadap berbagai serangan kriptografi dan aman untuk digunakan.

Jadi, bagi setiap pengembang aplikasi, **singkatnya, selalu gunakan fungsi hash PBKDF2 setiap kali mengembangkan aplikasi baru** dan mulai memigrasi data password pengguna Anda jika masih menyimpan password menggunakan murni teks atau fungsi MD5. Meminta pengguna untuk memasukan password yang baru akan terlihat jaduh lebih indah daripada membayangi skenario pada saat data Anda jebol, pencuri mendapatkan banyak hak akses terhadap pengguna. Begitulah cerita horor insinyur perangkat lunak. :))

## Update! ##

Setelah melakukan eksplorasi lebih lanjut, fungsi hash [bcrypt][5] dan [scrypt][6] juga aman untuk digunakan untuk menyimpan password.

[0]:    http://tools.ietf.org/html/rfc6151
[1]:    http://en.wikipedia.org/wiki/Rainbow_table
[2]:    http://en.wikipedia.org/wiki/SHA-1
[3]:    http://en.wikipedia.org/wiki/PBKDF2
[4]:    http://tools.ietf.org/html/rfc2898
[5]:    http://en.wikipedia.org/wiki/Bcrypt
[6]:    http://en.wikipedia.org/wiki/Scrypt
