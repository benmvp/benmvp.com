---
layout: post
title:  "Lingkungan Pengembangan Web: Docker"
date:   2015-08-17 11:57:08
categories: manajemen data
author: Edwin Lunando
author_t: edwinlunando
permalink: lingkungan-pengembangan-docker
description: mempersiapkan lingkungan pengembangan dengan docker
---

Sampai sekarang, saya masih mencari metode atau kakas yang mempersiapkan lingkungan pengembangan yang terbaik untuk membuat saya lebih asik dalam pengembangkan aplikasi. Setiap kali saya ingin memulai mengembangkan aplikasi yang baru, tentunya cukup banyak *dependency* yang perlu saya siapkan. Menyiapkan basis data(mysql atau postgres), cache storage(memcached atau redis), search engine(elasticsearch), dan pustaka-pustaka terkait framework. Untuk proyek pertama, mungkin komputer kita tentu masih dapat diatur. Tetapi, bagaimana kalau proyek di komputer kita sudah banyak? Bisa saja setiap proyek membutuhkan versi *dependency* yang berbeda. **Tentunya cukup sulit mengatur banyak jenis versi aplikasi seperti MySQL atau Redis di satu mesin yang sama**.

Kalau solusi klasik saya untuk permasalahan ini adalah dengan menyiapkan [virtual machine][2](VM) untuk setiap proyek. Untuk memanejemen saya biasanya menggunakan [Vagrant][1]. Permasalahannya, untuk menjalankan satu VM saja membutuhkan resource yang cukup besar, terutama memory. Saya rasa akan sangat membebani mesin jika Untuk kasus ini, salah satu kakas yang memberikan solusi untuk permasalahan ini adalah [docker][0].

## Virtual Machine dan Docker

<img src="/images/docker.png" alt="Perbandingan VM dengan Docker" style="width: 100%;"/>

Docker adalah kakas yang menyiapkan abstraksi di atas VM sama seperti Vagrant. Perbedaannya, docker mempunyai sistem container yang mirip dengan VM. Container mirip dengan VM, tetapi **jika kita menjalankan banyak container, kernel yang berjalan tetap hanya 1(*shared kernel*)**. Konsep ini membuat penggunaan resource menjadi lebih efisien dibanding 1 kernel untuk 1 VM(Vagrant).

Untuk penggunaan konkritnya, saya menggunakan kakas [docker-compose][3]. Kakas ini digunakan untuk mengatur banyak container sekaligus. Kita hanya butuh menulis "resep" dari *dependency* lingkungan pengembangan kita, lalu kakas tersebut akan secara otomatis mengunduh dan menjalankannya. Untuk menggunakannya, kita cukup membuat [`Dockerfile`][4] dan [`docker-compose.yml`][5]

## Contoh Pengunaan

Sebagai contoh, kita akan menyiapkan lingkungan pengembangan untuk Ruby on Rails dengan menggunakan Postgres. Berikut contoh Dockerfile dari proyek menggunakan Ruby on Rails. Sebelumnya, Anda harus menginstal [docker][6] dan [docker-compose][7].

{% highlight bash %}

FROM ruby:2.1.4
# update system
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs npm nodejs-legacy imagemagick

# creating standard directory for code
ENV APP_HOME /recipe
RUN mkdir $APP_HOME

# gem file caching
ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile
ENV BUNDLE_JOBS=2
ENV BUNDLE_PATH=/bundle
ADD Gemfile $APP_HOME/Gemfile
ADD Gemfile.lock $APP_HOME/Gemfile.lock
RUN bundle install

# set working directory
WORKDIR $APP_HOME
ADD . $APP_HOME

{% endhighlight %}

Dockerfile digunakan untuk mempersiapkan image yang akan di-*build* untuk dijalankan menjadi container. Di sini, kita dapat menginstal pustaka-pustaka yang dibutuhkan dari sebuah aplikasi tersebut. Dalam kasus ini, kita membutuhkan `libpq-dev` untuk Postgres. Biasanya, proses untuk nge-*build* sebuah image cukup lama karena mengunduh dan menginstal banyak pustaka. Untuk mem-*build* image, jalankan `docker-compose build`.

Setelah itu, mari kita definisikan file `docker-compose.yml` kita. Berikut contohnya.

{% highlight yaml %}

db:
  image: postgres
  ports:
    - 5432:5432

web:
  build: .
  command: bundle exec rails s -p 3000 -b '0.0.0.0'
  volumes:
    - .:/recipe
  volumes_from:
    - bundle
  ports:
    - 3000:3000
  links:
    - db
  environment:
    - DEV_DB_HOSTNAME=db
    - DEV_DB_NAME=recipe_dev
    - DEV_DB_USERNAME=postgres
    - TEST_DB_HOSTNAME=db
    - TEST_DB_NAME=recipe_test
    - TEST_DB_USERNAME=postgres

bundle:
  image: recipe_web
  command: echo 'haha'
  volumes:
    - /bundle

{% endhighlight %}

Pada `docker-compose.yml`, kita dapat mendefinisikan kebutuhan container kita. Pada kasus kita, kita akan mendefinisikan 3 container. 1 untuk Postgres, 1 untuk kode kita, dan 1 untuk menaruh pustaka(khusus Rails karena bundler). Kita bisa saja menambahkan container sesuai yang kita butuhkan. Nah, image yang digunakan itu dapat dipilih dari [docker hub][8]. Docker hub adalah tempat umum untuk menaruh image-image Docker yang bisa diunduh dan dapat langsung dijalankan sebagai container. **Bagusnya, banyak aplikasi-aplikasi populer seperti Postgres, MySQL, Redis, dan Elasticsearch sudah terdapat di Docker hub**. Jadi, kita tinggal menyebutkan nama image dan versi yang kita butuhkan. Lalu, docker-compose akan langsung mengunduhnya.

Image `web` merupakan image utama yang digunakan untuk menjalankan application server. Setiap container lain yang berhubungan dengan aplikasi utama harus dimasukkan ke `links`. `volumes` untuk menaruh kode. `volumes_from` untuk menaruh gem dari bundler. Setelah menyelesaikan konfigurasi, kita hanya perlu menjalankan `docker-compose up` untuk menjalankan application server kita beserta dependency yang lainnya.

Setelah menggunakan `docker-compose`, untuk menjalankan *command* rails, dibutuhkan prefix `docker-compose run web` seperti.

{% highlight bash %}
docker-compose run web bundle
docker-compose run web rails c
{% endhighlight %}

Untuk informasi lebih lengkap, silahkan langsung lihat [dokumentasi docker-compose][9].

Jadi, setiap kali kita ingin melanjutkan pengembangan aplikasi kita, kita hanya perlu menjalankan command `docker-compose up` dan semua *dependency* sudah siap untuk digunakan. Sangat praktis dan bersih. Dengan menggunakan docker, Anda tidak perlu menginstal *dependency* di mesin kita sama sekali. Saya sih senang dengan komputer saya yang hanya berisi editor teks dan Docker(dan beberapa aplikasi pembantu). Silahkan mencoba!


[0]:    https://www.docker.com/
[1]:    https://www.vagrantup.com/
[2]:    https://en.wikipedia.org/wiki/Virtual_machine
[3]:    https://docs.docker.com/compose/
[4]:    https://docs.docker.com/reference/builder/
[5]:    https://docs.docker.com/compose/yml/
[6]:    https://docs.docker.com/installation/
[7]:    https://docs.docker.com/compose/install/
[8]:    https://hub.docker.com/
[9]:    https://docs.docker.com/compose/reference/run/
