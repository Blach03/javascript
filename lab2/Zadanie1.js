function funkcja_zwrotna() {
    const poleTekstowe = document.getElementById("pole_tekstowe").value;
    const poleLiczbowe = document.getElementById("pole_liczbowe").value;
    
    console.log(poleTekstowe + ":" + typeof poleTekstowe);
    console.log(poleLiczbowe + ":" + typeof poleLiczbowe);
  }

  function wykonajCzteryRazy() {
    for (let i = 0; i < 4; i++) {
      const wartosc = window.prompt("Podaj wartość:");
      const typ = typeof wartosc;
      console.log(wartosc + ":" + typ);
    }
  }