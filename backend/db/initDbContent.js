function initDbContent(db) {
  const introCards = [
    {
      frontHeader: "Willkommen",
      frontText:
        "Willkommen bei Learn by Index. Deiner neuen digitalen Lernumgebung zum Karteikarten-Lernen. Druecke auf die Umdrehen Taste um die Rueckseite zu sehen.",
      backHeader: "Antwort",
      backText:
        "Dieser Seite befinden sich die Antworten, zu den Fragen die sich auf der oberen Karte befinden. Nach dem Umdrehen kannst du entscheiden welche schwirigkeit du die Antwort vergeben willst. Dies Entscheided darueber wann dir diese Karte wieder zum lernen angezeigt wird.",
    },
    {
      frontHeader: "Fortschritt",
      frontText:
        "Ueber diesen Abschnitt kannst du jetzt den Lernfortschritt deines Stapels sehen. Je nach Antwort wird dir eine andere Farbe angezeigt. Druecke wieder auf dem Umdrehen Knopf um die Antwort zu offenbaren.",
      backHeader: "So funktionieren die Antworten",
      backText:
        "Wenn du eine Frage mit Fertig beantwortest, wird diese aus dem Stapel enfernt. Wenn du fuer eine Frage eine andere Antwortmoeglichkeit waehlst wird diese wieder in den Stapel reingelegt. Je nach Antwortmoeglichkeit wird der Zeitpunkt der Wiederholung festgelegt, um dich optimal auf die schwirigkeiten zu trainieren.",
    },
    {
      frontHeader: "Konzept",
      frontText:
        "Die Idee hinter dieser Anwendung ist es sich Karteikarten selber zu erstellen und diese gezielt lernen zu koennen. Dabei ist es moeglich sich das eigenen Lernen wie man moechte zu konfigurieren.",
      backHeader: "Eigne Lernkarten erstellen",
      backText:
        "Um eigenen Lernkarten zu erstellen muss man sich zunaechst anmelden. Nach der Anmeldung ist es moeglich sich eigene Karteikarten zu erstellen und zu sotieren. Die erstellten Karten kann man sich in der oberen Leiste unter My Files verwalten.",
    },
    {
      frontHeader: "Vorgefertigte Karten",
      frontText:
        "Auch ist es moeglich sich aus einer Vielzahl von Themen fertige Karteikarten-Stapel zu lernen. Zudem ist es auch moeglich deine eigenen Stapel zum lernen fuer andere zu veroeffentlichen.",
      backHeader: "Wo man auf diese Zugreifen kann",
      backText:
        "Um Karteikarten von anderen zu nutzen muss auf dem oberen Balken auf Library gedruckt werden. Dort ist es moeglich nach Themen zu suchen und Karteikarten-Stapel in seinen eigene Ordnern hin zu zufuegen.",
    },
    {
      frontHeader: "Visuelles Feetback",
      frontText:
        "Ein wichtiges Ziel dieser Anwendung ist es, das Lernen motivierend zu gestalten. Daher werden fleissige Lernaktionen aufgezeichnet und belohnt. Unter Stats ist es moeglich seine Lernstatisticen anzuschauen und mit anderen zu vergleichen.",
      backHeader: "Weitere Motivierende Features",
      backText:
        "Auch werden von den Anwendung Vorschlaege getroffen, wie und wann Karteikarten-Stapel gelernt werden sollen. Dies soll dabei helfen bei dem Themem am Ball zu bleiben.",
    },
    {
      frontHeader: "Abschliessende Worte",
      frontText: "Danke fuer Nutzen.",
      backHeader: "Loslegen",
      backText: "Melde dich jetzt an um los zu lernen.",
    },
  ];

  const stack = db
    .prepare("SELECT id FROM stacks WHERE name = ?")
    .get("Introduction");

  let stackId;

  if (!stack) {
    const result = db
      .prepare("INSERT INTO stacks (name) VALUES (?)")
      .run("Introduction");

    stackId = result.lastInsertRowid;
  } else {
    stackId = stack.id;
  }

  const insertCard = db.prepare(`
	INSERT INTO flashcards (stack_id, front_header, front_text, back_header, back_text)
	VALUES (?, ?, ?, ?, ?)
	`);

  const insertMany = db.transaction((cards) => {
    for (const card of cards) {
      insertCard.run(
        stackId,
        card.frontHeader,
        card.frontText,
        card.backHeader,
        card.backText
      );
    }
  });

  insertMany(introCards);

  console.log("Intro cards inserted");
}

module.exports = initDbContent;
