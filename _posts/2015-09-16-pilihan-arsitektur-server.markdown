---
layout: post
title:  "Pilihan Arsitektur Server"
date:   2015-09-16 11:57:08
categories: server arsitektur
author: Edwin Lunando
author_t: edwinlunando
permalink: arsiktektur-server
description: Pilihan-pilihan arsitektur server dalam aplikasi web
header_image: /images/server_setup.png
---

Pada saat mengembangkan aplikasi web, pilihan arsitektur sangatlah berpengaruh dalam hasil akhir performa aplikasi pada saat sudah rilis. Selain performa aplikasi, pemilihan arsitektur juga sangat berpengaruh terhadap biaya. Biaya ini terdiri dari biaya server dan biaya penanganannya. Salah dalam pemilihan arsitektur dapat menyebabkan menurunnya performa dan biaya yang membengkak. Mitosnya, kita memilih 2 dari murah, cepat, dan bagus. Saya rasa sih tidak juga. Dengan pemilihan arsitektur yang tepat, kita bisa mendapatkan performa yang baik dengan biaya yang relatif ditekan dan bahkan memaksimalkan *up-time* dari aplikasi kita. Berikut beberapa arsitektur dasar yang umum digunakan dalam arsitektur server.

## Semua di satu server

<img src="/images/user_server.png" alt="Perbandingan VM dengan Docker" style="width: 100%;"/>

Arsitektur yang paling sederhana adalah menaruh semuanya di sebuah server. Server web, server aplikasi, server basis data, dan aset-aset aplikasi di taruh di sebuah server yang sama. Ini merupakan pilihan yang paling ekonomis. Bahkan, satu server bisa saja diisi beberapa aplikasi yang kebutuhan servernya tidak tinggi.

Kelebihan

- Opsi paling ekonomis
- Sederhana(biaya perawatan minim)

Kekurangan

- Sulit mengetahui *bottleneck* jika terkena masalah performa karena *shared resource*
- Single point of failure(kalau server mati, semua mati)

## Server Basis Data Terpisah

<img src="/images/user_server_database.png" alt="Perbandingan VM dengan Docker" style="width: 100%;"/>

Salah satu bagian yang sering terkendala dengan performa adalah basis data. Jika data yang disimpan dan yang mengaksesnya semakin banyak, tentunya basis data memerlukan resource yang lebih besar. Salah satu metodenya adalah dengan memisah server aplikasi dengan server basis data.

Kelebihan

- Tidak *shared resource* menjadikan performa lebih baik
- Lebih mudah melakukan *scaling* secara vertikal untuk tiap bagian

Kekurangan

- Sedikit lebih kompleks(menambah biaya perawatan)
- Bisa ada masalah *latency* jika jaringan tidak baik atau lokasi server berjauhan
- Single point of failure(kalau satu server mati, aplikasi tidak jalan)

## Penggunaan Load Balancer

<img src="/images/user_load_server_database.png" alt="Perbandingan VM dengan Docker" style="width: 100%;"/>

Nah, jika komputasi server aplikasi sudah menjadi *bottleneck* atau kita ingin *up-time* yang lebih baik, kita dapat menggunakan load balancer seperti [HAProxy][2] atau [Nginx][3] untuk mangatur aliran dari *request* pengguna. Pertama-tama, *request* pengguna akan ditangkap oleh *load balancer* dan diarahkan ke server aplikasi yang bisa saja lebih dari satu. Metode pengarahan pun berbagai macam. Bisa saja kita mengarahkan *request* lebih banyak ke server aplikasi yang lebih kuat.

Kelebihan

- Up-time lebih baik. Jika salah satu server aplikasi mati, aplikasi tetap jalan
- Dengan konfigurasi yang tepat, keamanan lebih baik
- Lebih mudah dalam menangani penyerangan *denial of service*
- Bisa horizontal scaling dengan menambah server aplikasi

Kekurangan

- Jauh lebih kompleks. *Sticky sessions*, konfigurasi SSL, dan konfigurasi jaringan yang lebih kompleks.
- Load balancer bisa jadi *bottleneck* jika konfigurasi tidak tepat dna resource yang rendah(walaupun jarang)

## Replikasi Basis Data

<img src="/images/user_load_server_database_slave.png" alt="Perbandingan VM dengan Docker" style="width: 100%;"/>

Nah, salah satu yang bisa dikembangkan lagi adalah menggunakan konfigurasi master-slave pada basis data. Master digunakan untuk menulis data dan slave untuk membaca data. Arsitektur ini penting karena pada saat menulis, pengguna tidak dapat membaca data yang sama. Dengan begitu, beban dari server bisa dibagi.

Kelebihan

- Performa menulis dan membaca basis data lebih baik.
- Up-time lebih baik

Kekurangan

- Aplikasi harus yang memilih basis data master atau slave
- Ada jeda sebelum slave mendapatkan data terbaru dari master

## Kesimpulan

Masih ada banyak arsitektur yang digunakan untuk meningkatkan performa. Beberapa yang cukup populer adalah menambah server khusus untuk menaruh *cache* dan aset. Untuk *cache*, biasanya orang menggunakan [memcached][0] atau [redis][1]. Untuk aset, biasanya banyak yang menggunakan servis S3. Dan sebenarnya, masih banyak lagi kakas yang dapat digunakan untuk memenuhi kebutuhan. Permasalahannya adalah, kita harus mempertimbangkan biaya perawatan yang tentunya akan lebih besar jika menambah bagian ke arsitektur yang sudah berjalan. Pemilihan arsitektur yang tepat dapat membuat hidup Anda menjadi lebih baik. Terima kasih!

[0]:    http://memcached.org/
[1]:    http://redis.io/
[2]:    http://www.haproxy.org/
[3]:    http://nginx.org/
