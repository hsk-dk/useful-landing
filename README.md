# useful-landing

Landingpage til [useful.dk](https://useful.dk): det animerede logo og en oversigt over Useful-projekterne på GitHub.

Ren HTML og CSS med lidt JavaScript til animation og kort-effekter. Intet bygge-trin, ingen afhængigheder.

- `index.html`: hele siden. Stilen følger [useful-design](https://github.com/hsk-dk/useful-design) (blå `#446ea8`, tekst `#243140`, systemskrift).
- `assets/background.jpg`: baggrundsfoto, samme som i useful-design.

Projektkortene er skrevet i HTML. Stjerner, downloads og "opdateret"-tidspunkt står i `stats.json`, som siden henter fra sit eget domæne. Siden kalder ikke GitHub. Mangler filen, vises kortene bare uden tal. Siden respekterer `prefers-reduced-motion`.

## Statistik

`.github/workflows/stats.yml` kører dagligt (og kan startes fra Actions), kører `scripts/update-stats.mjs` og committer `stats.json`, hvis tallene er ændret. Downloads er summen af `download_count` for filer vedhæftet releases, så de tæller kun installationer, der henter en release-fil. Et projekt uden releases viser ingen downloads, og nul stjerner eller downloads skjules.

Tilføj et nyt projektkort ved at give det `data-repo="<repo>"` i `index.html` og tilføje repoet i `REPOS` i scriptet. Lokalt: `GITHUB_TOKEN=$(gh auth token) node scripts/update-stats.mjs`.

På webserveren skal `git pull` hente den opdaterede `stats.json`. Har du en CSP, er `connect-src 'self'` nu nok (ingen `api.github.com`).

Åbn `index.html` direkte i en browser for at se den.
