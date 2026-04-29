export interface Piece {
  id: number;
  composer: string;
  title: string;
  performers: string[];
  description: string;
  poem?: string;
  poemYear?: string;
  poemAuthor?: string;
  poemTranslator?: string;
}

export const concertInfo = {
  title: `Zeneszerzés és Alkalmazott Zeneszerzés
BA diplomakoncert`,
  date: "2026. május 3.",
  time: "18:00",
  venue: `\nZeneakadémia, Solti terem\n`,
  venueEn: "Liszt Academy Budapest",
  note: "A koncert előtt, 16.00 órától a diplomázók vizsgafilmjei az I. előadó teremben tekinthetők meg.",
};

export const program: Piece[] = [
  {
    id: 1,
    composer: "Botos Gergely",
    title: "Kvintett",
    performers: [
      "Papp Máté (klarinét)",
      "Mészáros Jázon Márk (klarinét)",
      "Csongár Márton (basszetkürt)",
      "Lakatos Béla (basszusklarinét)",
      "Botos Gergely (kontrabasszus-klarinét)",
    ],
    description: "Ebben a darabomban igyekeztem a klarinét hangszercsalád sokszínűségét bemutatni a legelterjedtebb szoprántól kezdve egészen a ritkán használt kontrabasszus-klarinétig.",
  },
  {
    id: 2,
    composer: "Sepsi Botond",
    title: "Egyenes labirintus",
    performers: [
      "Híves Boglárka (szoprán)",
      "Sárréti Márton (hegedű)",
      "Paulovics Boglárka (hegedű)",
      "Sándor József (brácsa)",
      "Donáczi Cseperke (cselló)",
    ],
    description: "Ha bármit. A legapróbb építő elemeire bontva. Mindenhol ugyan azokhoz az építőelemekhez érkezel. Akkor mi értelme van a bármiknek? Kiút keresés egy végtelen labirintusból, mely egyszerre zuhanó és emelkedő, táguló és összezsugorodó, de legfőképp szüntelenül önmagát ismétlő.",
    poem: `Milyen lesz az a visszaröpülés,
amiről csak hasonlatok beszélnek,
olyanfélék, hogy oltár, szentély,
kézfogás, visszatérés, ölelés,
fűben, fák alatt megterített asztal,
hol nincs első és nincs utolsó vendég,
végül is milyen lesz, milyen lesz
e nyitott szárnyú emelkedő zuhanás,
visszahullás a fókusz lángoló
közös fészkébe? - nem tudom,
és mégis, hogyha valamit tudok,
hát ezt tudom, e forró folyosót,
e nyílegyenes labirintust, melyben
mind tömöttebb és mind tömöttebb
és egyre szabadabb a tény, hogy röpülünk.`,
    poemYear: "1965",
    poemAuthor: "Pilinszky János",
  },
  {
    id: 3,
    composer: "Törőcsik Kristóf",
    title: "A lágy fényhez fohászkodom",
    performers: [
      "Végh Janka (szoprán)",
      "Vajda Denejra (hárfa)",
      "Friderikusz Péter (cselló)",
    ],
    description: "Anna Ahmatova XX. századi orosz költő versének megzenésítése Konczek József fordításában. A szopránra, hárfára és csellóra íródott darab egyfajta kontemplatív érzelmi kettősséget próbál megeleveníteni.",
    poem: `A lágy fényhez fohászkodom…
(„Moljusz okonnomu lucsu…")

A lágy fényhez fohászkodom,
Szitál az ablakon.
S egész nap nincs mit mondanom,
A szív - dereng-borong.
Kis fémlavórom peremén,
Hol zöldre vált a réz,
Úgy játszadoz a könnyű fény,
Vidáman elbecéz.
Ily egyszerű és bűntelen
A csendes alkonyon
E profán szentély szűntelen,
S miként aranynak ünnepe,
Oly hű vigasztalóm.`,
    poemYear: "1909",
    poemAuthor: "Anna Ahmatova",
    poemTranslator: "Fordította: Konczek József",
  },
  {
    id: 4,
    composer: "Nagy Emma",
    title: "Metallic Flowers",
    performers: [
      "Krulik Eszter (hegedű)",
      "Szűcs Boglárka (hegedű)",
      "Lachegyi Róza (brácsa)",
      "Bali Gabriella (cselló)",
      "Szatzker Zsanett (harmonika)",
    ],
    description: "A fémesség áttetsző ragyogás, ami egy lassan lélegző formát képez, mindezt hajlékonyan, lassan alakot váltva",
  },
  {
    id: 5,
    composer: "Sebestyén-Lázár Regina",
    title: "something, someday, somewhere...",
    performers: [
      "Réz körút:",
      "Nagy Sándor (trombita)",
      "Szilágyi Dusán (trombita)",
      "Huszti Boldizsár (trombita)",
      "Faragó István (kürt)",
      "Gulyás Buda (harsona)",
      "Dénes András (harsona)",
      "Vida Mátyás (tuba)",
    ],
    description: "A darabot Váci Mihály, _Valami nincs sehol_ című verse inspirálta. Számomra ez a vers a beteljesülés hiányának állandó feszültségéről és a kitörés ismételődő, de mégis sikertelen kísérleteiről szól.\nA zenei anyagban ezt a hiányérzetet és keresést próbáltam megragadni: olyan folyamatokkal, amelyek elindulnak a feloldás felé, de nem jutnak el odáig.\nA szavak mélysége miatt nem vállalkozom teljes értelmezésre, ezért ajánlom a vers egészének elolvasását.",
    poem: `Süvítnek napjaink, a forró sortüzek,
      – valamit mindennap elmulasztunk.
Robotolunk lélekszakadva, jóttevőn,
      – s valamit minden tettben elmulasztunk.
Áldozódunk a szerelemben egy életen át,
      – s valamit minden csókban elmulasztunk.

Mert valami hiányzik minden ölelésből,
      – minden csókból hiányzik valami.
Hiába alkotjuk meg s vívünk érte naponta,
      – minden szerelemből hiányzik valami.
Hiába verekszünk érte halálig: – ha miénk is,
      – a boldogságból hiányzik valami.

Jóllakhatsz fuldoklásig a gyönyörökkel,
      – az életedből hiányzik valami.
Hiába vágysz az emberi teljességre,
      – mert az emberből hiányzik valami.
Hiába reménykedsz a megváltó Egészben,
      – mert az Egészből hiányzik valami.

A Mindenségből hiányzik egy csillag,
      – a Mindenségből hiányzik valami.
A Világból hiányzik a mi világunk,
      – a Világból hiányzik valami.

Az égboltról hiányzik egy sugár,
      – felőlünk hiányzik valami.
A Földből hiányzik egy talpalatnyi föld,
      – talpunk alól hiányzik valami.

Pedig így szólt az ígéret a múltból:
      – „Valahol! Valamikor! Valami!”
Hitették a bölcsek, hitték a hívők,
      – mióta élünk, e hitetést hallani.
De már reánk tört a tudás: – Valami nincs sehol!
      – s a mi dolgunk ezt bevallani,
s keresni azt, amit már nem szabad
      senkinek elmulasztani.

Újra kell kezdeni mindent,
      – minden szót újra kimondani.
Újra kezdeni minden ölelést,
      – minden szerelmet újra kibontani.
Újra kezdeni minden művet és minden életet,
      – kezünket mindenkinek újra odanyújtani.

Újra kezdeni mindent e világon,
      – megteremteni, ami nincs sehol,
de itt van mindnyájunkban mégis,
      belőlünk sürgetve dalol,
újra hiteti, hogy eljön
      valami, valamikor, valahol…`,
    poemYear: "1994",
    poemAuthor: "Váci Mihály",
  },
  {
    id: 6,
    composer: "Varga Nadin",
    title: "Glimmer",
    performers: ["Kalafszky Adriána (szoprán)", "Szabó Dénes (cselló)"],
    description: "A versben szereplő szavak egymás után olvasva nem alkotnak összefüggő jelentést, ugyanakkor hangzásuk és önálló jelentésük különféle benyomásokat keltenek. A lágyabb, zeneibb hangzású szavak inkább a kellemes érzetet erősítik, míg a keményebb hangzásúak feszültséget teremtenek - bár mindez természetesen teljesen szubjektív. Számomra a szöveg egy estétől hajnalig tartó folyamat képzetét idézte fel, amelyet a darabban is igyekeztem megjeleníteni.",
    poem: `mist thin sheer dim bleak
mist thin still drift green sheen
deep sleep dream breeze silent silver
evening melody horizon slowly
over drowsy low lone soft small
fall slow low lone
soft small fall
s
o
m
n
a
m
b
u
l
i
s
m
calm balm palm warm old soul
gloom bloom gloam loom loam room moon
moor mourn storm droop croon swoon drawl
hollow sorrow follow borrow morrow shadow
lonesome soothing moody autumn snowfall dawn dusk
moon room loom gloom bloom gloam loam calm balm palm warm
fog pond swarm spawn torn drawn drowse drone groan lull slow roam coast yore
dream deep sleep dream drift drift green sheen
mist thin sheer still drift sleep dream
green sheen mist thin sheer
mist thin
mist`,
    poemYear: "2026",
    poemAuthor: "Zsigmond Soma",
  },
  {
    id: -1,
    composer: "",
    title: "SZÜNET",
    performers: [],
    description: "",
  },
  {
    id: 7,
    composer: "Botos Gergely",
    title: "Hajnaltól éjfélig",
    performers: [
      "Kerti Júlia (mezzoszoprán)",
      "Németh Flóra (fagott/kontrafagott)",
      "Botos Gergely (zongora)",
    ],
    description: "A mű Radnóti Miklós azonos című költeményéből dolgoz fel néhány rövid szemelvényt. A fagott-kontrafagott váltakozása szembeállítja az ártatlan tájverset az akkori kor szociális életével.",
  },
  {
    id: 8,
    composer: "Nagy Emma",
    title: "Limbs Move Better / Satellite",
    performers: [
      "Harcsa Veronika (ének)",
      "Horváth Áron (cimbalom)",
      "Gyányi Marcell (nagybőgő)",
      "Kapolcsi-Szabó Levente (zongora)",
    ],
    description: "",
    poem: `LIMBSMOVE BETTER
Wind blows
Wailing
On the hill's fans
Step it
Over
You have done nothing wrong
Slide
Tamer soft as pillow
Left foot to the right
Nerve has moved on yesterday
Now you've got the time
Mellow
from harsh
Take a step
Forward
Limbs move
Better
Since together
Wind blow
Wailing
on the hills fans
Step it
Over
You have done nothing wrong
Slide
Tamer soft as pillow
Left foot to the right
Nerve has moved on yesterday
Now you've got the time

SATELLITE
Who can I enlight my vision
Or turn up the dimmer
How can it happen
Let me try to change view to 'nother version
High is the mountain
High is the firewall
Let me try to change view to 'nother version
Imagine
I hope
All these houses folding out
What remains is the lawn
No satellite brings me home
Naming a street was never
more difficult
Is this my hometown
Is this your hometown
Naming a street was never
more difficult
Is this my hometown
Is this your hometown
Is this your hometown`,
    poemYear: "2026",
    poemAuthor: "Nagy Gergő",
  },
  {
    id: 9,
    composer: "Varga Nadin",
    title: "Blue Jungle",
    performers: [
      "Tóth Domonkos (klarinét)",
      "Botos Gergely (basszusklarinét)",
      "Pintér Anna (fuvola)",
      "Holozsai Eszter (fuvola)",
      "Sebestyén-Lázár Kata (fuvola)",
      "Szilágyi Péter (marimba)",
      "Vezényel: Kemény Péter",
    ],
    description: "Ez a darab az esőerdők gazdag és sokszínű hangzásvilágának emlékére született. A különféle hangszeres effektusok ennek a különleges természeti környezetnek az atmoszféráját idézik meg: a csepegő eső hangját, a szél susogását, valamint a különböző madárfajok énekét. Mivel az esőerdők napjainkban egyre nagyobb veszélynek vannak kitéve, a mű egyfajta tisztelgés is e még létező, különleges erdei hangzásvilág előtt.",
  },
  {
    id: 10,
    composer: "Sepsi Botond",
    title: "Floating",
    performers: ["Várallyay Fülöp (zongora)"],
    description: "A lebegés szóra – nagyon találóan – az angoloknak két szavuk van. Míg a „levitation” egy mágikus dolog, a „floating” az, amikor a könnyebb fajsúlyú dolog úszik, lebeg a nehezebben. A fókusz számomra az egészből a „könnyebb”-en van. Ez nem mágikus, hanem valóságos, természetes.",
  },
  {
    id: 11,
    composer: "Törőcsik Kristóf",
    title: "Nitzakhon",
    performers: [
      "Krulik Eszter (hegedű)",
      "Szűcs Boglárka (hegedű)",
      "Lachegyi Róza (brácsa)",
      "Koppán Kata (brácsa)",
      "Bali Gabriella (cselló)",
    ],
    description: "Egy lassan kibomló vonósdarab, amely finom texturális változásokon és fokozatos dinamikai építkezésen keresztül jut el egy intenzív tetőpontig, majd visszahullik a kezdeti lebegő csendbe.",
  },
  {
    id: 12,
    composer: "Botos Gergely",
    title: "Mémoire",
    performers: ["Erdő Zoltán (tárogató)", "Botos Gergely (zongora)"],
    description: "Ezzel a darabommal igyekeztem megidézni a századforduló francia zenei világát, ami a tárogató különleges hangszínével ötvözve egy kellemes hangulatot hoz magával. A koncerten ez a darab egy eredeti Stowasser tárogatón szólal meg.",
  },
  {
    id: 13,
    composer: "Sebestyén-Lázár Regina",
    title: "Detachment",
    performers: [
      "Csörgeő Luca (ének)",
      "Szikora Adél (ének)",
      "Vámos Emma (ének)",
      "Farkas Botond (zongora)",
      "Szalovszky Viktória (preparáció)",
    ],
    description: "",
    poem: `Elegy
through scattered lights
can be seen the One
thrown by time
on shores
of the sea
go blind
where it founds
the meeting what's complete
In parting

Moments
You called to Yourself
two apple
a cold sandwich
and vocal cord bouquet
if You tied my voice
as first sunburn after the winter
on shores like icebergs
my face is scattered by shards on my sole
You know maybe I never loved You
while wondering
I feed Myself with Your kisses
which We thought were true
so much that separation seemed as dusting

Detachment
prisoned by Myself I'm counting the days
like a dog without it's owner
a captive moment
faraway notes
it speaks for itself
if You do not come
and Your face becomes memory
on strangers faces
forgotten by the wind
like a spider web flowing in the breeze`,
    poemYear: "2025",
    poemAuthor: "Zselyke Szentgyörgyi",
  },
];

export const getPieces = () => program.filter((p) => p.id > 0);
export const getPieceById = (id: number) => program.find((p) => p.id === id);
