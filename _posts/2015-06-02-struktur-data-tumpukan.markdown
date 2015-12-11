---
layout: post
title:  "Struktur Data: Tumpukan(Stack)"
date:   2015-06-02 11:57:08
categories: stuktur-data dasar
author: Edwin Lunando
author_t: edwinlunando
permalink: struktur-data-tumpukan
description: struktur data tumpukan
---

Baru beberapa minggu ini, saya mulai menekuni lagi dunia pemrograman kompetitif. Beberapa situs pemrograman seperti [codeforces.com][1] saya kunjungi lagi setelah sekian lama berkancah di dunia sumber terbuka(open source). Setelah melakukan eksplorasi sederhana, saya menemukan situs yang sangat seru untuk digunakan sebagai tempat latihan pemrograman, yaitu [hackerrank.com][2].

Saya memulai menekuni dunia pemrograman kompetitif lagi untuk belajar hal-hal dasar yang membentuk dunia pemgrograman ini, terutama dalam bidang struktur data. Struktur data merupakan hal mendasar yang digunakan untuk merepresentasikan data yang disimpan di dalam memori. Salah satu struktur data yang dasar adalah tumpukan(stack).

![Ilustrasi Stack](/images/Stack.png)

Definisi formal tumpukan adalah struktur data abstrak yang merupakan koleksi/kumpulan elemen yang bersifat LIFO(last in first out). LIFO berarti elemen yang terakhir masuk merupakan elemen yang pertama keluar. Tumpukan mempunyai dua operasi dasar yaitu `push` dan `pop`. `push` artinya memasukkan elemen ke dalam tumpukan. `pop` artinya mengeluarkan elemen teratas dari tumpukan. Berikut merupakan implementasi sederhana dari struktur data tumpukan dengan bahasa Python.

{% highlight python %}

class Stack:

    def __init__(self):
        self.data = [None] * 10
        self.max_length = 10
        self.top = -1

    def push(self, obj):
        if self.top + 1 == self.max_length:
            self.data += [None] * self.max_length
            self.max_length *= 2
        self.data[self.top + 1] = obj
        self.top += 1

    def pop(self):
        if self.top == -1:
            raise Exception('Stack is empty')
        data = self.data.pop(self.top)
        self.top -= 1
        return data

{% endhighlight %}

Berikut implementasi paling sederhana dari sebuah tumpukan. Saya menginisialisasi stack dengan panjang kontainer data 10, lalu saat kontainer sudah penuh dan ingin memasukan data lagi, saya mengubah panjangnnya menjadi dua kali lipat yang sebelumnya. Masih banyak lagi implementasi lain dari stack. Salah satu implementasi tumpukan yang menurut saya baik adalah dengan dua buah antrian(Queue).

Dalam dunia pemrograman, tumpukan merupakan struktur data yang sangat penting. Berikut beberapa kasus nyata dalam penggunaan tumpukan.

1. Menyimpan penggunaan fungsi rekursif. (depth first search dan backtrack)
2. Mengevaluasi ekspresi dalam bahasa pemrograman.
3. Operasi undo/redo.

Dan tentunya saking pentingnya struktur data tumpukan, dibuatlah situs [stackoverflow.com][3]. :)). Mulai sekarang, saya juga akan membahas hal-hal dasar yang sangat penting dalam dunia pemrograman. Jika kita menjadi mahir dalam suatu bidang, tentunya hal-hal dasar sudah harus di luar kepala lah. :D.

[1]:    http://codeforces.com/
[2]:    https://www.hackerrank.com/
[3]:    http://stackoverflow.com/


