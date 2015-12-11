---
layout: post
title:  "Konfigurasi Sublime Text Saya"
date:   2015-06-27 11:57:08
categories: konfigurasi sublime-text
author: Edwin Lunando
author_t: edwinlunando
permalink: konfigurasi-sublime-text
description: konfigurasi sublime text saya
---

Dalam mengembangkan aplikasi web, pilihan editor teks saya adalah [Sublime Text][0]. Saya sudah mencoba editor lain seperti [Atom][1] dan [Visual Studio Code][2] tetapi, saya selalu kembali ke Sublime Text karena paling cocok dengan kebutuhan saya. Berikut saya akan membagikan konfigurasi Sublime yang saya gunakan.

    {
        "theme": "Afterglow.sublime-theme",
        "color_scheme": "Packages/Theme - Afterglow/Afterglow.tmTheme",
        "draw_white_space": "all",
        "ensure_newline_at_eof_on_save": true,
        "highlight_line": true,
        "highlight_modified_tabs": true,
        "ignored_packages":
        [
            "Vintage"
        ],
        "translate_tabs_to_spaces": true,
        "trim_trailing_white_space_on_save": true
    }

Mari kita bahas satu per satu.

## theme dan color_scheme

Terkait tema, saya menggunakan [Afterglow][3], sebuah tema *flat* dengan palet warna kontras dengan *background* gelap. Saya suka dengan tema ini karena cocok dengan mata saya ditambah dengan desain untuk setiap esktensi berkas yang cantik. Untuk menulis kode yang cantik diperlukan editor yang cantik juga. :D.

## draw_white_space

`draw_white_space` saya gunakan untuk membedakan kode yang menggunakan tab dengan yang menggunakan spasi. Sangat menyenangkan, khususnya untuk memperbaiki kode orang lain yang terkadang tab dengan spasinya tercampur.

## ensure_newline_at_eof_on_save

Kenapa setiap file butuh ada `newline` pada setiap barisnya? Karena [standar POSIX][4] menyatakan bahwa sebuah baris itu harus diterminasi dengan karakter `newline`.

## highlight_line

`highlight_line` digunakan untuk memperjelas baris kode yang sedang saya kerjakan. Sesederhana itu. Dalama beberapa kasus terutama *pair programming* sangat membantu untuk tetap fokus pada baris tersebut.

## highlight_modified_tabs

Sama seperti sebelumnya. Untuk membantu fokus, tapi untuk berkas yang sedang dikerjakan.

## ignored_packages

Saya tidak menggunakan mode [vintage][5] karena saya bukan pengguna [vim][6].

## translate_tabs_to_spaces

Saya jauh lebih suka spasi daripada tab karena spasi lebih konsisten dalam interpretasi. Setiap aplikasi dapat menginterpretasikan sebuah tab. Beberapa *client* git menginterpretasikan 1 tab sebagai 8 spasi. Padahal, ada beberapa aplikasi yang menyamakan 1 tab dengan 4 spasi. Untuk konsistensi, saya merekomendasikan menggunakan spasi.

## trim_trailing_white_space_on_save

Yak, ini salah satu konfigurasi favorit saya. Terkadang saat saya menulis kode, terdapat spasi spasi yang tidak dibutuhkan di akhir dari sebuah baris. Biasanya spasi tersebut tidak berbahaya karena tidak mengganggu sintaks dari bahasa pemrograman yang saya gunakan. Walaupun ada beberapa kasus yang mungkin bisa terjadi, tetapi sampai sekarang saya belum mengalaminya. Konfigurasi ini membuat Sublime secara otomatis menghapus spasi-spasi yang tidak berguna tersebut pada saat menyimpang berkas.

## scroll_past_end

Untuk memudahkan dalam melihat kode yang berada di posisi paling bawah. Dengan setelan ini, kita dapat men-*scroll* melampaui batas bawa dan membuat kode di baris paling bawah tersebut berada di tengah atau atas.

Untuk melihat konfigurasi Sublime dengan lengkap, Anda bisa mengecek di berkas *default* konfigurasi Sublime. Dengan bagitu, Anda bisa memlulai mencari setelan yang paling cocok dengan gaya Anda sendiri. Selamat mecoba!

[0]:   http://www.sublimetext.com/
[1]:   https://atom.io/
[2]:   https://code.visualstudio.com/
[3]:   https://github.com/YabataDesign/afterglow-theme
[4]:   http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_206
[5]:   https://www.sublimetext.com/docs/2/vintage.html
[6]:   http://www.vim.org/
