/**
 * Semua tulisan di website ini ada di file ini.
 *
 * Tanpa parameter URL, surat ditujukan untuk seluruh guru SMA Negeri 1 Surakarta.
 * Dengan ?to=Bu%20Rina, surat yang sama ditujukan untuk satu guru.
 *
 * Token:
 *   {s}       → "Bapak dan Ibu" (semua guru) · "Ibu" (Bu/Ibu …) · "Bapak" (Pak/Bapak …) · "Bapak/Ibu"
 *   {sapa}    → "Bapak dan Ibu Guru" · atau nama guru, mis. "Bu Rina"
 *   {kepada}  → "seluruh Bapak dan Ibu Guru SMA Negeri 1 Surakarta" · atau nama guru
 *   {to}      → nama di amplop: "Bapak/Ibu Guru" · atau nama guru
 *   *teks*    → diberi penekanan (miring + garis tangan)
 */

export const sender = {
  fullName: 'Galih Aji Pangestu',
  nickname: 'Galih',
  credentials: [
    'Alumni SMA Negeri 1 Surakarta Angkatan 2023',
    'Mahasiswa Informatika, UPN “Veteran” Jawa Timur',
    'Semester 5 · Surabaya',
    'Information System Intern · Telkomsel',
  ],
  community: 'KASMAJI · Keluarga Alumni SMA Siji 2023',
  short: 'Galih, KASMAJI 2023',
}

export const meta = {
  date: '25 November 2026',
  event: 'Hari Guru Nasional',
  city: 'Surabaya',
  school: 'SMA Negeri 1 Surakarta',
}

export const hero = {
  dedication: {
    group: 'Untuk Bapak dan Ibu Guru SMA Negeri 1 Surakarta.',
    single: 'Untuk {to}, guru saya di SMA Negeri 1 Surakarta.',
  },
  headline:
    'Dulu, saya adalah salah satu murid yang duduk di bangku kelas, mendengarkan pelajaran, sesekali bercanda dengan teman, dan *menunggu bel pulang berbunyi.* Kini, saya hanya bisa mengenang semua itu *dari kejauhan.*',
  sub: 'Ada sebuah surat yang mungkin sudah terlambat untuk disampaikan, tetapi tidak pernah terlambat untuk dituliskan.',
  cta: 'Buka Surat dari Galih',
  margin: 'ditulis dari Surabaya, untuk Surakarta',
  envelopeFrom: 'Dari: Galih, KASMAJI 2023',
  sealText: 'Terima Kasih',
}

export const letter = {
  eyebrow: 'Bab I — Surat',
  title: 'Untuk {sapa} yang Pernah Mengisi Hari-Hari Saya di *SMA Negeri 1 Surakarta.*',
  greeting: "Assalamu'alaikum warahmatullahi wabarakatuh.",
  paragraphs: [
    'Apa kabar, {sapa}?',
    'Semoga selalu sehat, bahagia, dan senantiasa diberikan kekuatan dalam menjalani setiap hari.',
    'Perkenalkan, saya Galih Aji Pangestu, biasa dipanggil Galih. Saya merupakan alumni SMA Negeri 1 Surakarta angkatan 2023, bagian dari keluarga besar KASMAJI.',
    'Hari ini, tepat pada peringatan Hari Guru Nasional, saya ingin menyampaikan sesuatu yang mungkin dahulu jarang sekali saya ucapkan ketika masih mengenakan *seragam putih abu-abu.*',
    'Rasanya baru kemarin saya masih duduk di bangku kelas, mengerjakan tugas, bercanda dengan teman, mendengarkan penjelasan di depan kelas, atau sesekali justru sibuk dengan dunia sendiri ketika {s} sedang mengajar.',
    'Waktu itu, mungkin saya menganggap semua itu sebagai rutinitas biasa. Berangkat sekolah, bertemu teman, mengikuti pelajaran, menghadapi ujian, lalu pulang ke rumah.',
    'Namun setelah lulus dan menjalani perjalanan hidup masing-masing, saya mulai menyadari bahwa ada begitu banyak hal berharga yang dahulu sering kali saya anggap sederhana.',
    'Ternyata, ruang kelas yang dahulu terasa biasa saja kini menjadi salah satu tempat yang menyimpan *begitu banyak kenangan.*',
    'Saya mulai memahami bahwa di balik setiap tugas yang diberikan, ada harapan agar saya terus belajar. Di balik setiap teguran, ada kepedulian agar saya menjadi lebih baik. Dan di balik setiap nasihat yang mungkin dahulu hanya berlalu begitu saja, ada pelajaran kehidupan yang baru benar-benar saya pahami setelah beranjak dewasa.',
    '*Terkadang, kita memang baru menyadari betapa berharganya sesuatu setelah kita tidak lagi berada di dalamnya.*',
  ],
  marginNote: 'masih ingat suara bel pulang?',
}

export const unsaid = {
  eyebrow: 'Bab II — Yang Tak Sempat Terucap',
  title: 'Ada Beberapa Hal yang Ingin Saya Sampaikan Sejak Dulu.',
  hint: 'Ketuk setiap kertas untuk membuka isinya.',
  done: 'Terima kasih sudah membaca semuanya.',
  notes: [
    {
      label: 'Tentang Kesabaran',
      teaser: 'Untuk {s} yang pernah menghadapi murid seperti saya.',
      message: [
        'Terima kasih karena telah bersabar menghadapi berbagai tingkah laku saya selama menjadi siswa. Mungkin ada hari ketika saya terlalu banyak bercanda, kurang memperhatikan pelajaran, atau tidak langsung memahami apa yang sedang diajarkan.',
        'Terima kasih karena tidak lelah mengingatkan, membimbing, dan memberi kesempatan kepada saya untuk terus belajar menjadi pribadi yang lebih baik.',
      ],
      scribble: 'terima kasih sudah sabar',
    },
    {
      label: 'Tentang Teguran',
      teaser: 'Dahulu mungkin saya menganggapnya biasa saja.',
      message: [
        'Sekarang saya sadar, tidak semua teguran datang karena kemarahan. Ada perhatian yang disampaikan dengan cara tegas, ada kekhawatiran yang mungkin tidak saya pahami, dan ada keinginan agar saya tidak mengulangi kesalahan yang sama.',
        'Terima kasih karena tetap peduli, bahkan ketika saya belum sepenuhnya memahami maksud baik {s}.',
      ],
      scribble: 'sekarang saya mengerti',
    },
    {
      label: 'Tentang Kepercayaan',
      teaser: 'Untuk setiap kali {s} percaya bahwa saya bisa.',
      message: [
        'Terima kasih karena pernah memberikan kesempatan, dukungan, dan kepercayaan kepada saya. Mungkin {s} tidak pernah tahu seberapa besar pengaruh kata-kata sederhana yang pernah disampaikan.',
        'Namun, saya membawa sebagian dari nasihat dan keyakinan itu dalam perjalanan saya setelah meninggalkan sekolah.',
      ],
      scribble: 'masih saya bawa sampai sekarang',
    },
  ],
}

export const apology = {
  eyebrow: 'Bab III — Sebuah Permintaan Maaf',
  title: 'Maaf, Jika Dahulu Saya Belum Menjadi Murid yang *Bisa Dibanggakan.*',
  salutation: '{sapa},',
  paragraphs: [
    'Sebelum mengucapkan terima kasih, izinkan saya meminta maaf.',
    'Maaf apabila selama menjadi siswa saya pernah terlalu bandel, terlalu banyak bercanda ketika pelajaran berlangsung, membuat suasana kelas menjadi kurang kondusif, atau justru tidak memperhatikan ketika {s} sedang berusaha menjelaskan sesuatu.',
    'Maaf apabila pernah ada tugas yang terlambat saya kumpulkan, nasihat yang tidak saya dengarkan, teguran yang saya abaikan, atau sikap saya yang tanpa disadari membuat {s} merasa kecewa.',
    'Maaf apabila dahulu saya belum cukup dewasa untuk memahami bahwa setiap teguran dan arahan yang diberikan sebenarnya merupakan bentuk perhatian.',
    'Mungkin saat itu saya hanya memikirkan diri sendiri, teman-teman, dan kesenangan selama berada di sekolah.',
    'Saya tidak bisa mengulang waktu untuk memperbaiki semua hal tersebut. Namun, saya ingin {s} tahu bahwa saya *semakin memahami makna* dari apa yang dahulu telah diajarkan.',
  ],
  peak: [
    'Maaf untuk segala tingkah laku saya dahulu.',
    'Dan terima kasih karena tidak pernah berhenti mengajarkan saya untuk menjadi lebih baik.',
  ],
  peakNote: '— yang seharusnya saya ucapkan sejak dulu',
}

export const remains = {
  eyebrow: 'Bab IV — Yang Tertinggal Setelah Kelulusan',
  title: 'Dari Ruang Kelas Itu, Kini Saya Sedang Menempuh *Perjalanan yang Berbeda.*',
  journey: [
    { place: 'SMA Negeri 1 Surakarta', detail: 'Lulus · Angkatan 2023', city: 'Surakarta' },
    { place: 'Informatika, UPN “Veteran” Jawa Timur', detail: 'Mahasiswa · Semester 5', city: 'Surabaya' },
    { place: 'Information System Intern', detail: 'Magang · Telkomsel', city: 'Surabaya' },
  ],
  paragraphs: [
    'Sejak meninggalkan SMA Negeri 1 Surakarta pada tahun 2023, kehidupan membawa saya menuju banyak pengalaman baru yang dahulu mungkin belum pernah saya bayangkan.',
    'Kini, saya sedang melanjutkan pendidikan di Program Studi Informatika, Universitas Pembangunan Nasional “Veteran” Jawa Timur, Surabaya. Saat ini saya telah memasuki semester 5 dan sedang berusaha menjalani setiap proses perkuliahan dengan sebaik-baiknya.',
    'Selain kuliah, saya juga mendapatkan kesempatan untuk menjalani program magang di Telkomsel sebagai *Information System Intern* di Surabaya. Sebuah pengalaman baru yang memberikan saya kesempatan untuk belajar lebih jauh, mengenal dunia profesional, bertemu dengan orang-orang baru, dan memahami bagaimana ilmu yang selama ini dipelajari dapat diterapkan secara nyata.',
    'Kadang, ketika sedang menjalani kesibukan perkuliahan maupun pekerjaan, saya teringat kembali masa-masa SMA. Teringat bagaimana dahulu saya duduk di ruang kelas, menerima penjelasan {s} Guru, mengerjakan tugas, menghadapi ujian, dan menjalani hari-hari bersama teman-teman.',
    'Lucunya, beberapa hal yang dahulu terasa biasa saja ternyata menjadi kenangan yang cukup sering saya rindukan.',
    'Perjalanan saya setelah lulus tentu tidak selalu mudah. Ada banyak hal yang harus dipelajari kembali, ada kegagalan yang harus diterima, dan ada tantangan yang terkadang membuat saya meragukan kemampuan diri sendiri.',
    'Namun, dalam setiap proses tersebut, saya menyadari bahwa pendidikan yang saya dapatkan di SMA bukan hanya tentang mata pelajaran dan nilai di atas kertas.',
    'Ada kedisiplinan, tanggung jawab, keberanian untuk mencoba, cara menghargai orang lain, dan berbagai nasihat yang ternyata *masih relevan hingga hari ini.*',
    'Mungkin {s} tidak pernah mengetahui bagaimana kehidupan murid-muridnya setelah mereka meninggalkan sekolah. Mungkin tidak semua perjalanan kami sempat {s} ikuti.',
    'Tetapi, saya ingin menyampaikan bahwa saya sedang berusaha tumbuh menjadi pribadi yang lebih baik, melanjutkan pendidikan, mencari pengalaman, dan mengusahakan masa depan yang dahulu mungkin hanya menjadi cita-cita ketika masih berseragam putih abu-abu.',
    'Saya tidak mengatakan bahwa saya sudah menjadi seseorang yang hebat. Saya masih belajar, masih sering salah, dan masih memiliki perjalanan panjang yang harus ditempuh.',
    'Namun, saya berharap suatu hari nanti bisa menjadi seseorang yang tidak hanya membanggakan diri sendiri, tetapi juga membuat orang-orang yang pernah mendidik saya *turut merasa bangga.*',
  ],
  closing:
    'Dari ruang kelas SMA Negeri 1 Surakarta, saya melangkah menuju *perjalanan yang lebih luas.* Dan sebagian bekal yang saya bawa hingga hari ini berasal dari *{s} Guru.*',
  forgotten: ['beberapa rumus', 'materi yang dulu terasa sulit', 'setiap halaman buku', 'nilai di atas kertas'],
  kept: ['kedisiplinan', 'tanggung jawab', 'keberanian untuk mencoba', 'cara menghargai orang lain'],
}

export const finale = {
  eyebrow: 'Selamat Hari Guru Nasional',
  title: 'Terima Kasih, Telah Menjadi Bagian dari *Perjalanan Hidup* Saya.',
  salutation: 'Untuk {kepada},',
  paragraphs: [
    'Terima kasih karena pernah hadir dalam salah satu fase paling berharga dalam hidup saya.',
    'Terima kasih untuk ilmu yang diberikan, waktu yang diluangkan, kesabaran yang tidak terhitung, teguran yang dahulu mungkin tidak saya sukai, serta doa-doa baik yang mungkin tidak pernah saya ketahui.',
    'Hari ini, saya mungkin sudah tidak lagi menjadi siswa yang duduk di bangku kelas SMA Negeri 1 Surakarta. Saya sedang menempuh perjalanan baru sebagai mahasiswa Informatika di UPN “Veteran” Jawa Timur, Surabaya, sekaligus belajar mengenal dunia profesional melalui pengalaman magang di Telkomsel.',
    'Namun, sejauh apa pun saya melangkah, saya tidak ingin melupakan tempat yang pernah menjadi bagian penting dari proses saya bertumbuh.',
    'Saya tidak tahu apakah suatu hari nanti saya bisa membalas seluruh kebaikan yang telah {s} berikan.',
    'Saya juga tidak tahu apakah {s} masih mengingat saya sebagai salah satu murid yang pernah diajar di ruang kelas dahulu.',
    'Namun, saya berharap {s} tahu bahwa ada seorang alumni bernama Galih yang *masih mengingat dan menghargai* setiap kebaikan tersebut.',
    'Semoga {s} selalu diberikan kesehatan, umur yang penuh keberkahan, kebahagiaan, ketenangan, serta kebanggaan melihat murid-murid yang dahulu pernah dibimbing kini tumbuh dan melangkah dengan jalan hidupnya masing-masing.',
    'Semoga segala ilmu yang telah diberikan menjadi *amal jariyah yang tidak pernah terputus.*',
    'Dan apabila suatu hari nanti kita kembali bertemu, saya berharap dapat menyapa {s} bukan lagi hanya sebagai seorang murid, tetapi sebagai seseorang yang pernah tumbuh berkat ilmu dan kebaikan yang telah {s} berikan.',
  ],
  closingLines: [
    'Selamat Hari Guru Nasional 2026.',
    '{s} mungkin telah mengajar begitu banyak murid, tetapi bagi saya, {s} akan selalu menjadi bagian dari *cerita yang tidak terlupakan.*',
  ],
  signoff: 'Dengan penuh hormat, rasa sayang, dan terima kasih,',
  tagline: 'Berawal dari sebuah ruang kelas, melangkah menuju dunia yang lebih luas. Terima kasih telah menjadi bagian dari perjalanan itu.',
  taglineEn: 'Once your student, always grateful for your lessons.',
}

export const footer = {
  quote:
    'Surat ini ditulis dengan penuh rasa terima kasih, untuk mereka yang pernah mengajarkan banyak hal, bahkan jauh melampaui apa yang tertulis di papan tulis.',
  madeBy: 'Made with gratitude by',
  name: 'Galih Aji Pangestu (Galih)',
  community: 'KASMAJI 2023 · SMA Negeri 1 Surakarta',
  date: '25 November 2026',
  motto: 'Once a student, always a part of the memories.',
}

export const chapters = [
  { id: 'surat', label: 'Surat' },
  { id: 'tak-terucap', label: 'Tak Terucap' },
  { id: 'maaf', label: 'Maaf' },
  { id: 'tetap-tinggal', label: 'Perjalanan' },
  { id: 'terima-kasih', label: 'Terima Kasih' },
] as const
