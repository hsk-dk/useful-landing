# useful-landing

Landingpage til [useful.dk](https://useful.dk): det animerede logo og en oversigt over Useful-projekterne på GitHub.

Ren HTML og CSS med lidt JavaScript til animation og kort-effekter. Intet bygge-trin, ingen afhængigheder.

- `index.html`: hele siden. Stilen følger [useful-design](https://github.com/hsk-dk/useful-design) (blå `#446ea8`, tekst `#243140`, systemskrift).
- `assets/background.jpg`: baggrundsfoto, samme som i useful-design.

Projektkortene er skrevet i HTML. Stjerner og "opdateret"-tidspunkt hentes fra GitHubs API i browseren og udelades stille, hvis kaldet fejler. Siden respekterer `prefers-reduced-motion`.

Åbn `index.html` direkte i en browser for at se den.
