import { productGrowth } from './product-growth.ts';
import { coreProductCases } from './product-cases-core.ts';
import { infraProductCases } from './product-cases-infra.ts';
import { productCaseSchema, productValueSchema } from '../lib/product-value.ts';
const theses: Record<string, string> = {
  pim: 'Katalog sorumlusunun değişen tedarikçi dosyasını önceki eşlemeyle kontrol edip aynı kanala aktarması hedefleniyor. Üretici veya distribütör, ikinci ve sonraki güncellemelerde hazır içe aktarıcıya göre daha az düzeltme ve hata oluşursa bu fark için ödeme yapabilir.',
  ibys: 'OSGB planlayıcısının bir profesyonel yokken ziyaretleri geçerli bir plana yeniden ataması hedefleniyor. OSGB, mevcut planlama aracına göre daha az telefon, düzeltme ve çakışmayla aynı işi tamamlıyorsa bu katkı için ödeme yapabilir.',
  destektesvik:
    'Danışmanın program koşulları değiştiğinde hangi firma dosyalarının yeniden incelenmesi gerektiğini kaynak sürümüyle görmesi hedefleniyor. Danışmanlık bürosu, mevcut araç ve dosyalara göre daha az yeniden tarama yapıyorsa bu iş yükü azalması için ödeme yapabilir.',
  hakedis:
    'Şantiye veya mali işler sorumlusunun dönem ve taşeron dosyalarındaki farkı özgün hücrelere kadar izleyebilmesi hedefleniyor. Yüklenici, mevcut Excel ve hakediş yazılımına göre farkı bulma ve uzmanla uzlaşma emeği azalırsa bu katkı için ödeme yapabilir.',
  'cups-clouds':
    'Operasyon sorumlusunun mevcut mağaza ve POS sistemlerini koruyarak sipariş, iade ve stok farkını bulması hedefleniyor. Zincir işletme, hazır rapor ve entegrasyon ayarlarına göre daha az elle uzlaştırma yapıyorsa bu fark için ödeme yapabilir.',
  atonota:
    'Studio için hipotez, ajansın genel bir AI raporu almak yerine belirli site işini kaynaklarıyla önceliklendirmesi ve kabulünü izlemesi. Ajans sahibi ancak mevcut rapor ve görev araçlarına göre uzman inceleme veya revizyon yükü azalırsa ödeme yapabilir. AtonotA çatısının tamamı tek ürün değildir.',
  hrms: 'İK sorumlusunun belirli bir sektörün dönem kapanış istisnasını daha az düzeltmeyle muhasebeye aktarması hedefleniyor. İşletme ancak hazır HRMS yapılandırmasından daha iyi toplam sonuç alırsa ödeme yapabilir; sektör ve çözülemeyen istisna henüz seçilmedi.',
  guardian:
    'Geliştiricinin kaynak baskısında hangi AI oturumunun hangi sürece sahip olduğunu daha az yanlış müdahaleyle bulması hedefleniyor. İlk yatırım gerekçesi iç araç katkısıdır; bağımsız ücretli ürüne geçiş için Activity Monitor ve mevcut oturum araçlarına karşı ayrıca değer gösterilmeli.',
  arsam:
    'Emlak işletmesinin tek bölge ve arsa türünde güncel ilanı uygun başvuruyla eşleştirirken eleme yükünü azaltması hedefleniyor. Ödeme gerekçesi mevcut ilan ağına göre daha nitelikli sonuç gerektirir; bu fark ve eldeki alıcı erişimi henüz gösterilmedi.',
};
export const productCases = [...coreProductCases, ...infraProductCases].map(
  (c) => {
    if (!productGrowth[c.id])
      throw new Error(`Büyüme değerlendirmesi eksik: ${c.id}`);
    return productCaseSchema.parse({
      ...c,
      businessThesis: theses[c.id] || null,
      growth: productGrowth[c.id],
      experiments: c.experiments.map((e, i) => ({
        ...e,
        effort: {
          status: 'not_estimated',
          basis:
            i === 0
              ? `Alıcıya ve mevcut iş örneğine erişim belirlenmeli. ${c.problem.trigger || 'Tetikleyici sorun henüz netleşmedi.'}`
              : i === 1
                ? `${c.alternatives[0].name} ile aynı veri ve kapsamda deneme kurulumu ölçülmeli.`
                : c.distribution.cost,
        },
      })),
    });
  },
);
export const productValue = productValueSchema.parse({
  version: '1.0',
  date: '2026-10-10',
  basis:
    'Alıcı ve değer hipotezi, portföy katkısı ve teknik iş ayrı değerlendirilir. Hipotezler gözlenmiş talep değildir. Bilinmeyen puana çevrilmez.',
  cases: productCases,
});
export function caseFor(id: string) {
  const c = productCases.find((c) => c.id === id);
  if (!c) throw new Error(`Ticari vaka eksik: ${id}`);
  return c;
}
