# İş Fikirlerim: yazılım geliştirme stratejisi

Kişisel yazılım portföyünde hangi geliştirme dilimine yatırım yapılacağını karşılaştıran statik çalışma alanı.

[Yayımlanan site](https://karacaismail.github.io/isfikirlerimchatgpt/) · [Strateji ve ECA kuralları](https://karacaismail.github.io/isfikirlerimchatgpt/kararlar/) · [Yöntem](https://karacaismail.github.io/isfikirlerimchatgpt/yontem/)

Aktif strateji 2.2; 6 ayrıntılı ve 17 ilk kaynak değerlendirmesinden oluşan 23 aday kayıt içerir. Çatı, ürün, araştırma ve altyapı ayrı belirtilir; kayıt sayısı bağımsız çalışan ürün sayısı değildir. Kullanıcının güncel beyanına göre TÜRSAB dışındaki projeler kendisine aittir. TÜRSAB geliştirme karşılaştırmasının dışındadır.

Üç karar ayrıdır: ticari konum, portföy yatırımı ve sıradaki mühendislik işi. 23 vakada kullanıcı/karar verici/ödeyen, ekonomik sorun, mevcut alternatif, ayrı satın alma nedeni, AI ile kolay kopya, reklamsız erişim, tekrar ödeme ve hizmet maliyeti değerlendirilir. 10 ticari ölçüt / 8 ticari ECA, 15 teknik ölçüt / 14 teknik ECA’dan ayrıdır. GenUI bağımsız satış önerisinden ve önceki PIM / Studio genel başlangıç sırası aktif önerilerden çıkarılmıştır. Varsayılan katalog yalnız dar değer önerisi sınanacak hipotezleri gösterir; tüm 23 kayıt ayrıca erişilir. Hipotezler talep veya satış kanıtı değildir. Eski puanlar kullanılmaz; bilinmeyen null kalır. Peşinat geliştirme şartı değildir. Kaynak ürün runtime sonucu `not_run` olarak korunur.

Astro 7.3.8, React 19.3.0, Mantine 9.7.1, TypeScript 6.0.3. Node 24.21.0 ve npm 11.19.0 kullanılır. Kurulu sürümler lockfile ile sabittir.

```sh
npm ci --ignore-scripts
npm run format:check
npm run check
npm test
npm run build
npm run test:browser
```

Üretim çıktısı `dist`; yerel ön izleme `npm run preview`, base `/isfikirlerimchatgpt/`, port 4179. Ham proje belgeleri ve özel analiz kayıtları bu depoya alınmaz. `veri.json` ayrıntılı kaynak kaydı 1.1; `strateji.json` aktif geliştirme verisi 2.2; `deger.json` ticari değerlendirme 1.0. Üçü de sıkı şema ve yayın eşitliği kontrolünden geçer.

[Kalıcı proje kararları](docs/TEKNIK-KARARLAR.md), [doğrulama kaydı](docs/DOGRULAMA.md).

Lisans kararı kullanıcı tarafından sonraya bırakılmıştır; lisans eklenmemiştir.
