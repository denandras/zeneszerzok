export interface Piece {
  id: number;
  composer: string;
  title: string;
  performers: string[];
  description: string;
}

export const concertInfo = {
  title: "Alkalmazott zeneszerzés BA diplomakoncert",
  date: "2026. május 3.",
  time: "19:00",
  venue: "Liszt Ferenc Zeneművészeti Egyetem",
  venueEn: "Liszt Academy Budapest",
  note: "A koncert előtt, 16.00 órától a diplomázók vizsgafilmjei az I. előadó teremben tekinthetők meg.",
};

export const program: Piece[] = [
  {
    id: 1,
    composer: "Botos Gergely",
    title: "Kvintett",
    performers: [
      "Papp Máté, Mészáros Jázon Márk (klarinét)",
      "Csongár Márton (basszetkürt)",
      "Lakatos Béla (basszusklarinét)",
      "Botos Gergely (kontrabasszus-klarinét)"
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id: 2,
    composer: "Sepsi Botond",
    title: "Egyenes labirintus",
    performers: [
      "Törőcsik Kristóf: A lágy fényhez fohászkodom",
      "Végh Janka (szoprán)",
      "Vajda Denejra (hárfa)",
      "Friderikusz Péter (cselló)"
    ],
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
  },
  {
    id: 3,
    composer: "Nagy Emma",
    title: "Metallic Flowers",
    performers: [
      "Krulik Eszter, Szűcs Boglárka (hegedű)",
      "Lachegyi Róza (brácsa)",
      "Bali Gabriella (cselló)",
      "Szatzker Zsanett (harmonika)"
    ],
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
  },
  {
    id: 4,
    composer: "Sebestyén Lázár Regina",
    title: "something, someday, somewhere...",
    performers: [
      "Réz Körút",
      "Nagy Sándor, Szilágyi Dusán, Huszti Boldizsár (trombita)",
      "Faragó István (kürt)",
      "Gulyás Buda, Dénes András (harsona)",
      "Vida Mátyás (tuba)"
    ],
    description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  },
  {
    id: 5,
    composer: "Varga Nadin",
    title: "Glimmer",
    performers: [
      "Kalafszky Adriána (szoprán)",
      "Szabó Dénes (cselló)"
    ],
    description: "Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
  },
  {
    id: -1,
    composer: "",
    title: "SZÜNET",
    performers: [],
    description: ""
  },
  {
    id: 6,
    composer: "Botos Gergely",
    title: "Hajnaltól éjfélig",
    performers: [
      "Kerti Júlia (mezzoszoprán)",
      "Németh Flóra (fagott/kontrafagott)",
      "Botos Gergely (zongora)"
    ],
    description: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
  },
  {
    id: 7,
    composer: "Nagy Emma",
    title: "Limbs Move Better/Satellite",
    performers: [
      "Harcsa Veronika (ének)",
      "Horváth Áron (cimbalom)",
      "Gyányi Marcell (nagybőgő)",
      "Kapolcsi-Szabó Levente (zongora)"
    ],
    description: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur."
  },
  {
    id: 8,
    composer: "Varga Nadin",
    title: "Blue Jungle",
    performers: [
      "Tóth Domonkos (klarinét)",
      "Botos Gergely (basszusklarinét)",
      "Pintér Anna, Holozsai Eszter, Sebestyén Lázár Kata (fuvola)",
      "Szilágyi Péter (marimba)"
    ],
    description: "Aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
  },
  {
    id: 9,
    composer: "Sepsi Botond",
    title: "Reframe",
    performers: [
      "Törőcsik Kristóf: Nitzakhon",
      "Krulik Eszter, Szűcs Boglárka (hegedű)",
      "Lachegyi Róza, Koppán Kata (brácsa)",
      "Bali Gabriella (cselló)"
    ],
    description: "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam."
  },
  {
    id: 10,
    composer: "Botos Gergely",
    title: "Mémoire",
    performers: [
      "Erdő Zoltán (tárogató)",
      "Botos Gergely (zongora)"
    ],
    description: "Quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate."
  },
  {
    id: 11,
    composer: "Sebestyén Lázár Regina",
    title: "Detachment",
    performers: [
      "Csörgeő Luca, Szikora Adél, Vámos Emma (ének)",
      "Farkas Botond (zongora)",
      "Szalovszky Viktória (preparáció)"
    ],
    description: "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque."
  }
];

export const getPieces = () => program.filter(p => p.id > 0);
export const getPieceById = (id: number) => program.find(p => p.id === id);
