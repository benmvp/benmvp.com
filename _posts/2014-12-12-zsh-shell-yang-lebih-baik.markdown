---
layout: post
title:  "ZSH, shell yang lebih baik"
date:   2014-12-12 11:57:08
categories: kakas shell
author: Edwin Lunando
author_t: edwinlunando
permalink: zsh
description: zsh, shell yang lebih baik dari bash
---

Sejak beberapa tahun yang lalu, terminal sudah menjadi rekan kerja saya yang saya gunakan hampir setiap harinya. Karena saya pengguna linux, [bash][1] merupakan shell pertama yang saya gunakan. Setelah saya hampir satu tahun menggunakan `bash`, saya memutuskan untuk mencoba tipe shell yang lain.

Setelah meminta beberapa rekomendasi ke teman saya, saya diminta untuk harus mencoba [zsh][2] beserta [ohmyzsh][3] sebagai tambahannya. `zsh` merupakan sebuah shell yang disertai banyak fitur yang `bash` tidak ada. `ohmyzsh` merupakan pelengkap untuk `zsh` yang menambah banyak pelengkap otomatis.

Salah satu fitur yang paling sering saya gunakan pada `zsh` adalah auto-completion yang sangat lengkap. Hampir semua aplikasi umum yang saya gunakan ada pelengkap otomatisnya. Berikut contoh pelengkap otomatis untuk Django. Saya hanya perlu menekan tombol `tab` dan semua pilihan perintah sudah terlihat.

![Django auto-complete][4]

Beberapa aplikasi yang sering saya gunakan juga adalah `git`, `rails` dan `pip`
. Walaupun tampak sederhana, fitur pelengkap otomatis ini sangat membantu. Saya tidak perlu lagi harus membuka dokumentasi dari aplikasi tersebut. Bisa dibilang, setiap kali saya ingin menjalankan perintah, saya hemat beberapa detik.

Selain pelengkap otomatis, `ohmyzsh` juga menyediakan banyak ALIAS untuk aplikasi-aplikasi populer. Saya selalu menggunakan ALIAS `git` untuk mempercepat penulisan perintah. Beberapa ALIAS yang sering saya gunakan adalah.

1. `gst` dari `git status`
2. `ga` dari `git add`
3. `gc` dari `git commit`
4. `gp` dari `git push`

Hanya dari 2 fitur ini sudah sangat membantuku untuk mempermudah pekerjaan. Buat saya, pemilihan kakas sangat penting dalam mengembangkan aplikasi. Dengan kakas yang tepat, pekerjaan menjadi jauh lebih mudah dan berkualitas. Jadi, banyaklah bereksperimen. :)

[1]:    https://www.gnu.org/software/bash/
[2]:    http://www.zsh.org/
[3]:    http://ohmyz.sh/
[4]:    http://i62.tinypic.com/fx45rq.png
