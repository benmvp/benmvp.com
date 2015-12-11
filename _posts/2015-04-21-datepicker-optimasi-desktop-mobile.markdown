---
layout: post
title:  "Datepicker: Optimasi di Desktop dan Mobile"
date:   2015-04-21 11:57:08
categories: datepicker javascript
author: Edwin Lunando
author_t: edwinlunando
permalink: datepicker-optimasi-desktop-mobile
description: optimasi datepicker pada desktop dan mobile
---

<link rel="stylesheet" href="{{ "/css/pikaday-package.css" | prepend: site.baseurl }}">
<script src="{{ "/js/modernizr.js" | prepend: site.baseurl }}"></script>

Kali ini, saya akan membahas salah satu komponen penting dalam sebuah form di HTML. Komponen tersebut adalah [input][4] untuk tanggal. Karena format tanggal itu berbeda-beda di setiap negara, biasanya tanggal direpresentasikan dengan teks dengan format yang sudah ditentukan. Pada komponen HTML, tanggal dapat direpresentasikan dengan `input` yang bertipe `text`. Contohnya sebagai berikut.

<input type="text" placeholder="Masukkan tanggal">

Permasalahannya adalah, form dengan input tanggal seperti itu sangatlah tidak intuitif dan tidak baik dari sisi kemudahan pengguna. Saat melihat input seperti itu, pengguna akan bertanya, bagaimana saya mengisi tanggal? Dengan format apa? Untuk supaya lebih efektif, pengguna perlu diberikan informasi terkait formatnya, misal `dd/mm/yyyy`. Untungnya, masih ada banyak cara lain yang lebih baik. Salah satu cara lain adalah dengan menggunakan komponen HTML5 yaitu `input` yang bertipe `date`. Berikut contohnya.

<input type="date" placeholder="Masukkan tanggal">

Dengan menggunakan input bertipe date, browser yang mendukung penggunaan komponen tersebut akan mengeluarkan *widget* yang berbentuk seperti kalender untuk memudahkan pemilihan tanggal. input bertipe date ini juga mempunyai kompabilitas yang baik terhadap browser mobile karena pada saat menginput tanggal di mobile, browser akan menggunakan *native widget* pada smartphone tersebut. Sayangnya, [input bertipe date ini tidak didukung oleh semua browser][5]. Contohnya firefox(hingga tulisan ini ditulis). Jika Anda membuka halaman ini dengan browser yang tidak mendukung input `date`, input di atas akan sama dengan input `text`.

Salah satu metode yang populer digunakan adalah dengan menggunakan pustaka javascript kalender. Ada begitu banyak implementasi pustaka kelender ini dengan berbagai pilihan desain dan fitur. Dengan menggunakan pustaka kalender, setiap kali pengguna ingin mengklik inputnya, akan keluar *widget* kalender. Karena menggunakan javascript, biasanya *widget* akan keluar di semua browser dengan rapi. Contohnya adalah sebagai berikut dengan menggunakan pustaka [pikaday][1].

<input type="text" id="datepicker" placeholder="Masukkan tanggal">

Saya senang menggunakan pikaday karena ringan dan mudah digunakan. Kekurangannya, *widget* kalender javascript akan sulit digunakan pada pengguna browser mobile karena respon sentuhan di mobile sangatlah berbeda dengan di desktop. Solusinya sederhananya adalah, dengan menggunakan *feature detection library* seperti [Modernizr][3]. Dengan menggunakan Modernizr, kita bisa melakukan pengecekan, apakan browser pengguna mendukung layar sentuh dan input bertipe date atau tidak. Jika tidak mendukung keduanya, berikan input tipe date, berikan *native widget* dari smartphone tersebut. Jika mendukung keduanya, gunakan *widget* kalender javascript biasa. Jika browser mendukung layar sentuh tapi tidak mendukung input tipe date(touch screen laptop dengan Firefox), tetap gunakan *widget* kalender.

Integrasi pikaday dengan Modernizr sudah dibuat di [sini][2]. And bisa menggunakannya langsung dengan mudah. Contoh di input atas sudah menggunakan pustakan kalender yang responsif. Jadi, jika Anda membuka halaman ini di browser mobile Anda, yang keluar adalah *native widget* dari smartphone milik Anda sendiri.

Sebenarnya, solusi mudah untuk permasalahan input tanggal ini adalah dengan menyediakan tiga buat input yang dapat merepresentasikan tanggal, bulan, dan tahun. Contohnya adalah sebagai berikut.

<input type="text" placeholder="Tanggal">
<select name="" id="">
    <option value="">Bulan</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
</select>
<input type="text" placeholder="Tahun">

Karena input bertipe `text` dan `select` didukung oleh semua browser mayoritas, maka tiga input tersebut bisa dikatakan sebagai solusi juga, walaupun saya tidak terlalu suka karena dari sisi pengguna. Agak repot jika harus mengisi banyak input dan sedikit menyusahkan dalam penanganannya dari sisi *backend* karena biasanya satu *field* itu merepresentasikan satu tipe data.

Baik, kira-kira begitulah solusi yang bisa saya berikan dalam penanganan masukan tanggal pada halaman web. Jika Anda punya solusi yang lebih baik, saya siap menampungnya. Terima kasih.


[1]:    https://github.com/dbushell/Pikaday
[2]:    https://github.com/mydea/PikadayResponsive
[3]:    http://modernizr.com/
[4]:    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input
[5]:    http://caniuse.com/#feat=input-datetime

<script src="{{ "/js/jquery.min.js" | prepend: site.baseurl }}"></script>
<script src="{{ "/js/pikaday-package.js" | prepend: site.baseurl }}"></script>
<script>

var d1 = $("#datepicker").pikaday({
    placeholder: "enter date"
});

</script>
