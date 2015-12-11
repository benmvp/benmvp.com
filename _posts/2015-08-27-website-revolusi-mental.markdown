---
layout: post
title:  "Terkait Website Revolusi Mental"
date:   2015-08-27 11:57:08
categories: website revolusi-mental
author: Edwin Lunando
author_t: edwinlunando
permalink: website-revolusi-mental
description: pendapat terkait website revolusi mental
---

Senin, 24 Agustus 2015, kemarin, pemerintah Indonesia meluncurkan revolusimental.go.id(yang langsung down beberapa saat setelah rilis). Tentunya, masyarakat banyak yang protes. Kenapa situs pemerintah yang sampai pakai acara rilis publik langsung *down*? Saya tidak akan membahas desain dan implementasi yang kayaknya mirip situs Obama(walaupun saya sedih juga) ataupun anggaran yang digunakan untuk mengerjakan situs(walaupun saya anggap aneh juga). Sebagai insinyur perangkat lunak yang pernah menggunakan situs pemerintah dan pernah mengembangkan situs untuk pemerintah, saya akan lebih membahas teknis dari pengembangan situsnya.

## Kenapa Down?

Saya dengar, situs revolusi mental down karena saking banyaknya yang akses, kapasitas server tidak mencukupi. Tentunya ada yang salah di sini. Tebakan saya, karena situsnya menggunakan wordpress, mereka menggunakan sistem *shared hosting* untuk servernya. Yang artinya, bisa ada banyak situs di dalam satu server tersebut. Tentunya, **kalau satu server digunakan untuk banyak situs, performanya tidak akan maksimal**. Apalagi mengingat kalau *shared hosting* kita tidak tahu kemampuan server dari penyedia server. Saya sendiri sudah tidak pernah penggunakan jasa *shared hosting* karena tidak baik dari sisi performa.

## Kenapa Shared Hosting?

**Sederhana, karena murah**. Saya tidak menemukan alasan lain yang valid untuk menggunakan *shared hosting* untuk situs macam apapun selain karena ekonomis. Tentunya ini jelas kesalahan pengambilan keputusan dari yang ngurus situs revolusi mental. Sebenarnya kan bisa saja menggunakan server yang dimiliki pemerintah sendiri atau menyewa server yang didedikasikan untuk situs tersebut.

## Kenapa Lama Diperbaikinya?

Nah, kalau yang ini memang tergantung dari performa tim yang ngurus situsnya. Kalau dari pengalaman saya, pindah server untuk situs yang berbasis wordpress bisa dilakukan kurang dari 1 hari. Bahkan, kurang dari 1 jam untuk yang orang sudah berpengalaman. Toh, jaman sekarang kita dapat menyewa server baru dalam hitungan menit. Dari pengalaman saya juga, **berkoordinasi dengan tim pemerintah biasanya responnya sangat lambat**. Birokrasi, biasa. Mungkin mereka mau ganti implementasi dari situsnya karena [terbukti menggunakan aset-aset dari situs Obama][0].

## Solusinya

Kalau sekedar solusi teknisnya ya, mudah kok. Tinggal ganti server yang lebih baik. Terkait desain dan implementasi, di Indonesia juga sudah banyak yang bisa bikin situs yang bagus gak perlu "[terinspirasi][1]" atau jiplak dari situs yang lain. Masalahnya utamanya, jelas berada di tim yang ngurus situsnya. Kalau perlu sini deh saya bantu dalam ngurus situsnya gratis. Sudah capek juga saya melihat situs-situs pemerintah yang desain dan implementasinya kurang baik. Sekian.

[0]:    http://www.kompasiana.com/imgos/situs-revolusi-mental-jiplak-situs-barack-obama_55dcf40c2f93737b081f83c6
[1]:    http://nasional.kompas.com/read/2015/08/26/15405201/Situs.Web.Revolusi.Mental.Diakui.Terinspirasi.Situs.Milik.Obama
